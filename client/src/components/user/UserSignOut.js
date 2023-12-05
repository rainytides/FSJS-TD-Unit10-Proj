import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * SignOut - Functional component to handle user sign-out.
 * It triggers the sign-out action and then redirects the user to the homepage.
 * 
 * @param {object} props - Component props.
 * @param {object} props.context - Context containing the sign-out action.
 * @returns {React.Component} Redirect component to navigate to the homepage.
 */
const SignOut = ({ context }) => {
  // Trigger the sign-out action from the context
  context.actions.signOut();

  // Redirect to the home page after signing out
  return <Redirect to='/' />;
}

export default SignOut;
