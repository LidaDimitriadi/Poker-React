import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styles from 'components/Cards/styles/cards.css';

class Form extends Component {

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
    if(this.state.Name == '' || this.state.NumberOfOpponents == ''){
      this.props.invalidForm();
    }
    else {
      this.props.submit(this.state);
    }
  }

  render() {
      return (
      <form>
        <div>
          <label htmlFor="Name">UserName</label>
          <input name="Name" type="text" placeholder="Username" onChange={ this.handleChange } value={ this.state.Name }/>
        </div>
        <div>
          <label>Choose number of Opponents!</label>
          <div>
            <label>Number of Opponents</label>
            <div>
              <label><input name="NumberOfOpponents" type="radio" value="1" onChange={ this.handleChange }  /> 1</label>
              <label><input name="NumberOfOpponents" type="radio" value="2" onChange={ this.handleChange }  /> 2</label>
              <label><input name="NumberOfOpponents" type="radio" value="3" onChange={ this.handleChange }  /> 3</label>
            </div>
          </div>
          <div className={ this.props.validForm ? styles.hidden : styles.visible }>Please submit name and number of players</div>
        </div>
        <button type="button" onClick={ this.handleSubmit }>Submit</button>
      </form>
    );
  }
};


// Decorate the form component
export default reduxForm({
  form: 'login' // a unique name for this form
})(Form);
