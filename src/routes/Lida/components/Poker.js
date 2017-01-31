import React from 'react';
import classNames from 'classnames';
import styles from 'components/Cards/styles/cards.css';
import Hand from '../containers/HandContainer';
import CardBack from 'components/Cards/CardBack';

export const Poker = (props) =>  {
  let i = 0;
  const playerHand = <Hand hand={ props.players[0]} cardsToDiscard={props.cardsToDiscard} front={true} key={i} width={100}/>;
  const computerPlayers = props.players.slice(1, props.players.length);
  const width = 100/computerPlayers.length;
  const computerHands = computerPlayers.map((hand) => {
                                                i++;
                                                return <Hand hand={hand} cardsToDiscard={props.cardsToDiscard} front={props.getWinner ? true : false} key={i} width={width}/>
                                              });
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
            <div className={ styles.computerStyle } >
              { computerHands }
            </div>
            <div className={ styles.playerStyle }>
              { playerHand }
            </div>
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
