import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styles from 'components/Cards/styles/cards.css';
import classNames from 'classnames';
import Visible from 'react-visible';

class Form extends Component {

  cx = classNames.bind(styles)

  btnClass = this.cx('btn',
          'btn-success',
          'btn-lg',
          { goBtn: true });

  constructor(props) {
    super(props);
    this.state = { Name: '',
                   NumberOfOpponents: ''
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.name == "Name") {
      this.setState({ Name: event.target.value });
    }
    else {
      this.setState({ NumberOfOpponents: event.target.value });
    }
  }

  handleSubmit(event) {
    if(this.state.Name == '' || this.state.NumberOfOpponents == '') {
      this.props.invalidForm();
    }
    else {
      this.props.submit(this.state);
    }
  }

  render() {
      return (
      <form>
        <div className="form-group">
          <label htmlFor="Name" className="col-md-2">UserName</label>
          <input name="Name" type="text" placeholder="Username" onChange={ this.handleChange } value={ this.state.Name } className="col-md-4 form-control"/>
        </div>
          <label>Choose number of Opponents!</label>
          <div>
            <label>Number of Opponents</label>
            <div>
              <label><input name="NumberOfOpponents" type="radio" value="1" onChange={ this.handleChange }  /> 1</label>
              <label><input name="NumberOfOpponents" type="radio" value="2" onChange={ this.handleChange }  /> 2</label>
              <label><input name="NumberOfOpponents" type="radio" value="3" onChange={ this.handleChange }  /> 3</label>
            </div>
          </div>
          <div className={ !this.props.showValidationMsg ? styles.hidden : styles.visible }>Please submit name and number of players</div>
        <button type="button" className='btn btn-default' onClick={ this.handleSubmit }>Submit</button>
        <Visible isVisible={ this.props.validForm }>
          <button type="button" className={ this.btnClass } onClick={ this.props.startGame } >GO!</button>
        </Visible>
      </form>
    );
  }
};


// Decorate the form component
export default reduxForm({
  form: 'login' // a unique name for this form
})(Form);
