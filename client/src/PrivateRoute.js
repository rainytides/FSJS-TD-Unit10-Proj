import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/**
 * PrivateRoute - A higher-order component for creating protected routes.
 *
 * This component uses the Consumer to access the application context and
 * determines if there is an authenticated user. If a user is authenticated,
 * it renders the requested component; otherwise, it redirects to the sign-in page.
 *
 * @param {Object} { component: Component, ...rest } - The component to render and any additional props.
 * @returns The rendered component or a redirect to the sign-in page.
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {context => (
      <Route
        {...rest}
        render={props => 
          context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location },
            }} />
          )
        }
      />
    )}
  </Consumer>
);

export default PrivateRoute;
