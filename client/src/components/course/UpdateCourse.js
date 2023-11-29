import React, { Component } from 'react';
import ErrorsDisplay from '../ErrorsDisplay';

/**
 * UpdateCourse - Class component for updating a specific course.
 * 
 * Fetches the course details on mount and pre-fills the form for editing.
 * Ensures that only the owner of the course can make edits. Redirects to
 * 'forbidden' if the user is not the owner. Handles form submission for updates
 * and displays any validation errors.
 */
export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;
    const courseId = this.props.match.params.id;
    const authUser = context.authenticatedUser;

    context.data.getCourse(courseId)
      .then(course => {
        if (course.message) {
          console.log(course.message);
          this.props.history.push('/notfound');
        } else if (authUser.id !== course.user.id) {
          this.props.history.push('/forbidden');
        } else {
          this.setState({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  }

  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const courseId = this.props.match.params.id;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = { title, description, estimatedTime, materialsNeeded };

    context.data.updateCourse(courseId, course, authUser.emailAddress, context.unhashedPassword)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${title} has been successfully updated!`);
          this.props.history.push(`/courses/${courseId}`);
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  };

  cancel = (event) => {
    event.preventDefault();
    const courseId = this.props.match.params.id;
    this.props.history.push(`/courses/${courseId}`);
  };

  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <React.Fragment>
        <hr />
        <div className='bounds course--detail'>
          <h1>Update Course</h1>
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
              <button className='button' type='submit'>Update Course</button>
              <button className='button button-secondary' onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
