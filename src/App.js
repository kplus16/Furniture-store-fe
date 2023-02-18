import './App.css';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes'

import { BrowserRouter as Router } from "react-router-dom";
import { useState } from 'react';
import { UserContext } from './context/UserContext';



function App() {
  const [user, setUser] = useState("");

  
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <div className='container'>
              <AnimatedRoutes />
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
