import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useContext} from 'react';
import { motion } from "framer-motion"
import { CartContext } from '../context/CartContext';

//import context
import { UserContext } from '../context/UserContext';

//import axios base url and create url to fetch from backend
import axios from '../api/axios';
const LOGIN_URL = '/user/login';

const Login = () => {

    const { setUser } = useContext(UserContext);

    //signup navigation
    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();

    const cart = useContext(CartContext)

    //react state
    const [userEmail, setUserEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [userEmail, pwd])

    //what to do on form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                {email : userEmail, password : pwd}
            );
            //console.log(JSON.stringify(response?.data));
            // console.log(response?.data);
            const accessToken = response?.data?.accessToken;
            setUser({
                email : response?.data?.email,
                isAdmin : response?.data?.userType
            });
            if(response?.data?.userType){
                cart.emptyCart();
            }
            localStorage.setItem('accessToken', accessToken)
            //setUser(userEmail);
            setUserEmail('');
            setPwd('');
            setSuccess(true);
            setTimeout(() => {
                navigate("/")
            }, 1000)
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

    return (
        <> {success ? (
            <motion.div 
                className='center-success'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <h1>You are logged in!</h1>
            </motion.div>
        ) : (
            <motion.div 
                className='center login'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <h1>Sign In</h1>
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreed"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit} className='loginForm'>
                <div className='txt_field'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email"
                        ref = {userRef}
                        autoComplete = "off"
                        onChange={(e) => setUserEmail(e.target.value)}
                        value = {userEmail}
                        required
                    >
                    </input> 
                </div>
                    <div className='txt_field'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            autoComplete = "off"
                            onChange={(e) => setPwd(e.target.value)}
                            value = {pwd}
                            required
                        >
                        </input> 
                    </div>
                    <button className='btn-sign-in'>
                        Sign In
                    </button>
                    <div className='signup-link'>
                        Not a member? <Link to="/users/signup">Signup</Link>
                    </div>
                </form>
            </motion.div>
        )}
    
    </>
    )
}


export default Login