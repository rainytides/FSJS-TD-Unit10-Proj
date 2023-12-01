import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthConsumer } from "./Context";

const UpdateCourse = () => {

    const navigate = useNavigate(); //Allow for the url and route to reflect the searched for defaultValue(Navigates to the given url)
    const location = useLocation(); //React hook to grab data about the location of the current page
    
     //Pulls the path name from the current url to get the current course id & uses it to set the url to be used with the api calls
    const [courseId, updateId] = useState(location.pathname.split('/')[2]);
    const url = `http://localhost:5000/api/courses/${courseId}`;

    //Stores info for authenticated user - user must be authenticated & the owner of the course to update it's content 
    const authUser = {
        emailAddress: '',
        password: '',
        id: ''
    }

    /*
    ** Load current course data from db so that it can be displayed 
    */
    //Stores the course info for the fetched course - used to set default values for display
    const [courseInfo, updateInfo] = useState([]);

    //Makes fetch req to get details for the current course to be displayed
    const getCourse = () => {
        fetch(url)
        .then((res) => {
            if(res.status === 404) {
                navigate('notfound');
            } else if(res.status === 500) {
                navigate('/error');
            } else {
                return res.json();
            }
        })    
        .then((data) => {
            if(data) {
                if(data.course.userId !== authUser.id) {
                    navigate('/forbidden');
                } else {
                    //sets data for displaying the info of the current course in the default fields
                    updateInfo(data.course);
                    //prepopulates the form to be sent with the updateCourse PUT req with the current info of the course so that users only need to adjust the fields the want to change
                    updateFormInfo({
                        id: data.course.id,
                        title: data.course.title,
                        description: data.course.description,
                        userId: data.course.userId,
                        estimatedTime: data.course.estimatedTime,
                        materialsNeeded: data.course.materialsNeeded
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        updateId(location.pathname.split('/')[2]);
        getCourse();
        // eslint-disable-next-line
      }, [location.pathname]
    ) 

    /*
     * Update course info & make PUT request to db
    */
    //Stores the data users add/adjust in the form - sent as the body of the updateCourse PUT req
    const [formBody, updateFormInfo] = useState({})

    //Stores the values for any validation errors received when making the updateCourse PUT req
    const [valErrors, updateErrors] = useState([])
    
    //Sends a PUT req with formBody as the body & authUser as the Authorization - updates course on success - sends validation errors if any required info is missing from formBody
    const updateCourse = () => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
              },
            body: JSON.stringify(formBody)
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
                updateErrors(data.errors);
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }

    return (
        <AuthConsumer>
            { context => {
                authUser.emailAddress = context.emailAddress;
                authUser.password = context.password;
                authUser.id = context.id;

                return(
                    <div  className="wrap">
                        <h2>Update Course</h2>

                        <>
                            {valErrors.length > 0 &&
                                <div className="validation--errors">
                                    <h3>Validation Errors</h3>
                                    <ul>
                                        {valErrors.map((error, i) => {
                                            return(
                                            <li key={i}>{error}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        </>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                updateCourse()
                            }}
                        >
                            <div className="main--flex">
                                <div>
                                    {/* https://www.w3schools.com/Jsref/event_oninput.asp - onInput used instead of onChange because onChange wont recognize selecting & deleting all info from a field*/}
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" defaultValue={courseInfo.title}
                                        onInput = {(e) => updateFormInfo(prevState => ({...prevState, title: e.target.value}))}
                                    />

                                    <p>By {courseInfo.User?.firstName} {courseInfo.User?.lastName}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" defaultValue={courseInfo.description}
                                        onInput = {(e) => updateFormInfo(prevState => ({...prevState, description: e.target.value}))}
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={courseInfo.estimatedTime}
                                        onInput = {(e) => updateFormInfo(prevState => ({...prevState, estimatedTime: e.target.value}))}
                                    />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={courseInfo.materialsNeeded}
                                         onInput = {(e) => updateFormInfo(prevState => ({...prevState, materialsNeeded: e.target.value}))}
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="button">Update Course</button>
                            <button 
                                className="button button-secondary" 
                                onClick={(e) => {
                                    e.preventDefault() 
                                    navigate('/')
                                }}
                            >Cancel
                            </button>
                        </form>

                    </div>
                );
            }}
        </AuthConsumer>
    )

}

export default UpdateCourse;