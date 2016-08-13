import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';
import Card from './Card.js';

export const Poker = (props) =>  {
  console.log("trexw pokeeer");
  const _getCards = function(hand) {
    return hand.cards.map( (card) => (<Card rank={card.rank} suit={card.suit} chosen={card.chosen} id={card.key} chosenCard={() => props.chosenCard(card.key)}/>));
  };

  const cards = _getCards(props.hand);

  return <div className={styles.containerClass}>
    <div className={classNames(styles.playingCards, styles.simpleCards)}>
    <ul className={classNames(styles.deck)}>
       <li><div className={className.back}></div></li>
       <li><div className={className.back}></div></li>
       <li><div className={className.back}></div></li>
       <li><div className={className.back}></div></li>
       <li><div className={className.back}></div></li>
       <li><div className={className.back}></div></li>
    </ul>
       <button onClick={props.handleClick}>{ props.game ? 'Shuffle' : 'Deal!'}</button>
        { props.game ?
        <div className={classNames(styles.playingCards, styles.simpleCards), styles.handClass}>
          {cards}
          <div className={styles.ratingClass}>Your rating is: {props.hand.rate} </div>
          <button onClick={props.updateHand}>Update Hand</button>
        </div>
        : <span /> }
       </div>
     </div>
};



Poker.PropTypes = {
  hand: React.PropTypes.array,
  game: React.PropTypes.boolean,
  deck: React.PropTypes.array,
  handleClick: React.PropTypes.func,
  chosenCard: React.PropTypes.func,
  updateHand: React.PropTypes.func
};

export default Poker;
