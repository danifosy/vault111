import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <>
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
          type="Username"
          placeholder="Username"
          className={styles.containerItems}
        />
        <input
          type="Masterpassword"
          placeholder="Masterpassword"
          className={styles.containerItems}
        />
        <button className={styles.containerButton}>Login</button>
      </div>
    </>
  );
}