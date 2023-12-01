import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from './components/Context';

const PrivateRoute = ({ children }) => {
  
  const location = useLocation();

  //Checks if there is an authenticated user - sends to the requested route('children') if so & to the signIn page if not
  return (
    <AuthConsumer>
      { context => (
        context.id ? children : <Navigate to="/signin" state={{ 'prevLocation': location.pathname }}/>
      )}
    </AuthConsumer>
  );
};

export default PrivateRoute;

// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
// This link shows how to migrate from PrivateRoutes in React Router V.4 to PrivateRoutes in V.6