import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './home.jsx';
import Registerconf from './registerconf.jsx';
import Viewsch from './viewsch.jsx';
import './index.css';
import Feedback from './feedback.jsx';
import Adminsignup from './adminsignup.jsx';
import Adminlogin from './adminlogin.jsx';
import Adminhome from './adminhome.jsx';
import Adminviewsch from './adminconf.jsx';
// Import other necessary components

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registerconf />} />
          <Route path="/viewsch" element={<Viewsch />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/adminsignup" element={<Adminsignup />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/adminviewsch" element={<Adminviewsch />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;