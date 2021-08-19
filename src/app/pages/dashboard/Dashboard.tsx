import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import type { Credential } from '../../../types';

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

  return (
    <main>
      <h1 className={styles.header}>Password manager</h1>
      <h2 className={styles.subHeader}>
        Your personal password manager powered by caffeine and sweat!
      </h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, ipsam.
        Adipisci quos sint mollitia voluptatem fugiat, eligendi quas optio minus
        officia quam deserunt voluptate aut nobis cum corrupti assumenda quasi!
      </p>
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
      {credentials.length !== 0 &&
        credentials.map((credential) => (
          <div>
            <p>{credential.service}</p>
            <p>{credential.username}</p>
            <p>{credential.password}</p>
          </div>
        ))}
    </main>
  );
}
