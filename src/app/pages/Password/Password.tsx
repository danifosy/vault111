import React from 'react';
import { useParams } from 'react-router';
import styles from './Password.module.css';

export default function Password(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return <p className={styles.text}>You are searching for {service} </p>;
}
