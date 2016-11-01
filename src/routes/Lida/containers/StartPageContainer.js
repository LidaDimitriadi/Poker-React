import { connect } from 'react-redux';
import { startGame } from '../modules/poker';
import { StartPage } from '../components/StartPage.js';

const mapActionCreators = {
  startGame: () => startGame()
};

const mapStateToProps = (state) => ({
  started: state.game.started
});


export default connect(mapStateToProps, mapActionCreators)(StartPage);
