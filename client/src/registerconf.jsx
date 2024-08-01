import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const Registerconf = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [timing, setTiming] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      const response = await axios.post('/register', {
        Name: name,
        Phone: phone,
        Email: email,
        Timing: timing,
        Purpose:purpose
      });
      setMessage(response.data.message);
      if (response.data.status === 'success') {
        navigate('/viewsch');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'register failed');
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="container mt-5">
        <Navbar/>
      <h2 className="mb-4">Registration for conference</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Phone:</label>
          <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Timing:</label>
          <input type="text" className="form-control" value={timing} onChange={(e) => setTiming(e.target.value)} required />
        </div>
        <div className="form-group mb-3">
          <label>Purpose:</label>
          <textarea class="form-control" className="form-control" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isNavigating}>Register</button>
      </form>
      {isNavigating && <p className="mt-3">Processing...</p>}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Registerconf;
