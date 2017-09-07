import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit = (values) => {
        this.props.signupUser(values);
    };

    renderAlert = () => {
        const { errorMessage } = this.props;

        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Ooops!</strong> {errorMessage}
                </div>
            );
        }
    }

    renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
    }) => {
        return (
            <div>
                <input {...input} placeholder={label} type={type} className="form-control"/>
                {
                    touched && error && (
                        <div className="error">{error}</div>
                    )
                }
            </div>
        );
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Field
                        name="email"
                        component={this.renderField}
                        type="text"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Field
                        name="password"
                        component={this.renderField}
                        type="password"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="passwordConfirm">Password Confirm:</label>
                    <Field
                        name="passwordConfirm"
                        component={this.renderField}
                        type="password"
                    />
                </fieldset>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">
                    Sign up
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (
        values.password &&
        values.passwordConfirm &&
        values.password !== values.passwordConfirm
    ) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
    form: 'signup',
    validate
})(Signup);
