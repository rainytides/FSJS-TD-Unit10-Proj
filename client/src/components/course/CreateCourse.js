import React, { Component } from 'react';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * CreateCourse - A class component for creating a new course.
 * It handles form inputs for course creation, validates required fields,
 * and displays 'Materials Needed' input as a bulleted list for preview.
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

  // Sets the user ID on component mount if the user is authenticated
  componentDidMount() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    this.setState({ userId: authUser.id });
  }

  // Updates state with user input
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Validates input and submits form
  submit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    let errors = [];
    if (!title) errors.push('Title is required.');
    if (!description) errors.push('Description is required.');

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.createCourse();
  };

  // Creates a new course with the input data
  createCourse = () => {
    const { context, history } = this.props;
    const authUser = context.authenticatedUser;
    const { title, description, estimatedTime, materialsNeeded, userId } = this.state;
    const course = { title, description, estimatedTime, materialsNeeded, userId };

    context.data.createCourse(course, authUser.emailAddress, context.unhashedPassword)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${title} is successfully added!`);
          history.push('/');
        }
      })
      .catch(error => {
        console.log(error);
        history.push('/error');
      });
  };

  // Redirects to the home page
  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };

  // Renders 'Materials Needed' as a bulleted list for preview
  renderMaterialsList = (materials) => {
    return (
      <ul>
        {materials.split('\n').map((item, index) => 
          item.trim() && <li key={index}>{item}</li>
        )}
      </ul>
    );
  };

  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={this.submit}>
          {/* Course title and description inputs */}
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <input 
                id='title' 
                name='title' 
                type='text' 
                className='input-title course--title--input' 
                value={title}
                onChange={this.change} />
              <p>By {authUser.firstName} {authUser.lastName}</p>
            </div>
            <div className='course--description'>
              <textarea 
                id='description' 
                name='description' 
                value={description}
                onChange={this.change} />
            </div>
          </div>
          {/* Course estimated time and materials needed inputs */}
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <input 
                    id='estimatedTime' 
                    name='estimatedTime' 
                    type='text' 
                    className='course--time--input'
                    value={estimatedTime}
                    onChange={this.change} />
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <textarea 
                    id='materialsNeeded' 
                    name='materialsNeeded' 
                    value={materialsNeeded}
                    onChange={this.change} />
                  {/* Preview of materials as a bulleted list */}
                  <div className='course--materials'>
                    {this.renderMaterialsList(materialsNeeded)}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Form submission buttons */}
          <div className='grid-100 pad-bottom'>
            <button className='button' type='submit'>Create Course</button>
            <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
