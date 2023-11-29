import React from 'react';

/**
 * NotFoundPage - Stateless functional component that renders a message for pages that are not found.
 * 
 * Displays a light-hearted, humorous message to indicate that the requested page could not be found,
 * easing the frustration of encountering a 404 error.
 *
 * @returns JSX element representing a 404 not found message.
 */
export default function NotFoundPage() {
  return (
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Oops! This page must have taken a wrong turn returning from its coffee break!</p>
    </div>
  );
}
