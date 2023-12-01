import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UserSignIn - Functional component for user authentication.
 *
 * Manages state for user sign-in, handles form input changes, submits the sign-in form,
 * and displays any authentication errors. Redirects user after successful sign-in.
 */
const UserSignIn = ({ context }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (event) => {
    const { name, value } = event.target;
    name === 'emailAddress' ? setEmailAddress(value) : setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          setErrors(['Sign-in was unsuccessful.']);
        } else {
          navigate(from);
        }
      })
      .catch(error => {
        console.error(error);
        navigate('/error');
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className='bounds'>
      <div className='grid-33 centered signin'>
        <h1>Sign In</h1>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id='emailAddress'
              name='emailAddress'
              type='text'
              placeholder='Email Address'
              value={emailAddress}
              onChange={handleChange} />
          </div>
          <div>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={handleChange} />
          </div>
          <div className='grid-100 pad-bottom'>
            <button className='button' type='submit'>Sign In</button>
            <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        <p>Not yet a user? <Link to='/signup'>Click here</Link> to sign up!</p>
      </div>
    </div>
  );
};

export default UserSignIn;
