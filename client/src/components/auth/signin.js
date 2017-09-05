import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);

    this.props.signinUser({ email, password });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label htmlFor="email">Email:</label>
          <Field
            name="email"
            component="input"
            type="text"
            className="form-control"
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password:</label>
          <Field
            name="password"
            component="input"
            type="text"
            className="form-control"
          />
        </fieldset>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

Signin = connect(null, actions)(Signin);

export default reduxForm({
  form: 'signin'
})(Signin);
