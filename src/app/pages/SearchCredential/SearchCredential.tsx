import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import styles from './SearchCredential.module.css';

import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function SearchCredential(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterpassword, setMasterpassword] = useState('');
  const [searchString, setSearchString] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      method: 'GET',
      headers: {
        Authorization: masterpassword,
      },
    });
    const credentialSearchResult: Credential[] = await response.json();

    const filteredCredentials = credentialSearchResult.filter(
      (credential) => credential.service.indexOf(searchString) !== -1
    );

    setCredentials(filteredCredentials);
  }

  return (
    <>
      <form
        className={styles.searchForm}
        onSubmit={(event) => {
          event?.preventDefault();
          fetchCredentials();
        }}
      >
        <label>
          <p>enter the service</p>
          <input
            required
            className={styles.searchForm_input}
            type="text"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />
        </label>
        <p>Please enter master password</p>

        <label>
          <input
            className={styles.searchForm_input}
            type="password"
            value={masterpassword}
            onChange={(event) => setMasterpassword(event.target.value)}
          />
        </label>
        <button type="submit" className={styles.searchForm_button}>
          search
        </button>
      </form>

      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <CredentialCard
            credentialData={credential}
            onChange={() => {
              fetchCredentials();
            }}
          />
        ))}
      <Link to="/">
        <img
          src=" assets/BackButtonRight.svg"
          className={styles.searchForm_back}
        />
      </Link>
    </>
  );
}
