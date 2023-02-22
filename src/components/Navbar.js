import React, { useContext } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {

    const {user} = useContext(UserContext)
    
    
    return (<nav className="nav">
        <Link to="/" className="site-title">Furnication</Link>
        <ul className='grid-item'>
            <CustomLink to="/search">Search</CustomLink>
            <CustomLink to="/products">Products</CustomLink>
            <CustomLink to="/about" >About</CustomLink>
        </ul>
        <ul className='grid-item'>
        {(!!user) ? 
            <>
            {/* <CustomLink to="/user" className='user-link'>
                <FontAwesomeIcon icon={faUser} />
            </CustomLink> */}
                {/* <div className='dropdown-menu'> */}
                    <CustomLink to="/users/logout">Logout</CustomLink> 
                    <CustomLink to="/users/user">User</CustomLink> 
                {/* </div> */}
            </>
        :
            <>
                <CustomLink to="/users/login">Login</CustomLink>
                <CustomLink to="/users/signup">Signup</CustomLink>
            </>
        }
            <CustomLink to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
            </CustomLink>
        </ul>
    </nav>)
}

function CustomLink({ to, children, ...props }){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to= {to} {...props}>
                {children}
            </Link>
        </li>
    )
}