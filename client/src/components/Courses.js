import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
    
    const navigate = useNavigate();
    const url = 'http://localhost:5000/api/courses';
    const [coursesInfo, updateInfo] = useState([]); //Stores data for all courses fetched from the db 

    //Makes a fetch req to pull in all a data for each course stored in the db & stores the retrieved info in the above State
    const getCourses = () => {
        fetch(url)
        .then((res) => {
            if(res.status === 500) {
                navigate('/error');
            } else {
                return res.json();
            }
        })    
        .then((res) => {
            updateInfo(res.courses);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getCourses()
        // eslint-disable-next-line
      }, []) 

    return (
        <div className="wrap main--grid">
            
            {/* Maps through the array of course data retrieved from the db and displays them */}
            {coursesInfo.map((course) => {
                return(
                    <Link className="course--module course--link" to={`courses/${course.id}`} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                )
            })}
            <Link className="course--module course--add--module" to="courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
        </div>
    )

}

export default Courses;