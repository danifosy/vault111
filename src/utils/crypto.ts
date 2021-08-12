import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptCredential(credential: Credential): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'ichWillEisBitte'
  ).toString();

  const encryptCredential = {
    ...credential,
    password: encryptedPassword,
  };
  return encryptCredential;
}
