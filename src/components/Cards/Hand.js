import React from 'react';
import className from './className.js';
import classNames from 'classnames';
import styles from './styles/cards.css';
import Card from './Card.js';

export const Hand = (props) => {

  var _getCards = function(hand) {
    return hand.map( (card) => (<Card rank={card.rank} suit={card.suit} />) );
  };

  const hands = _getCards(props.hand);

  //paei gia render
  return <div className={classNames(styles.playingCards, styles.simpleCards)}>
    {hands}
  </div>;
};

Hand.PropTypes = {
  hand: React.PropTypes.array
};

export default Hand;
