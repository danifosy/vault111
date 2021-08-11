import express from 'express';
import {
  getCredential,
  readCredentials,
  addCredential,
  deleteCredential,
} from './utils/credentials';

import { Credential } from './types';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/credentials', async (_request, response) => {
  //tries to run the function and open the site
  try {
    const credentials = await readCredentials();
    //response.json is a shorthand but I won't be able to read it later.
    response.type('json').send(credentials);
    // if not possible shows error in console and posts error message in browser
  } catch (error) {
    console.error(error);
    {
      response
        .status(500)
        .send(`Internal Server Error. Please try again later`);
    }
  }
});

app.post('/api/credentials', async (request, response) => {
  const credential: Credential = request.body;
  await addCredential(credential);
  response.status(200).send(credential);
});

app.delete('/api/credentials/:service', async (request, response) => {
  //pulls "service" from url
  const { service } = request.params;
  await deleteCredential(service);
  response.status(200).send('Successfully deleted');
});

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    const credential = await getCredential(service);
    response.status(200).type('json').send(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`couldn not find service ${service}`);
  }
});

// creates route. Define '/' route last
app.get('/', (_request, response) => {
  response.send('Hello Louie!');
});

//starts server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
