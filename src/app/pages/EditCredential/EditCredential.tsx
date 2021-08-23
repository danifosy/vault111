import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Credential } from '../../../types';
import styles from './EditCredential.module.css';

export default function EditCredential(): JSX.Element {
  const history = useHistory();
  const { service: ServiceParam }: { service: string } = useParams();
  const [service, setService] = useState<string>(ServiceParam);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterpassword, setMasterpassword] = useState<string>('');

  async function updateCredential(
    credential: Credential,
    masterpassword: string
  ) {
    const response = await fetch(`/api/credentials/${credential.service}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterpassword,
      },
      body: JSON.stringify(credential),
    });
    return response;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const credential = {
      service,
      username,
      password,
    };
    const response = await updateCredential(credential, masterpassword);
    if (!response.ok) {
      console.log('Something weng wrong');
      return;
    }
    history.push('/');
  }

  return (
    <>
      <form
        className={styles.editForm}
        onSubmit={(event) => handleSubmit(event)}
      >
        <label>
          <p>update {ServiceParam}</p>
          <input
            required
            type="text"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
        </label>
        <label>
          <p>update username</p>
          <input
            required
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <p>update password</p>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <p>Please enter master password</p>
        <label>
          <input
            required
            className={styles.editForm_input}
            type="password"
            value={masterpassword}
            onChange={(event) => setMasterpassword(event.target.value)}
          />
        </label>
        <button className={styles.editForm_button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
