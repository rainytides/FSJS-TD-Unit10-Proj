import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/notfound'); //This ensures that if the user signs in after navigating to an undefined route, they are redirected to the home page instead of that undefined route
        // eslint-disable-next-line
    }, [])
    
    return (
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
    );
}

export default NotFound;