import React from 'react';
import styles from 'components/Cards/styles/cards.css';
import Poker from '../containers/PokerContainer.js';
import Form from '../containers/FormContainer.js';

export const StartPage = (props) => (
  <div>
    { !props.started ?
      <Form />
    : <Poker /> }
    <button type="submit" onClick={ props.startGame } className={ !props.started ? styles.visible : styles.hidden }>GO!</button>
  </div>
);


StartPage.PropTypes = {
  started: React.PropTypes.boolean,
  startGame: React.PropTypes.func,
};

export default StartPage;
