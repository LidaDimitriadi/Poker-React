import { connect } from 'react-redux';
import { submit, invalidForm, startGame } from '../modules/poker.js';
import Form from '../components/Form.js';

const mapFormActionCreators = {
  submit: (values) => submit(values),
  invalidForm: () => invalidForm(),
  startGame: () => startGame()
};

const mapFormStateToProps = (state) => ({
  validForm: state.game.validForm,
  showValidationMsg: state.game.showValidationMsg
});

export default connect(mapFormStateToProps, mapFormActionCreators)(Form);
