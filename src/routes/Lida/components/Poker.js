import React from 'react';
import classNames from 'classnames';
import styles from 'components/Cards/styles/cards.css';
import Hand from '../containers/HandContainer';
import CardBack from 'components/Cards/CardBack';

export const Poker = (props) =>  {
  const playerHand = <Hand hand={props.players[0]} cardsToDiscard={props.cardsToDiscard} front={true} />;
  const computerPlayers = props.players.slice(1, props.players.length);
  const computerHands = computerPlayers.map((hand) => (<Hand hand={hand} cardsToDiscard={props.cardsToDiscard} front={props.getWinner ? true : false} />));
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
       <button onClick={props.handleClick}> { props.game ? 'Shuffle' : 'Deal!'} </button>
       <div  className={props.getWinner ? styles.visible : styles.hidden}>
         <b>{props.result}</b>
       </div>
        { props.game ?
          <div>
          { playerHand }
          { computerHands }
          </div>
        : <span />
        }
        <button onClick={props.evaluateHands} className={ props.game && !props.getWinner ? styles.visible : styles.hidden }>Evaluate!</button>

       </div>
     </div>
};

Poker.PropTypes = {
  players: React.PropTypes.array,
  game: React.PropTypes.boolean,
  getWinner: React.PropTypes.boolean,
  deck: React.PropTypes.array,
  cardsToDiscard: React.PropTypes.array,
  result: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  evaluateHands: React.PropTypes.func
};

export default Poker;
