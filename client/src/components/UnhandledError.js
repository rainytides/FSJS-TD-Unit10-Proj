import React from 'react';

/**
 * UnexpectedError - A stateless functional component to display a message when an unexpected error occurs.
 *
 * This component renders a playful, light-hearted error message, adding a touch of humor to 
 * the otherwise frustrating experience of encountering an error.
 *
 * @returns JSX element representing an error message with a humorous twist.
 */
export default function UnexpectedError() {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Whoops! The server must have tripped over a network cable.</p>
    </div>
  );
}
