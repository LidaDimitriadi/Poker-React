import React from 'react';
import styles from 'components/Cards/styles/cards.css';
import Poker from '../containers/PokerContainer.js';
import Form from '../containers/FormContainer.js';

export const StartPage = (props) => (
  <div>
    { !props.started ?
      <Form />
    : <Poker /> }
  </div>
);


StartPage.PropTypes = {
  started: React.PropTypes.boolean,
};

export default StartPage;
