import express, { request, response } from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_request, response) => {
  //to-do: put function in var and test if response!
  response.type('json').send(await readCredentials());
});

app.get('/api/credentials/:service', (request, response) => {
  const { service } = request.params;
  response.send(`Are you searching for ${service}?`);
});

// creates route. Define '/' route last
app.get('/', (_request, response) => {
  response.send('Hello Louie!');
});

//starts server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
