import React, { useContext, useState } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../context/CartContext';

import DropdownProfile from './DropdownProfile';


export default function Navbar() {

    const cart = useContext(CartContext)

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    const {user} = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)
    
    
    return (<nav className="nav">
        <Link to="/" className="site-title">Furnication</Link>
        <ul className='grid-item'>
            <CustomLink to="/products">Products</CustomLink>
        </ul>
        <ul className='grid-item'>
        {(!!user) ? 
            <>
                    <CustomLink to="/users/logout">Logout</CustomLink> 
                    <a className="user-link" onClick={() => setIsOpen((prev) => !prev)}>
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                    </a> 
            </>
        :
            <>
                <CustomLink to="/users/login">Login</CustomLink>
                <CustomLink to="/users/signup">Signup</CustomLink>
            </>
        }
        {(isOpen) ? 
            <>
                <DropdownProfile />
            </>
            :
            <>

            </>
        }
            <CustomLink to="/cart">
                <FontAwesomeIcon icon={faCartShopping} size="lg"/>
                {productsCount > 0 ? 
                    <div className='cart-number'>{productsCount}</div>
                    :
                    <></>
                }
                
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