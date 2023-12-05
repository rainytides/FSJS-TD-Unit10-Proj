import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UserSignIn - A class component for rendering the user sign-in form.
 * It manages user inputs, sign-in submission, and provides options to cancel or navigate to the sign-up page.
 */
export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  // Handles input changes and updates the component state.
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Handles form submission for user sign-in.
  submit = (event) => {
    event.preventDefault();
    const { context, history, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (!user) {
          this.setState({ errors: ['Sign-in was unsuccessful.'] });
        } else {
          console.log(`${emailAddress} is now signed in!`);
          history.push(from);
        }
      })
      .catch(error => {
        console.log(error);
        history.push('/error');
      });
  };

  // Redirects the user to the home page when 'Cancel' is clicked.
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
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }
}
