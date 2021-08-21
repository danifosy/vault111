import React, { useState } from 'react';
import type { Credential } from '../../../types';

import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function SearchCredential(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterpassword, setMasterpassword] = useState('');
  const [searchString, setSearchString] = useState('');

  function searchCredential(serviceNameToLookFor: string) {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        method: 'GET',
        headers: {
          Authorization: masterpassword,
        },
      });
      const credentialSearchResult: Credential[] = await response.json();

      const filteredCredentials = credentialSearchResult.filter(
        (credential) => credential.service.indexOf(serviceNameToLookFor) !== -1
      );

      setCredentials(filteredCredentials);
    }
    fetchCredentials();
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          event?.preventDefault();
          searchCredential(searchString);
        }}
      >
        <label>
          <input
            type="text"
            placeholder="search for a service"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
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
        <button type="submit">search</button>
      </form>
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <CredentialCard credentialData={credential} />
        ))}
    </>
  );
}
