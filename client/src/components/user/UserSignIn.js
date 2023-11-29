import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UserSignIn - A class component for user authentication.
 *
 * This component manages the state for user sign-in, handles input changes,
 * and submits the sign-in form. It also renders a form for users to enter
 * their credentials and displays any authentication errors.
 */
export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  };

  /**
   * Handles input field changes and updates the component state.
   *
   * @param {Object} event - The input change event.
   */
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * Submits the sign-in form.
   *
   * On successful sign-in, redirects the user. On failure, updates the state
   * with error messages.
   *
   * @param {Object} event - The form submission event.
   */
  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState({ errors: ['Sign-in was unsuccessful.'] });
        } else {
          console.log(`${emailAddress} is now signed in!`);
          this.props.history.push(from);
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  /**
   * Cancels the sign-in and redirects to the default route.
   *
   * @param {Object} event - The click event.
   */
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.submit}>
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
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Sign In</button>
              <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
            </div>
          </form>
          <p>Not yet a user? <Link to='/signup'>Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}
