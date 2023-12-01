import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';

//receives the singIn method and the userInfo & valErrorMsg from App.js
const UserSignIn = ({signIn, userInfo, valErrorMsg}) => {

    const navigate = useNavigate();
    const location = useLocation();

    //Stores info user enters into the sign in form
    const [formBody, updateFormInfo] = useState({
        emailAddress: '',
        password: ''
    })

    //When a link to the signin page is used, that link sends its url pathname as a state called prevLocation. This is used to direct the user back to that page (if appropriate) after signing in
    const prevLocation = location.state?.prevLocation;

    //Navigate to the previous page in history w/ state sent from the page that directed to the signIn page - https://reactrouter.com/en/v6.3.0/upgrading/v5#use-usenavigate-instead-of-usehistory
    useEffect(() => {
        //The user won't be sent to their previous location if the came from one of the following pathnames 
        const failPaths = ['/error', '/forbidden', '/notfound', '/signout', '/signin', '/signup'];
        if(userInfo.id) {
            if(!location.state || failPaths.includes(prevLocation)) {
                navigate('/');
            } else {
                navigate(prevLocation);
            }
        }
        // eslint-disable-next-line
    }, [userInfo])

    return (
        <div  className="form--centered">
            <h2>Sign In</h2>

            <>
                {valErrorMsg.length > 0 &&
                    <div className="validation--errors">
                        <h3>Validation Error</h3>
                        <p> Please enter a valid email address and password </p>
                    </div>
                }
            </>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn(formBody.emailAddress, formBody.password)
                }}
            >
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" defaultValue=""
                    onChange = {(e) => updateFormInfo(prevState => ({...prevState, emailAddress: e.target.value}))}
                />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" defaultValue=""
                    onChange = {(e) => updateFormInfo(prevState => ({...prevState, password: e.target.value}))}
                />
                
                <button type="submit" className="button">Sign In</button>
                <button 
                    className="button button-secondary" 
                    onClick={(e) => {
                        e.preventDefault() 
                        navigate('/')
                    }}
                >Cancel
                </button>
            </form>

            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
    )

}

export default UserSignIn;