import { connect } from 'react-redux';
import { submit, invalidForm } from '../modules/poker.js';
import Form from '../components/Form.js';

const mapFormActionCreators = {
  submit: (values) => submit(values),
  invalidForm: () => invalidForm()
};

const mapFormStateToProps = (state) => ({
  validForm: state.game.validForm
});

export default connect(mapFormStateToProps, mapFormActionCreators)(Form);
