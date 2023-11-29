import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

/**
 * Provider - A Higher-order component (HOC) that manages global state.
 *
 * Stores and provides application-wide state, such as authenticated user details.
 * It also provides actions like signIn and signOut to modify the global state.
 * Uses Cookies to persist authentication state between sessions.
 */
export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    unhashedPassword: Cookies.getJSON('unhashedPassword') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, unhashedPassword } = this.state;

    const value = {
      authenticatedUser,
      unhashedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  /**
   * Signs in the user by setting the state and cookies.
   *
   * @param {string} emailAddress - User's email address.
   * @param {string} password - User's password.
   * @returns {Object|null} The authenticated user object or null if authentication fails.
   */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    
    if (user !== null) {
      this.setState(() => ({
        authenticatedUser: user,
        unhashedPassword: password,
      }));
      
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('unhashedPassword', JSON.stringify(password), { expires: 1 });
    }
    
    return user;
  };

  /**
   * Signs out the user by clearing the state and removing cookies.
   * After sign out, the user cannot access private components.
   */
  signOut = () => {
    this.setState({ authenticatedUser: null, unhashedPassword: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('unhashedPassword');
  };
}

export const Consumer = Context.Consumer;

/**
 * withContext - A Higher-order component that wraps the given component in a Context Consumer.
 *
 * It injects the context into the component, making it available as a prop.
 *
 * @param {Component} Component - The component to be wrapped.
 * @returns {Component} The wrapped component with added context.
 */
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
