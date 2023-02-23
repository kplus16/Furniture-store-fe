import React from "react";
import Products from '../pages/Products';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import Cart from '../pages/Cart';
import {  Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from 'framer-motion'


export default function AnimatedRoutes() {
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/products" element={<Products />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/users/logout" element={<Logout />}></Route>
                <Route path="/users/login" element={<Login />}></Route>
                <Route path="/users/signup" element={<Signup />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </AnimatePresence>
    )
    
}
