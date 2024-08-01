import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsNavigating(true);
    try {
      const response = await axios.post('/signup', {
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
      });
      setMessage(response.data.message);
      if (response.data.status === 'success') {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
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
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isNavigating}>Signup</button>
      </form>
      {isNavigating && <p className="mt-3">Processing...</p>}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Signup;
