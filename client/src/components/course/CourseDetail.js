import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/**
 * CourseDetailWrapper - A functional component to utilize React Router hooks.
 * It extracts the course ID from the URL parameters and passes it to the CourseDetail component.
 */
function CourseDetailWrapper(props) {
  const { id } = useParams(); // Extract the course ID from the URL parameters
  return <CourseDetail courseId={id} {...props} />; // Pass the courseId as a prop to CourseDetail
}

/**
 * CourseDetail - Class component to retrieve and display a course's details.
 * Handles fetching the course data and rendering details including options
 * for updating and deleting the course, if the user is authenticated and the owner.
 */
class CourseDetail extends Component {
  state = {
    course: '',
    user: ''
  };

  // Fetches course details on component mount
  componentDidMount() {
    const { context, courseId } = this.props;

    context.data.getCourse(courseId)
      .then(course => {
        if (course.message) {
          console.log(course.message);
          this.props.history.push('/notfound');
        } else {
          this.setState({ course, user: course.user });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.history.push('/error');
      });
  }

  // Deletes the course and handles redirection
  deleteCourse = () => {
    const { context, courseId } = this.props;
    const authUser = context.authenticatedUser;

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

export default CourseDetailWrapper; // Export the wrapper function instead of the class component
