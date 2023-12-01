import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserSignOut = ({signOut}) => {
    const navigate = useNavigate(); //Allow for the url and route to reflect the searched for defaultValue(Navigates to the given url)
    useEffect(() => {
        signOut([]) //Sends empty-bodied call to global signOut method to clear the global authUser state 
        navigate("/")
        // eslint-disable-next-line
    }, [])
}

export default UserSignOut;