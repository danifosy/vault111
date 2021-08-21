import React, { useState } from 'react';
import { Credential } from '../../../types';

const emptyCredential = {
  service: '',
  username: '',
  password: '',
};

export default function AddCredential(): JSX.Element {
  const [credential, setCredential] = useState<Credential>(emptyCredential);
  const [masterpassword, setMasterpassword] = useState('');

  const submit = () => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: {
          Authorization: masterpassword,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });
      await response.json();
      setCredential(emptyCredential);
    }
    fetchCredentials();
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event?.preventDefault();
          submit();
        }}
      >
        <p>Add a service</p>
        <label>
          <input
            type="text"
            value={credential.service}
            onChange={(event) =>
              setCredential({ ...credential, service: event.target.value })
            }
          />
        </label>
        <p>Add a username</p>
        <label>
          <input
            type="text"
            value={credential.username}
            onChange={(event) =>
              setCredential({ ...credential, username: event.target.value })
            }
          />
        </label>
        <p>Add a password</p>
        <label>
          <input
            type="text"
            value={credential.password}
            onChange={(event) =>
              setCredential({ ...credential, password: event.target.value })
            }
          />
        </label>
        <p>Please enter master password</p>
        <label>
          <input
            type="password"
            value={masterpassword}
            onChange={(event) => setMasterpassword(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
