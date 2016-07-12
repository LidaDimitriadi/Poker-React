import { connect } from 'react-redux';
import { handleClick } from '../modules/deal';

import Poker from 'components/Cards';

const hand = [
  {'rank' : '7', 'suit' : 'hearts', 'id' : '0'},
  {'rank' : '6', 'suit' : 'clubs', 'id' : '1'},
  {'rank' : 'Q', 'suit' : 'hearts', 'id' : '2'},
  {'rank' : 'A', 'suit' : 'diams', 'id' : '3'},
  {'rank' : '9', 'suit' : 'spades', 'id' : '4'}
];

const mapActionCreators = {
  handleClick: () => handleClick()
};

const mapStateToProps = (state) => ({
  deal: state.deal,
  hand: hand
});

//pws pernaw props etsi????
export default connect(mapStateToProps, mapActionCreators)(Poker);
