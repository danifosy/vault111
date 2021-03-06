import type { Credential } from '../types';
import { encryptCredential, decryptCredential } from './crypto';
import { getCredentialCollection } from './database';
import { ObjectId } from 'mongodb';

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredentials = await credentialCollection.find().toArray();
  const credentials = encryptedCredentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return credentials;
}

// // reads db.json and turns them into usable data
// export async function readCredentials(): Promise<Credential[]> {
//   // reads db file and saves the content in the var "response" as a string
//   const response = await readFile('src/db.json', 'utf-8');
//   // puts string into object so we can continue using it
//   const db: DB = JSON.parse(response);
//   // gives back array inside of the object
//   const credentials = db.credentials;
//   return credentials;
// }

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredential = await credentialCollection.findOne({ service });
  if (!encryptedCredential) {
    throw new Error(`Unable to find service ${service}`);
  }
  const credential = decryptCredential(encryptedCredential, key);
  return credential;
}

// export async function getCredential(
//   serviceName: string,
//   key: string
// ): Promise<Credential> {
//   // calls readCredentials() function and saves the array in var
//   const credentials = await readCredentials();
//   // takes the cred data and finds the fitting service according to the service we give into the function
//   const credential = credentials.find(
//     (credential) => credential.service === serviceName
//   );
//   // if cred is not found, throw this error
//   if (!credential) {
//     throw new Error(`No credential found for service: ${serviceName}`);
//   }
//   const decryptedCredential = decryptCredential(credential, key);

//   return decryptedCredential;
// }

export async function addCredential(
  credential: Credential,
  key: string
): Promise<ObjectId> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  const result = await credentialCollection.insertOne(encryptedCredential);
  return result.insertedId;
}

// export async function addCredential(
//   credential: Credential,
//   key: string
// ): Promise<void> {
//   const encryptedCredential = encryptCredential(credential, key)
//   // reads all creds from db
//   const credentials = await readCredentials();
//   // spreads all old creds and adds new creds and creates array of them
//   const newCredentials = [...credentials, encryptCredential(credential, key)];
//   // the key we fill with information. in this key we give all our info
//   const newDB: DB = {
//     credentials: newCredentials,
//   };
//   // writes new credential as a string bc it expects a string
//   await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
// }

export async function deleteCredential(service: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service });
}

// export async function deleteCredential(serviceName: string): Promise<void> {
//   //reads exisiting creds
//   const credentials = await readCredentials();
//   //modifies credentials so that it's everything except the filtered cred
//   const filteredCredentials = credentials.filter(
//     (credential) => credential.service !== serviceName
//   );
//   //new creds without the filtered cred
//   const newDB: DB = {
//     credentials: filteredCredentials,
//   };
//   await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
// }

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  await credentialCollection.updateOne(
    { service },
    { $set: encryptedCredential }
  );
}

// export async function updateCredential(
//   serviceName: string,
//   credential: Credential,
//   key: string
// ): Promise<void> {
//   //get all credentials
//   const credentials = await readCredentials();
//   //modify one
//   const filteredCredentials = credentials.filter(
//     (credential) => credential.service !== serviceName
//   );
//   //overwrite DB

//   const newDB: DB = {
//     credentials: [...filteredCredentials, encryptCredential(credential, key)],
//   };
//   await writeFile('src/db.json', JSON.stringify(newDB, null, 2));
// }
