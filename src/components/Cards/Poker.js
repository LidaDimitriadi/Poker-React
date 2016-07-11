import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';
import Hand from './Hand.js';

export const Poker = (props) => {
/*  constructor() {
    super();
    this.state = {
     deal: false
    };
 }

  var _handleClick = function() {
    this.setState({deal : !this.state.deal});
  };*/

  return <div className={classNames(styles.playingCards, styles.simpleCards)}>
     <div className={className.back}></div>
     <button>Deal!</button>
     <Hand hand={props.hand}/>
   </div>
};

Poker.PropTypes = {
  hand: React.PropTypes.array,
  handleClick: React.PropTypes.func
};

export default Poker;
