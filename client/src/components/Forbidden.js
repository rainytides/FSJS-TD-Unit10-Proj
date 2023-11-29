import React from 'react';

/**
 * ForbiddenPage - Functional component for displaying a forbidden access message.
 *
 * Renders a message indicating that the user does not have the necessary permissions
 * to access the requested page. The message is designed to be informative yet
 * friendly to prevent user frustration.
 *
 * @returns JSX element representing a forbidden access message.
 */
export default function ForbiddenPage() {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oops! It seems you've ventured into uncharted territory.</p>
    </div>
  );
}
