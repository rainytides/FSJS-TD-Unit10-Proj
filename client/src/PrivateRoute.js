import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Consumer } from './Context';

/**
 * PrivateRoute - A wrapper component for protecting routes that require authentication.
 *
 * This component uses the `useLocation` hook to get the current location and the `Consumer`
 * from the Context API to check for an authenticated user. If the user is authenticated,
 * it renders the children; otherwise, it redirects to the sign-in page.
 *
 * @param {React.Component} children - The component to render if the user is authenticated.
 * @returns {React.Component} - Either the children components or a Navigate component for redirection.
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation(); // Get the current location using the useLocation hook

  return (
    <Consumer>
      {context =>
        // Check if there is an authenticated user in the context
        context.authenticatedUser
          ? children // If authenticated, render the children components
          : <Navigate to="/signin" state={{ from: location }} replace /> // Otherwise, redirect to the sign-in page
      }
    </Consumer>
  );
};

export default PrivateRoute;
