import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from 'react';

import axios from '../api/axios';
const LOGIN_URL = '/user/login';

export default function Signup(){
    const navigate = useNavigate();

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    const userEmailRef = useRef();
    const [ userEmail, setUserEmail ] = useState('');
    const [ userPwd1, setUserPwd1 ] = useState('');
    const [ userPwd2, setUserPwd2 ] = useState('');

    useEffect(() => {
        userEmailRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log()
    }

    return (
        <motion.div 
            className="center signup"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h1>Signup Here!</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Email"
                    ref={userEmailRef}
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}>
                
                </input>
                <label htmlFor="email">Password: </label>
                <input 
                    type="password" 
                    id="password1" 
                    placeholder="Password"
                    onChange={(e) => setUserPwd1(e.target.value)}
                    value={userPwd1}
                    >
                    
                </input>
                <label htmlFor="email">Confirm Password: </label>
                <input 
                    type="password" 
                    id="password2" 
                    placeholder="Password"
                    onChange={(e) => setUserPwd2(e.target.value)}
                    value={userPwd2}>
                </input>
                <button type="submit" className='btn-sign-in'>
                        Sign Up
                </button>
                <div className='signup-link'>
                        Already have an account? <Link to="/users/login">Login</Link>
                </div>
            </form>
        </motion.div>
    )
}