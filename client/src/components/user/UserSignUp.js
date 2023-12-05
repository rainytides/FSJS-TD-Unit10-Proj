import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UserSignUp - A class component for handling user sign-up.
 * It allows users to create a new account and handles validation errors.
 */
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  };

  // Handles changes in form inputs and updates state accordingly.
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Validates passwords before submitting the form.
  checkPasswords = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = this.state; 

    if (password !== confirmPassword) {
      this.setState({ errors: ['Passwords do not match.'] });
    } else {
      this.submit(event);
    }
  };

// Submits the user's data for account creation.
submit = (event) => {
  event.preventDefault();
  const { context, history } = this.props;
  const { firstName, lastName, emailAddress, password } = this.state; 
  const user = { firstName, lastName, emailAddress, password };

  context.data.createUser(user)
    .then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log(`${emailAddress} is successfully signed up and authenticated!`);
        context.actions.signIn(emailAddress, password)
          .then(() => history.push('/'));
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({ errors: ['An unexpected error occurred.'] });
    });
};

  // Cancels the sign-up and redirects to the home page.
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  render() {
    const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.checkPasswords}>
            {/* Form fields for user sign-up */}
            <div><input id='firstName' name='firstName' type='text' placeholder='First Name' value={firstName} onChange={this.change} /></div>
            <div><input id='lastName' name='lastName' type='text' placeholder='Last Name' value={lastName} onChange={this.change} /></div>
            <div><input id='emailAddress' name='emailAddress' type='text' placeholder='Email Address' value={emailAddress} onChange={this.change} /></div>
            <div><input id='password' name='password' type='password' placeholder='Password' value={password} onChange={this.change} /></div>
            <div><input id='confirmPassword' name='confirmPassword' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={this.change} /></div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Sign Up</button>
              <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
            </div>
          </form>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}
