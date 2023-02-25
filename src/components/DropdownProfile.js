import React from "react";
import { Link } from "react-router-dom";



export default function DropdownProfile(){
    return (
        <div className='dropdown-menu'>
            <Link to="/">Profile</Link>
            <Link to="/">Previous Orders</Link>
        </div>
    )
}