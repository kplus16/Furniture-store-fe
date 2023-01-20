import './App.css';
import axios from 'axios';
import Navbar from './Navbar';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes} from "react-router-dom";

const api = axios.create({
  baseURL: 'http://localhost:3010/'
})

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pricing" element={<Pricing />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/users/login" element={<Login />}></Route>
            <Route path="/users/signup" element={<Signup />}></Route>
          </Routes>
      </div>
    </>
  );
}

export default App;
