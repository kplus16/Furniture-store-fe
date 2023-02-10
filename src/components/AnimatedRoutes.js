import React from "react";
import Pricing from '../pages/Pricing';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import {  Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from 'framer-motion'


export default function AnimatedRoutes() {
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/pricing" element={<Pricing />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/users/login" element={<Login />}></Route>
                <Route path="/users/signup" element={<Signup />}></Route>
            </Routes>
        </AnimatePresence>
    )
    
}
