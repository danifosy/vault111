import { Collection, InsertOneResult, MongoClient } from 'mongodb';
import { Credential } from '../types';

let client: MongoClient;

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url);
  await client.connect();
}

export function getCollection<T>(name: string): Collection<T> {
  return client.db().collection<T>(name);
}

export function getCredentialCollection(): Collection<Credential> {
  return getCollection<Credential>('credentials');
}

export async function addCredentialToDB(
  credential: Credential
): Promise<InsertOneResult<Credential>> {
  const credentialCollection = await getCredentialCollection();
  return credentialCollection.insertOne(credential);
}
