import React from 'react';
import styles from './styles/cards.css';

export const Card = ({ rank, suit }) => (
   <span className={className.front(rank, suit)}>
     <span className={styles.rank}>{rank}</span>
      <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${suit};`}} />
  </span>
 );
