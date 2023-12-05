import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './other/serviceWorker';
import './styles/global.css';

// Imports the Provider component from Context.js and the App component from App.js.
import { Provider } from './Context';
import App from './App';

// Renders the App component to the DOM.
ReactDOM.render(
	<Provider>
    	<App />
  	</Provider>,
  	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change unregister() to register() below.

serviceWorker.unregister();
