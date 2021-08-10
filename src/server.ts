import express from 'express';

const app = express();
const port = 3000;

// creates route
app.get('/', (_request, response) => {
  response.send('Hello Louie!');
});

//starts server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
