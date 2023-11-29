import React, { Component } from 'react';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * CreateCourse - Class component for creating a new course.
 * 
 * It allows authenticated users to enter details for a new course and submit them.
 * The component includes input fields for the course title, description, estimated time,
 * and materials needed. Validation errors are displayed if they occur during submission.
 */
export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    errors: []
  };

  /**
   * On component mount, fetches the authenticated user's ID and sets it in the state.
   */
  componentDidMount() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    this.setState({ userId: authUser.id });
  };

  /**
   * Handles changes in any of the form input fields and updates the state accordingly.
   *
   * @param {Object} event - The form input change event.
   */
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * Submits the new course data to the database and handles response.
   * Redirects to the home page on successful course creation or displays validation errors.
   *
   * @param {Object} event - The form submission event.
   */
  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, userId } = this.state;
    const course = { title, description, estimatedTime, materialsNeeded, userId };

    context.data.createCourse(course, context.authenticatedUser.emailAddress, context.unhashedPassword)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${title} is successfully added!`);
          this.props.history.push('/');    
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  /**
   * Cancels the course creation and redirects the user to the home page.
   *
   * @param {Object} event - The button click event.
   */
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
    const authUser = this.props.context.authenticatedUser;

    return (
      <React.Fragment>
        <hr />
        <div className='bounds course--detail'>
          <h1>Create Course</h1>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.submit}>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <div>
                  <input 
                    id='title' 
                    name='title' 
                    type='text' 
                    className='input-title course--title--input' 
                    placeholder='Course title...'
                    value={title}
                    onChange={this.change} />
                </div>
                <p>By {authUser.firstName} {authUser.lastName}</p>
              </div>
              <div className='course--description'>
                <div>
                  <textarea 
                    id='description' 
                    name='description' 
                    className='' 
                    placeholder='Course description...'
                    value={description}
                    onChange={this.change} />
                </div>
              </div>
            </div>
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='course--stats--list'>
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <div>
                      <input 
                        id='estimatedTime' 
                        name='estimatedTime' 
                        type='text' 
                        className='course--time--input'
                        placeholder='Hours' 
                        value={estimatedTime}
                        onChange={this.change} />
                    </div>
                  </li>
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea 
                        id='materialsNeeded' 
                        name='materialsNeeded' 
                        className='' 
                        placeholder='List materials...'
                        value={materialsNeeded}
                        onChange={this.change} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Create Course</button>
              <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
