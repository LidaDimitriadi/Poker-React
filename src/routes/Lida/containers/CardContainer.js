import { connect } from 'react-redux';
import { chosenCard } from '../modules/deal';
import { Card } from 'components/Cards';


//====================
//REDUX STATE HANDLING
//====================

const mapCardActionCreators = {
  chosenCard: (id) => chosenCard(id)
};


export default connect(null, mapCardActionCreators)(Card);
