import './App.css';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes'

import { BrowserRouter as Router } from "react-router-dom";
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';



function App() {
  const [user, setUser] = useState("");

  
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
        <CartProvider>
          <Navbar />
          <div className='container'>
              <AnimatedRoutes />
          </div>
        </CartProvider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
