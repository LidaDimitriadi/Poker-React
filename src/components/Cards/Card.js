import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';

export const Card = ({ rank, suit }) => (
   <span className={className.front(rank, suit)}>
     <span className={styles.rank}>{rank}</span>
      <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${suit};`}} />
  </span>
 );

Card.PropTypes = {
  rank: React.PropTypes.char,
  weight: React.PropTypes.number,
  suit: React.PropTypes.string
};

export default Card;
