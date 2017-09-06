import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);

    this.props.signinUser({ email, password });
  };

  renderAlert() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {errorMessage}
        </div>
      );
    }
  }

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
            type="password"
            className="form-control"
          />
        </fieldset>
        {
          this.renderAlert()
        }
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin'
})(Signin);
