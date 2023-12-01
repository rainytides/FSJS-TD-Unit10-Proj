import React, { useState, useEffect } from "react";
import { 
  BrowserRouter,
  Routes,
  Route,
  redirect
} from "react-router-dom";

import { AuthProvider } from "./components/Context";
import PrivateRoute from "./PrivateRoute";

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";

function App() {
  const [userInfo, updateUserInfo] = useState({}); //Store user info from UserSignUp

  //Global signIn() method constants
  const userUrl = 'http://localhost:5000/api/users';
  const [valErrorMsg, updateMsg] = useState([]);

  //Global signOut() method
  const signOut = (userInfo) => {
    // Remove user info from global state - receives a call with an empty body from the signOut component
    updateUserInfo(userInfo);
    //remove user info from local storage
    localStorage.setItem('emailAddress', '');
    localStorage.setItem('password', '');
    localStorage.setItem('firstName', '');
    localStorage.setItem('lastName', '');
    localStorage.setItem('id', '');
  }

  //Stay signed in with LocalStorage if available - checks if there is any info in local storage, and if so, uses it to set the user info
  useEffect(() => {
    if(localStorage.emailAddress) {
      updateUserInfo({
        emailAddress: localStorage.emailAddress,
        password: localStorage.password,
        firstName: localStorage.firstName,
        lastName: localStorage.lastName,
        id: +localStorage.id
      })
    };
  }, [])

  //Global signIn() method - takes email & password args to be used in the authorization header of the signIn GET req
  const signIn = (emailAddress, password) => {
    fetch(userUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8", 
            "Authorization": 'Basic ' + btoa(`${emailAddress}:${password}`)
        }
    })
    .then(res => {
        if(res.status === 500) {
            return redirect('/error');
        } else {
            return res.json();
        }
    })
    .then(data => {
        if(data.message) {
            updateMsg(data.message);
        } else {
            //Set data for current user in global state
            updateUserInfo(data.user);
            updateUserInfo(prevState => ({...prevState, password: password}));
            //Use local storage values so that the authenticated state is maintained after refreshes or opening in a new tab
            localStorage.setItem('emailAddress', data.user.emailAddress);
            localStorage.setItem('password', password);
            localStorage.setItem('firstName', data.user.firstName);
            localStorage.setItem('lastName', data.user.lastName);
            localStorage.setItem('id', data.user.id);
        };
    })
    .catch((error) => {
        console.log('Error:', error);
    });
  }

  return (
    <div id="root">
    <AuthProvider value={userInfo}>
      <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route
                path="/"
                element={<Courses />}
              />

              <Route 
                path="courses/:id"
                element={<CourseDetail />}
              />
              
              {/* https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5 */}
              {/* This link shows how to migrate from PrivateRoutes in React Router V.4 to PrivateRoutes in V.6 */}
              <Route
                path="courses/create"
                element={
                  <PrivateRoute>
                    <CreateCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="courses/:id/update"
                element={
                  <PrivateRoute>
                    <UpdateCourse />
                  </PrivateRoute>
                }
              />

              <Route
                path="/signup"
                element={<UserSignUp 
                  signIn = {signIn}
                />}
              />

              <Route
                path="/signin"
                element={<UserSignIn 
                  signIn = {signIn}
                  userInfo = {userInfo}
                  valErrorMsg = {valErrorMsg}
                />}
              />

              <Route
                path="/signout"
                element={<UserSignOut 
                  signOut = {signOut}
                />}
              />

              <Route
                path="/notfound"
                element={<NotFound />}
              />

              <Route
                path="/forbidden"
                element={<Forbidden />}
              />

              <Route
                path="/error"
                element={<UnhandledError />}
              />

              <Route 
                path="*" 
                element={<NotFound />}
              />

            </Routes>
          </main>
      </BrowserRouter>
    </AuthProvider>
    </div>
    
  );
}

export default App;
