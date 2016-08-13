import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';

export const Card = (props) => (
  <div className={(props.chosen ? styles.chosenCard : styles.normalCard)} onClick={props.chosenCard}>
      <span className={className.front(props.rank, props.suit)}>
         <span className={styles.rank}>{props.rank}</span>
          <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${props.suit};`}} />
      </span>
    </div>
);



Card.PropTypes = {
  id: React.PropTypes.number,
  rank: React.PropTypes.char,
  suit: React.PropTypes.string,
  chosen: React.PropTypes.boolean,
  chosenCard: React.PropTypes.func
};

export default Card;
