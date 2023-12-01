import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; //https://www.npmjs.com/package/react-markdown
import { AuthConsumer } from "./Context";

const CourseDetail = () => {
    
    const navigate = useNavigate();
    const location = useLocation(); //React hook to grab data about the location of the current page
    
    //Pulls the path name from the current url to get the current course id & uses it to set the url to be used with the api calls
    const [courseId, updateId] = useState(location.pathname);
    const url = `http://localhost:5000/api${courseId}`;

    //Stores the course info for the fetched course
    const [courseInfo, updateInfo] = useState([]);

    //Makes fetch req to get details for each course to be displayed 
    const getCourse = () => {
        fetch(url)
        .then((res) => {
            if(res.status === 404) {
                navigate('/notfound')
            } else if(res.status === 500) {
                navigate('/error');
            } else {
                return res.json();
            }
        })    
        .then((data) => {
            if(data) {
                updateInfo(data.course)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //updates the course id & url each time the pathname changes and makes the api call again to rerender the info for the new course
    useEffect(() => {
        updateId(location.pathname);
        getCourse();
        // eslint-disable-next-line
      }, [location.pathname]
    ) 

    //Stores the info for an authenticated user if one is signed in
    const authUser = {
        emailAddress: '',
        password: ''
    }

    //Sends req to api to delete current course - uses authUser info in Authorization header
    const deleteCourse = () => {
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
            }
        })
        .then(res => {
            if(res.status === 204) {
                navigate('/');
            } else if(res.status === 500) {
                navigate('/error');
            } else {
                return res.json();
            }
        })
        .then(data => {
            if(data) {
                console.log(data);
                console.log(data.errors);
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }

    return (
        <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                    <AuthConsumer>
                        { context => {
                            authUser.emailAddress = context.emailAddress;
                            authUser.password = context.password;

                            //displays the update & delete buttons only if the authUser is the owner of the current course
                            if(context.id && context.id === courseInfo.userId) {
                                return (
                                    <React.Fragment>
                                        <Link className="button" to={`/courses/${courseInfo.id}/update`}>Update Course</Link>
                                        <button className="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                deleteCourse()
                                            }}
                                        >Delete Course</button>
                                    </React.Fragment>
                                );
                            }
                        }}
                    </AuthConsumer>
                    
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseInfo.title}</h4>
                            <p>By {courseInfo.User?.firstName} {courseInfo.User?.lastName}</p> {/* ? used to check that User isn't Null before getting lastName - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
                            <ReactMarkdown 
                                children={courseInfo.description}
                            />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseInfo.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown 
                                className="course--detail--list"
                                children={courseInfo.materialsNeeded}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )

}

export default CourseDetail;
