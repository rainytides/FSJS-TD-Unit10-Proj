import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * UserSignOut - Component that signs out the user and redirects to the home page.
 *
 * When this component is rendered, it executes the sign-out logic provided
 * through the context and redirects the user to the home page using Navigate.
 *
 * @param {Object} context - The application context containing the signOut action.
 * @returns {ReactElement} - A Navigate component that redirects to the home page.
 */
export default function UserSignOut({ context }) {
  // Use the useEffect hook to trigger sign out when the component mounts
  useEffect(() => {
    context.actions.signOut();
  }, [context.actions]);

  // Navigate to the home page after signing out
  return <Navigate to="/" replace />;
}
