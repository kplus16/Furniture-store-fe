import { Link, useNavigate } from 'react-router-dom'



export default function Signup(){
    const navigate = useNavigate();
    return (
        <div className="center">
            <h1>Signup Here!</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Email">
                
                </input>
                <label htmlFor="email">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password">
                </input>
                <button className='btn-sign-in'>
                        Sign Up
                    </button>
                <div className='signup-link'>
                        Already have an account? <Link to="/users/login">Login</Link>
                </div>
            </form>
        </div>
    )
}