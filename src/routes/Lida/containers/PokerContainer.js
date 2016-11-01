import { connect } from 'react-redux';
import { handleClick, evaluateHands } from '../modules/poker';
import { Poker } from '../components/Poker';


//====================
//REDUX STATE HANDLING
//====================

const mapPokerActionCreators = {
  handleClick: () => handleClick(),
  evaluateHands: () => evaluateHands(),
};

const mapPokerStateToProps = (state) => ({
  game: state.game.deal,
  getWinner: state.game.getWinner,
  players: state.game.players,
  deck: state.game.cards,
  cardsToDiscard: state.game.chosenCards,
  result: state.game.result
});

export default connect(mapPokerStateToProps, mapPokerActionCreators)(Poker);
