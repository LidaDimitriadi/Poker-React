import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';

export const Card = ({ rank, suit }) => (
   <span className={className.front(rank, suit)}>
     <span className={styles.rank}>{rank}</span>
      <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${suit};`}} />
  </span>
 );

const className =  {
  front: (rank, suit) => classNames(
    styles.card,
    styles['rank-' + rank.toLowerCase()],
    styles[suit],
  ),
  back: classNames(styles.card, styles.back),
};

export const Hand = () => (
  <div className={classNames(styles.playingCards, styles.simpleCards)}>
    <Card rank={'10'} suit={'spades'} />
    <Card rank={'J'} suit={'spades'} />
    <Card rank={'Q'} suit={'spades'} />
    <Card rank={'K'} suit={'spades'} />
    <Card rank={'A'} suit={'spades'} />
  </div>
);
