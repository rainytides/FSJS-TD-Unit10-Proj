import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * UserSignOut - A functional component to handle user sign-out.
 *
 * This component triggers the sign-out action and then redirects the user
 * to the default (home) page. It leverages the context for accessing
 * the signOut method defined in the application's context.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.context - The application context containing the signOut action
 * @returns {ReactElement} - A Redirect component to navigate to the home page
 */
export default function UserSignOut({ context }) {
  // Trigger user sign-out
  context.actions.signOut();

  // Redirect to the home page
  return <Redirect to='/' />;
}
