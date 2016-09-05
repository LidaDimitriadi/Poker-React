import { connect } from 'react-redux';
import { handleClick, updateHand } from '../modules/deal';
import Poker from '../components/Poker';


//====================
//REDUX STATE HANDLING
//====================

const mapActionCreators = {
  handleClick: () => handleClick(),
  updateHand: () => updateHand(),
};

const mapStateToProps = (state) => ({
  game: state.game.deal,
  hand: state.game.hand,
  deck: state.game.cards,
  cardsToDiscard: state.game.chosenCards
});

export default connect(mapStateToProps, mapActionCreators)(Poker);
