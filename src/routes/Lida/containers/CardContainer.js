import { connect } from 'react-redux';
import { chosenCard } from '../modules/poker';
import { Card } from 'components/Cards/Card';


//====================
//REDUX STATE HANDLING
//====================

const mapCardActionCreators = {
  chosenCard: (id) => chosenCard(id)
};


export default connect(null, mapCardActionCreators)(Card);
