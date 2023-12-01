import React from 'react';

// Displays a message letting the user know that they can't access the requested page
// (because they are not authorized to do so).
export default () => (
	<div className="bounds">
		<h1>Forbidden</h1>
		<p>Uh oh! You can't access this page.</p>
	</div>
);
