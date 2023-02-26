import React from "react";
import { Link } from "react-router-dom";



export default function DropdownProfile({onClose}){
    return (
        <div className='dropdown-menu' onMouseLeave={onClose}>
            <Link to="/">Profile</Link>
            <Link to="/previousorders">Previous Orders</Link>
        </div>
    )
}