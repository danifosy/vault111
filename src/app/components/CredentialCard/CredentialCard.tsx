import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
};

export default function CredentialCard({
  credentialData,
}: CredentialCardProps): JSX.Element {
  return (
    <main className={styles.tableWrapper}>
      <table className={styles.cardBox_table}>
        <td>
          <tr className={styles.cardBox_names}>service</tr>
          <tr className={styles.cardBox_names}>username</tr>
          <tr className={styles.cardBox_names}>password</tr>
        </td>
        <td className={styles.cardBox_info_container}>
          <tr className={styles.cardBox_info}>{credentialData.service}</tr>
          <tr className={styles.cardBox_info}>{credentialData.username}</tr>
          <tr className={styles.cardBox_info}>{credentialData.password}</tr>
        </td>
        <td>
          <tr>
            <img
              src="assets/deleteButton.svg"
              className={styles.cardBox_deleteButton}
            />
          </tr>
        </td>
      </table>
    </main>
  );
}
