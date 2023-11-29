import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UserSignUp - A class component that handles user registration.
 * 
 * Manages the state for user sign-up fields and handles input changes, form submission,
 * and form validation. Renders a form for users to enter their details and sign up.
 * Also displays any validation errors.
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

  // Handles input field changes and updates the component state

  render() {
    const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.checkPasswords}>
            <div>
              <input 
                id='firstName' 
                name='firstName' 
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={this.change} />
            </div>
            <div>
              <input 
                id='lastName' 
                name='lastName' 
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={this.change} />
            </div>
            <div>
              <input 
                id='emailAddress' 
                name='emailAddress' 
                type='text'
                placeholder='Email Address'
                value={emailAddress}
                onChange={this.change} />
            </div>
            <div>
              <input 
                id='password' 
                name='password' 
                type='password'
                placeholder='Password'
                value={password}
                onChange={this.change} />
            </div>
            <div>
              <input 
                id='confirmPassword' 
                name='confirmPassword' 
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={this.change} />
            </div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Sign Up</button>
              <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
            </div>
          </form>
          <p>Already have a user account? <Link to='/signin'>Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}
