import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
export default function Navbar() {
    
    return (<nav className="nav">
        <Link to="/" className="site-title">Furnifun</Link>
        <ul className='grid-item'>
            <CustomLink to="/pricing">Products</CustomLink>
            <CustomLink to="/about">About</CustomLink>
        </ul>
        <ul className='grid-item'>
            <CustomLink to="/search">Search</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/cart">Cart</CustomLink>
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