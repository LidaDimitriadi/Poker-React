import React from 'react';
import classNames from 'classnames';
import styles from 'components/Cards/styles/cards.css';
import Card from '../containers/CardContainer';
import CardBack from 'components/Cards/CardBack';


export const Poker = (props) =>  {
  const cards = props.hand.cards.map((card) => (
    <Card
    rank={card.rank}
    suit={card.suit}
    chosen={card.chosen}
    key={card.key}
    id={card.key}
    />
  ));

  return <div className={styles.containerClass}>
    <div className={classNames(styles.playingCards, styles.simpleCards)}>
    <ul className={classNames(styles.deck)}>
       <li><CardBack /></li>
       <li><CardBack /></li>
       <li><CardBack /></li>
       <li><CardBack /></li>
       <li><CardBack /></li>
       <li><CardBack /></li>
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
  cardsToDiscard: React.PropTypes.array,
  handleClick: React.PropTypes.func,
  updateHand: React.PropTypes.func
};

export default Poker;
