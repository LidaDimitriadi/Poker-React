import React from 'react';
import styles from './styles/cards.css';

export const Card = ({rank, suit}) => (
  <div className={`${styles.card} ${styles['rank-' + rank]} ${styles[suit]}`}>
    <span className={styles.rank}>7</span>
    <span className={styles.suit}/>
  </div>
);
