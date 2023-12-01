import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from "./Context";

const CreateCourse = () => {

    const url = 'http://localhost:5000/api/courses';
    const navigate = useNavigate();
    
    //Stores the info entered into the create course form by the user
    const [formBody, updateFormInfo] = useState({
        title: '',
        description: '',
        userId: '',
        estimatedTime: '',
        materialsNeeded: ''
    })

    //Stores the info of the authenticated user - users must be authenticated to create a course
    const authUser = {
        emailAddress: '',
        password: ''
    }

    //Stores the values of any validation errors returned from the createCourse POST request
    const [valErrors, updateErrors] = useState([])

    //Uses the authUser & formBody info to make a POST req to the db - adds a new course if successful & provides validation errors if there are any
    const createCourse = () => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + btoa(`${authUser.emailAddress}:${authUser.password}`)
              },
            body: JSON.stringify(formBody)
        })
        .then(res => {
            if(res.status === 201) {
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
                //Gets info from Context API to use in the createCourse POST request
                formBody.userId = context.id;
                authUser.emailAddress = context.emailAddress;
                authUser.password = context.password;

                return(
                    <div  className="wrap">
                        <h2>Create Course</h2>
                        
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
                                createCourse()
                            }}
                        >
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" defaultValue=""
                                        onChange = {(e) => updateFormInfo(prevState => ({...prevState, title: e.target.value}))}
                                    />

                                    <p>By {`${context.firstName} ${context.lastName}`}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" 
                                        onChange = {(e) => updateFormInfo(prevState => ({...prevState, description: e.target.value}))}
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue=""
                                        onChange = {(e) => updateFormInfo(prevState => ({...prevState, estimatedTime: e.target.value}))}
                                    />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded"
                                        onChange = {(e) => updateFormInfo(prevState => ({...prevState, materialsNeeded: e.target.value}))}
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="button">Create Course</button>
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

export default CreateCourse;