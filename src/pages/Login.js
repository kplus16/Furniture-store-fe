import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthProvider';

//import axios base url and create url to fetch from backend
import axios from '../api/axios';
const LOGIN_URL = '/user/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);

    //signup navigation
    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();

    //react state
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    //what to do on form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL, 
                {email : user, password : pwd}
            );
            //console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.userType;
            // const firstName = response?.data?.firstName;
            // const lastName = response?.data?.lastName;
            setAuth({ user, pwd, roles, accessToken })
            setUser('');
            setPwd('');
            setSuccess(true);
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            if(!error?.response){
                setErrMsg('No Server Response');
            }else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            }else{
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <> {success ?(
            <div className='center-success'>
                <h1>You are logged in!</h1>
                {/* <h4>Redirecting!</h4> */}
                {/* <button type="button" onClick={() => {
                    navigate("/")
                }}>Signup</button> */}
            </div>
        ) : (
            <div className='center'>
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreed"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} className='loginForm'>
                <div className='txt_field'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Email"
                        ref = {userRef}
                        autoComplete = "off"
                        onChange={(e) => setUser(e.target.value)}
                        value = {user}
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
            </div>
        )}
    
    </>
    )
}


export default Login