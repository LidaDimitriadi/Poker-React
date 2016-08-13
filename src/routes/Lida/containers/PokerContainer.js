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
  chosenCard: (id) => chosenCard(id)
};

const mapStateToProps = (state) => ({
  game: state.game.deal,
  hand: state.game.hand,
  deck: state.game.cards,
});

export default connect(mapStateToProps, mapActionCreators)(Poker);
