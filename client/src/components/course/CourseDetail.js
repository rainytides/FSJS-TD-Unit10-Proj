import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/**
 * CourseDetail - Class component to retrieve and render a course's details.
 * It also provides options to update and delete the course if the user is authenticated
 * and is the owner of the course.
 */
export default class CourseDetail extends Component {
  state = {
    course: '',
    user: ''
  };

  /**
   * Fetches course details on component mount and updates the state.
   */
  componentDidMount() {
    const { context } = this.props;
    const courseId = this.props.match.params.id;

    context.data.getCourse(courseId)
      .then(course => {
        if (course.message) {
          console.log(course.message);
          this.props.history.push('/notfound');
        } else {
          this.setState({
            course,
            user: course.user
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  }

  /**
   * Deletes the course and redirects to the main page upon successful deletion.
   */
  deleteCourse = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const courseId = this.props.match.params.id;

    context.data.deleteCourse(courseId, authUser.emailAddress, context.unhashedPassword)
      .then(errors => {
        if (errors.length) {
          this.props.history.push('/forbidden');
        } else {
          console.log('Course successfully deleted!');
          this.props.history.push('/');
        }
      })
      .catch(() => this.props.history.push('/error'));	
  };

  render() {
    const { course, user } = this.state;
    const authUser = this.props.context.authenticatedUser;

    return (
      <React.Fragment>
        <hr />
        {authUser && authUser.id === user.id ? (
          <div className='actions--bar'>
            <div className='bounds'>
              <div className='grid-100'>
                <span>
                  <Link className='button' to={`/courses/${course.id}/update`}>Update Course</Link>
                  <button className='button' onClick={this.deleteCourse}>Delete Course</button>
                  <Link className='button button-secondary' to={'/'}>Return to List</Link>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className='actions--bar'>
            <div className='bounds'>
              <div className='grid-100'>
                <span>
                  <Link className='button button-secondary' to={'/'}>Return to List</Link>
                </span>
              </div>
            </div>
          </div>
        )}
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <h3 className='course--title'>{course.title}</h3>
              <p>By {user.firstName} {user.lastName}</p>
            </div>
            <div className='course--description'>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
          <div className='grid-25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='course--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime || 'No estimated time'}</h3>
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <ReactMarkdown>{course.materialsNeeded || 'No materials needed'}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
