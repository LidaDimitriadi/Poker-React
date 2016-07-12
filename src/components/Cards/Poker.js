import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';
import classes from './styles/PokerView.scss';
import Hand from './Hand.js';

export const Poker = (props) => (
  <div className={classes.containerClass}>
    <div className={classNames(styles.playingCards, styles.simpleCards)}>
       <div className={className.back}></div>
       <button onClick={props.handleClick}>Deal!</button>
       <div>
        { props.deal ? <Hand hand={props.hand}/> : <span /> }
       </div>
     </div>
   </div>
);

Poker.PropTypes = {
  hand: React.PropTypes.array,
  deal: React.PropTypes.boolean,
  handleClick: React.PropTypes.func
};

export default Poker;
