import React from 'react';
import className from './className.js';
import classNames from 'classnames';
import styles from './styles/cards.css';
import Card from './Card.js';

export const Hand = (props) => {

  var _getCards = function(hand) {
    return hand.cards.map( (card) => (<Card rank={card.rank} suit={card.suit} />) );
  };

  const hands = _getCards(props.hand);

  //paei gia render
  return <div className={classNames(styles.playingCards, styles.simpleCards)}>
    {hands}
    <span>Your rating is: {props.hand.rate} </span>
  </div>;
};

Hand.PropTypes = {
  hand: React.PropTypes.array,
  rating: React.PropTypes.string
};

export default Hand;
