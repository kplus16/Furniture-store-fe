import './App.css';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes'

import { BrowserRouter as Router } from "react-router-dom";



function App() {
  
  return (
    <>
    <Router>
      <Navbar />
      <div className='container'>
          <AnimatedRoutes />
      </div>
    </Router>
    </>
  );
}

export default App;
