import React from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
  onChange(): void;
};

export default function CredentialCard({
  credentialData,
  onChange,
}: CredentialCardProps): JSX.Element {
  async function deleteCredential() {
    const response = await fetch(`/api/credentials/${credentialData.service}`, {
      method: 'DELETE',
    });
    await response.text();

    onChange();
  }

  return (
    <table className={styles.cardBox_table}>
      <tr>
        <td className={styles.cardBox_names}>service</td>
        <td className={styles.cardBox_info}>{credentialData.service}</td>
      </tr>
      <tr>
        <td className={styles.cardBox_names}>username</td>
        <td className={styles.cardBox_info}>{credentialData.username}</td>
      </tr>
      <tr className={styles.cardBox_info_container}>
        <td className={styles.cardBox_names}>password</td>
        <td className={styles.cardBox_info}>{credentialData.password}</td>
        <td>
          <Link to="/credential/:service/EditCredential">
            <img
              src="assets/EditButton.svg"
              className={styles.cardBox_editButton}
            />
          </Link>
        </td>
        <td>
          <button
            onClick={() => {
              deleteCredential();
            }}
            className={styles.cardBox_deleteButton}
          >
            <img src="assets/deleteButton.svg" />
          </button>
        </td>
      </tr>
    </table>
  );
}
