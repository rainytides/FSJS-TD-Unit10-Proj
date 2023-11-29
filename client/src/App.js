import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import UserSignOut from './components/user/UserSignOut';
import Courses from './components/course/Courses';
import CourseDetail from './components/course/CourseDetail';
import CreateCourse from './components/course/CreateCourse';
import UpdateCourse from './components/course/UpdateCourse';
import PrivateRoute from './PrivateRoute';
import withContext from './Context';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

// Higher-order components wrapping the original ones with additional context.
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

/**
 * App component - Main application component setting up the router and routes.
 *
 * This component uses React Router v6 to define navigation and routing
 * for the application. It includes routes for various pages like sign up, sign in,
 * course creation, editing, and error handling.
 */
export default function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Routes>
          <Route exact path='/' element={<CoursesWithContext />} />
          <Route path='/courses/create' element={<PrivateRoute><CreateCourseWithContext /></PrivateRoute>} />
          <Route path='/courses/:id' element={<CourseDetailWithContext />} />
          <Route path='/courses/:id/update' element={<PrivateRoute><UpdateCourseWithContext /></PrivateRoute>} />

          <Route path='/signup' element={<UserSignUpWithContext />} />
          <Route path='/signin' element={<UserSignInWithContext />} />
          <Route path='/signout' element={<UserSignOutWithContext />} />

          <Route path='/forbidden' element={<Forbidden />} />
          <Route path='/error' element={<UnhandledError />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
