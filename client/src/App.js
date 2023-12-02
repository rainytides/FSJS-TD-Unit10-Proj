/******************************************
Treehouse Techdegree:
FSJS project 10 - Full Stack App with React and a REST API
--aiming for exceeds expectations--
******************************************/

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

// Connect the components to context.
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Router>
		<div>
			<HeaderWithContext />
			<Switch>
				<Route exact path='/' component={CoursesWithContext}/>
				<PrivateRoute exact path='/courses/create' component={CreateCourseWithContext}/>
				<Route exact path='/courses/:id' component={CourseDetailWithContext}/>
				<PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext}/>

				<Route path='/signup' component={UserSignUpWithContext} />
				<Route path='/signin' component={UserSignInWithContext} />
				<Route path='/signout' component={UserSignOutWithContext} />

				<Route path='/forbidden' component={Forbidden} />
				<Route path='/error' component={UnhandledError} />
				<Route path='/notfound' component={NotFound} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);
