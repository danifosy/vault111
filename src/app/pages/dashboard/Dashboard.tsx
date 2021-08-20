import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterpassword, setMasterpassword] = useState('');
  // inside useEffect we want to fetch then set
  // fetch credentials, then setCredentials to fetched credentials

  //dependency array
  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: masterpassword,
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
    if (!masterpassword) {
      setCredentials([]);
    }
    // if you put variables into the [], the use effect function will always be called when the value of the vars changes
  }, [masterpassword]);

  if (credentials.length !== 0) {
    return (
      <main>
        {credentials.length !== 0 &&
          credentials.map((credential) => (
            <CredentialCard credentialData={credential} />
          ))}
        <Link to="/addCredential">
          <img src="assets/addButton.svg" className={styles.addButton} />
        </Link>
        <Link to="/searchCredential">
          <img src="assets/searchButton.svg" className={styles.searchButton} />
        </Link>
      </main>
    );
  } else {
    return (
      <main>
        <h2 className={styles.subHeader}>
          Your personal password manager powered by caffeine and sweat!
        </h2>

        <div className={styles.container}>
          <input
            type="password"
            placeholder="Masterpassword"
            className={styles.containerItems}
            value={masterpassword}
            onChange={(event) => setMasterpassword(event.target.value)}
          />
          <button className={styles.containerButton}>Login</button>
        </div>
      </main>
    );
  }
}
