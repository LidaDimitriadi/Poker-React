/*import React from 'react';
import className from './className.js';
import classNames from 'classnames';
import styles from './styles/cards.css';
import Card from './Card.js';

export const Hand = (props) => {

  var _getCards = function(hand) {
    console.log(hand.cards.map( (card) => (<Card rank={card.rank} suit={card.suit} chosen={card.chosen}/>) ));
    return hand.cards.map( (card) => (<Card rank={card.rank} suit={card.suit} chosen={card.chosen}/>) ) || null ;
  };

  const hands = _getCards(props.hand);

  //paei gia render
  return <div className={classNames(styles.playingCards, styles.simpleCards), styles.handClass}>
    {hands}
    <div className={styles.ratingClass}>Your rating is: {props.hand.rate} </div>
    <button onClick={props.dropWithdraw}>Drop-Withdraw</button>
  </div>;
};

Hand.PropTypes = {
  hand: React.PropTypes.array,
  rating: React.PropTypes.string,
  withdrew: React.PropTypes.boolean,
  dropWithdraw: React.PropTypes.func
};

export default Hand;*/
