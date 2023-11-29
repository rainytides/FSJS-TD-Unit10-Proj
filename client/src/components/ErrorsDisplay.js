import React from 'react';

/**
 * Functional component to display a list of validation errors.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.errors - Array of error messages to display
 * @returns JSX element to render the error messages, if any.
 */
export default function ValidationErrorDisplay(props) {
  const { errors } = props;
  return (
    <div>
      <ErrorsDisplay errors={errors} />
    </div>
  );
}

/**
 * Helper component to render the actual error messages.
 * 
 * It checks if there are any errors and renders them in a list format.
 * If there are no errors, it returns null and nothing is rendered.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.errors - Array of error messages to display
 * @returns JSX element or null
 */
function ErrorsDisplay({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="validation--errors--label">Validation Errors</h2>
      <div className="validation-errors">
        <ul>
          {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
      </div>
    </div>
  );
}
