// console.log('Hello Nightmare King');

// import fs from 'fs';

// fs.readFile('src/db.json', 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

import { readFile } from 'fs/promises';

async function readPasswordFile() {
  const data = await readFile('src/db.json', 'utf-8');
  console.log(data);
}
readPasswordFile();
