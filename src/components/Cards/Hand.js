import React from 'react';
import classNames from 'classnames';
import styles from 'components/Cards/styles/cards.css';
import Card from 'routes/Lida/containers/CardContainer';

export const Hand = (props) => {
  const cards = props.hand.cards.map((card) => (
    <Card rank={card.rank} suit={card.suit} chosen={card.chosen} key={card.key} id={card.key} frontCard={props.front} />
  ));

  const handsStyle = {
    width: `${props.width}%`,
    margin: '0px',
  };

  return <div className={classNames(styles.playingCards, styles.simpleCards), styles.handClass} style={ handsStyle }>
    {cards}
    { props.front ?
      <div className={styles.ratingWrap}>
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
  key: React.PropTypes.number,
  updateHand: React.PropTypes.func
}
