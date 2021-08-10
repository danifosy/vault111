import express, { request, response } from 'express';
import { readCredentials } from './utils/credentials';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_request, response) => {
  response.type('json').send(await readCredentials());
});

// creates route. Define '/' route last
app.get('/', (_request, response) => {
  response.send('Hello Louie!');
});

//starts server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
