import { connect } from 'react-redux';
import { StartPage } from '../components/StartPage.js';

const mapStateToProps = (state) => ({
  started: state.game.started
});


export default connect(mapStateToProps, null)(StartPage);
