import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

//function to prove if pw you put in is exactly like the masterpw stored in .password
export async function validateMasterpassword(
  potentialMasterpassword: string
): Promise<boolean> {
  // reads .password file
  const hashedMasterpassword = await readFile('.password', 'utf-8');
  // hashes pw with same method
  const hashedPassword = CryptoJS.SHA256(potentialMasterpassword).toString();

  return hashedMasterpassword === hashedPassword;
}
