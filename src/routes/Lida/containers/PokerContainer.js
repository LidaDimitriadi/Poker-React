import { connect } from 'react-redux';
import { handleClick } from '../modules/deal';
import { updateHand } from '../modules/deal';
import { chosenCard } from '../modules/deal';
import Poker from 'components/Cards';


//====================
//REDUX STATE HANDLING
//====================

const mapActionCreators = {
  handleClick: () => handleClick(),
  updateHand: () => updateHand(),
  chosenCard: () => chosenCard()
};



const mapStateToProps = (state) => ({
  game: state.game.deal,
  updated: state.game.updated,
  hand: state.game.hand,
  deck: state.game.cards,
  cardsToDiscard: state.game.chosenCards
});


export default connect(mapStateToProps, mapActionCreators)(Poker);
