import { connect } from 'react-redux';
import { handleClick, evaluateHands } from '../modules/poker';
import Poker from '../components/Poker';


//====================
//REDUX STATE HANDLING
//====================

const mapActionCreators = {
  handleClick: () => handleClick(),
  evaluateHands: () => evaluateHands(),
};

const mapStateToProps = (state) => ({
  game: state.game.deal,
  getWinner: state.game.getWinner,
  playerHand: state.game.playerHand,
  computerHand: state.game.computerHand,
  deck: state.game.cards,
  cardsToDiscard: state.game.chosenCards,
  result: state.game.result
});

export default connect(mapStateToProps, mapActionCreators)(Poker);
