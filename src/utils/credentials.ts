import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import { Credential, DB } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  const credential = credentials.find(
    (credential) => credential.service === service
  );

  if (!credential) {
    throw new Error(`No credential found for service: ${service}`);
  }

  return credential;
}

export async function addCredential(credential: Credential) {
  // waits for function above and saves in var
  const credentials = await readCredentials();
  // spreads all old creds and adds new creds and creates array of them
  const newCredentials = [...credentials, credential];
  // the key we fill with information. in this key we give all our info
  const newDB: DB = {
    credentials: newCredentials,
  };
  // writes new credential as a string bc it expects a string
  await writeFile('src/db.json', JSON.stringify(newDB));
}
