import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Courses - A class component for displaying a list of courses.
 *
 * Fetches course data from the backend on mount and handles rendering
 * of each course. In case of errors during fetching, handles them appropriately.
 */
export default class Courses extends Component {
  state = {
    courses: [], // State to store the list of courses
  };
  
  /**
   * componentDidMount - Lifecycle method to fetch courses after the component mounts.
   * 
   * Fetches all courses using the context data method. Updates the state with the courses
   * data on successful fetch. In case of any errors, logs them and could redirect to 
   * an error handling route.
   */
  componentDidMount() {
    const { context } = this.props;
    
    context.data.getCourses()
      .then(courses => {
        if (courses) {
          this.setState({ courses }); // Update state with fetched courses
        } else {
          console.log('No courses found'); // Handle the scenario when no courses are found
          // Optionally redirect to a 'notfound' page or display a message
        }
      })
      .catch(error => {
        console.error('Error fetching courses:', error); // Log any errors that occur during fetch
        // Redirect to an 'error' route or handle the error
      });
  }

  render() {
    const { courses } = this.state;

    // Render each course as a link
    const displayCourses = courses.map(course => 
      <div className='grid-33' key={course.id}>
        <Link className='course--module course--link' to={`/courses/${course.id}`}>
          <h4 className='course--label'>Course</h4>
          <h3 className='course--title'>{course.title}</h3>
        </Link>
      </div>
    );

    return (
      <React.Fragment>
        <hr />
        <div className='bounds'>
          {displayCourses}
          <div className='grid-33'>
            <Link className='course--module course--add--module' to='/courses/create'>
              <h3 className='course--add--title'>
                <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
                  viewBox='0 0 13 13' className='add'>
                  <polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
                </svg>New Course
              </h3>
            </Link>
          </div>
        </div>   
      </React.Fragment>
    );
  }
}
