import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context'; // Import Consumer from context for accessing global state

/**
 * ProtectedRoute - A Higher-Order Component (HOC) for configuring protected routes.
 * It renders the passed component if the user is authenticated, otherwise redirects to the sign-in page.
 * 
 * @param {object} props - The props object, destructured to extract the component and any remaining properties.
 * @param {React.Component} props.component - The component to be rendered if the user is authenticated.
 * @param {object} rest - Any additional props passed to the component.
 * @returns {React.Component} - A Route component or a Redirect component based on the authentication status.
 */
export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authenticatedUser ? (
              // Render the Component if the user is authenticated
              <Component {...props} />
            ) : (
              // Redirect to sign-in page if the user is not authenticated
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
}
