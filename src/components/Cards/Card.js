import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';

export const Card = ({chosen, chosenCard, rank, suit, id, frontCard}) => (
  <div className={(chosen ? styles.chosenCard : styles.normalCard)} onClick={() => chosenCard(id)}>
      <span className={frontCard ? className.front(rank, suit) : className.back}>
         <span className={styles.rank}>{rank}</span>
          <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${suit};`}} />
      </span>
    </div>
);

Card.PropTypes = {
  id: React.PropTypes.number,
  rank: React.PropTypes.char,
  suit: React.PropTypes.string,
  chosen: React.PropTypes.boolean,
  frontCard: React.PropTypes.boolean,
  chosenCard: React.PropTypes.func
};

export default Card;
