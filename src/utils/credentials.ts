import { readFile, writeFile } from 'fs/promises';
import { Credential, DB } from '../types';
import { encryptCredential } from './crypto';

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
export async function addCredential(credential: Credential): Promise<void> {
  // reads all creds from db
  const credentials = await readCredentials();

  // spreads all old creds and adds new creds and creates array of them
  const newCredentials = [...credentials, encryptCredential(credential)];

  // the key we fill with information. in this key we give all our info
  const newDB: DB = {
    credentials: newCredentials,
  };

  // writes new credential as a string bc it expects a string
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}

export async function deleteCredential(service: string): Promise<void> {
  //reads exisiting creds
  const credentials = await readCredentials();
  //modifies credentials so that it's everything except the filtered cred
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  //new creds without the filtered cred
  const newDB: DB = {
    credentials: filteredCredentials,
  };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  //get all credentials
  const credentials = await readCredentials();
  //modify one
  const filteredCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  //overwrite DB

  const newDB: DB = {
    credentials: [...filteredCredentials, encryptCredential(credential)],
  };
  await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
}
