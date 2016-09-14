import React from 'react';
import classNames from 'classnames';
import styles from 'components/Cards/styles/cards.css';
import Card from 'routes/Lida/containers/CardContainer';

export const Hand = (props) => {
  const cards = props.hand.cards.map((card) => (
    props.front ?
    <Card rank={card.rank} suit={card.suit} chosen={card.chosen} key={card.key} id={card.key} frontCard={props.front} />
    :
    <Card rank={card.rank} suit={card.suit} chosen={card.chosen} key={card.key} id={card.key} frontCard={props.front} />
  ));

  return <div className={classNames(styles.playingCards, styles.simpleCards), styles.handClass}>
    {cards}
    { props.front ?
      <div>
      <div className={styles.ratingClass}>Your rating is: {props.hand.rate} </div>
      <button onClick={props.updateHand} className={ !props.getWinner ? styles.visible : styles.hidden } >Update Hand</button>
      </div>
      : <span />
    }
  </div>
}

Hand.PropTypes = {
  front : React.PropTypes.boolean,
  hand: React.PropTypes.array,
  getWinner: React.PropTypes.boolean,
  updateHand: React.PropTypes.func
}
