import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

/**
 *  Provider - A Higher-order component (HOC) that manages global state.
 *
 * Stores and provides application-wide state, such as authenticated user details.
 * It also provides actions like signIn and signOut to modify the global state.
 * Uses Cookies to persist authentication state between sessions.
 */
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    // Attempt to retrieve and parse user data from cookies
    const cookieUser = Cookies.get('authenticatedUser');
    const cookiePassword = Cookies.get('unhashedPassword');
    
    // Initialize state with either parsed cookie data or null
    this.state = {
      authenticatedUser: cookieUser ? JSON.parse(cookieUser) : null,
      unhashedPassword: cookiePassword ? JSON.parse(cookiePassword) : null,
    };
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

    // Render a context provider to supply the global state and actions to the component tree
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  // Sign in and update the global state and cookies
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState({
        authenticatedUser: user,
        unhashedPassword: password,
      });
      
      // Set cookies to persist login state
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('unhashedPassword', JSON.stringify(password), { expires: 1 });
    }
    return user;
  };

  // Sign out and clear the global state and cookies
  signOut = () => {
    this.setState({ authenticatedUser: null, unhashedPassword: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('unhashedPassword');
  };
}

export const Consumer = Context.Consumer;

// HOC that wraps a component with the global context, providing it access to global state and actions
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
