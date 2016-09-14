import { connect } from 'react-redux';
import { updateHand } from '../modules/poker';
import { Hand } from 'components/Cards/Hand';

const mapHandActionCreators = {
  updateHand: () => updateHand()
};

const mapHandStateToProps = (state) => ({
  getWinner: state.game.getWinner
});

export default connect(mapHandStateToProps, mapHandActionCreators)(Hand);
