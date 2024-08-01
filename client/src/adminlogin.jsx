import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

axios.defaults.baseURL = 'http://localhost:4000';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password,
      });
      setMessage(response.data.message);
      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.token);
        navigate('/adminhome');
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container container-custom mt-5">
      <h2 className="mb-4 text-center">Admin's Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={false}>
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default Adminlogin;
