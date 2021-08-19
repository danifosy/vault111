import express from 'express';
import {
  getCredential,
  readCredentials,
  addCredential,
  deleteCredential,
  updateCredential,
} from './utils/credentials';
import type { Credential } from './types';
import { validateMasterpassword } from './utils/validation';
import dotenv from 'dotenv';
dotenv.config();
import { connectDatabase } from './utils/database';

if (!process.env.MONGODB_URL) {
  throw new Error('No mongoDB');
}

const app = express();
const { PORT = 3001 } = process.env;
app.use(express.json());

app.post('/api/credentials', async (request, response) => {
  //.body is the content of the request (here service, username, pw)
  const credential: Credential = request.body;
  //checks if there is an authorization header as part of the request
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    //if no authorization header set, block request
    response.status(400).send('Bad request');
    //use a return here so the function stops
    return;
    // runs function to check if pw is correct
  } else if (!(await validateMasterpassword(masterPassword))) {
    // if not, access denied.
    response.status(401).send('Unauthorized');
    return;
  }
  //if everything is okay, the new cred is stored
  await addCredential(credential, masterPassword);
  response.status(200).send(credential);
});

app.get('/api/credentials', async (request, response) => {
  //tries to run the function and open the site
  try {
    const masterPassword = request.headers.authorization;
    //response.json is a shorthand but I won't be able to read it later.
    if (!masterPassword) {
      response.status(400).send('Authorization header missing');
      return;
    } else if (!(await validateMasterpassword(masterPassword))) {
      response.status(401).send('Unauthorized request');
      return;
    }
    const credentials = await readCredentials(masterPassword);
    response.json(credentials);
    // if not possible shows error in console and posts error message in browser
  } catch (error) {
    console.error(error);

    response.status(500).send(`Internal Server Error. Please try again later`);
  }
});

//.put updates whole cred, .patch only parts
app.put('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  const credential: Credential = request.body;
  const masterPassword = request.headers.authorization;
  if (!masterPassword) {
    response.status(400).send('Bad request');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized');
    return;
  }
  try {
    await updateCredential(service, credential, masterPassword);
    response.status(200).json('Successfully updated');
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not update service ${service}`);
  }
});

app.delete('/api/credentials/:service', async (request, response) => {
  //pulls "service" from url
  const { service } = request.params;
  await deleteCredential(service);
  response.status(200).send('Successfully deleted');
});

// function loads pw data for one specific service
// :service is a placeholder for the service name
app.get('/api/credentials/:service', async (request, response) => {
  //{} pulls "service" from object
  // same as:
  // const service = request.params.service;
  const { service } = request.params;
  const masterPassword = request.headers.authorization;
  // checks if there is a pw in header
  if (!masterPassword) {
    response.status(400).send('Bad request');
    return;
  } else if (!(await validateMasterpassword(masterPassword))) {
    response.status(401).send('Unauthorized');
    return;
  }
  try {
    const credential = await getCredential(service, masterPassword);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service ${service}`);
  }
});

// creates route. Define '/' route last
app.get('/', (_request, response) => {
  response.send('Hello Louie!');
});

//starts server
connectDatabase(process.env.MONGODB_URL).then(() =>
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  })
);
