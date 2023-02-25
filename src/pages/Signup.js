import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from 'react';

import axios from '../api/axios';
const SIGNUP_URL = '/user/register';

export default function Signup(){
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

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
        if(userPwd1 !== userPwd2){
            setErrMsg("password do not match")
            setUserEmail('');
            setUserPwd1('');
            setUserPwd2('');
        }else{
            try {
            const response = await axios.post(SIGNUP_URL, 
                {email : userEmail, password : userPwd1}
            );
            //const response = {email : userEmail, password : userPwd1}
            //console.log(JSON.stringify(response?.data));
            console.log(response);
            //setUser(userEmail);
            setUserEmail('');
            setUserPwd1('');
            setUserPwd2('');
            setSuccess(true);
            setTimeout(() => {
                navigate("/users/login")
            }, 2000)
        } catch (error) {
            if(!error?.response){
                setErrMsg('No Server Response');
            }else if (error.response?.status === 400) {
                setErrMsg('User not found on database');
            }else if (error.response?.status === 401) {
                setErrMsg('Incorrect Password');
            }else{
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        }
        
        
        console.log()
    }

    return (
        <> {success ? (
            <motion.div 
                className='center-success'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <h1>Successfully Registered!</h1>
            </motion.div>
        ) : (
        <motion.div 
            className="center signup"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h1>Signup Here!</h1>
            <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreed"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email"
                    ref={userEmailRef}
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    required>
                
                </input>
                <label htmlFor="password1">Password: </label>
                <input 
                    type="password" 
                    id="password1" 
                    placeholder="Password"
                    onChange={(e) => setUserPwd1(e.target.value)}
                    value={userPwd1}
                    required
                    >
                    
                </input>
                <label htmlFor="password2">Confirm Password: </label>
                <input 
                    type="password" 
                    id="password2" 
                    placeholder="Password"
                    onChange={(e) => setUserPwd2(e.target.value)}
                    value={userPwd2}
                    required>
                </input>
                <button type="submit" className='btn-sign-in'>
                        Sign Up
                </button>
                <div className='signup-link'>
                        Already have an account? <Link to="/users/login">Login</Link>
                </div>
            </form>
        </motion.div>
    )}
    </>
    )
}