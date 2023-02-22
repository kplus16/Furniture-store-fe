import { UserContext } from '../context/UserContext';
import { Navigate } from "react-router-dom";
import { useContext } from "react";


export default function Logout(){
    const { setUser } = useContext(UserContext);

    localStorage.clear();
    setUser('');
    // setUser('');
    
    return(
        <Navigate to="/users/login"></Navigate>
    )
}