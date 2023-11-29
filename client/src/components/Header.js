import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * Header - Functional component for displaying the top menu bar.
 * 
 * It renders navigation links and shows user-specific options based on 
 * authentication status. If a user is authenticated, it shows a welcome 
 * message and a sign-out link. Otherwise, it shows links for signing up and 
 * signing in.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.context - Context containing the authenticated user information
 * @returns JSX element representing the header of the application.
 */
export default function Header({ context }) {
  const authUser = context.authenticatedUser;

  return (
    <div className='header'>
      <div className='bounds'>
        <h1 className='header--logo'>
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          {authUser ? (
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <NavLink className='signout' to='/signout'>Sign Out</NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className='signup' to='/signup'>Sign Up</NavLink>
              <NavLink className='signin' to='/signin'>Sign In</NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
}
