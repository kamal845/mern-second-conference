import React, { useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL = 'http://localhost:4000';
const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/feedback', {
          Name: name,
          Email: email,
          Message: message
        });
        setResponseMessage(response.data.message);
      } catch (error) {
        setResponseMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
      }
    };
  
    return (
      <div className="container mt-5">
           <Navbar/>
        <h3>Feedback After attending Conference</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Feedback</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    );
  };
  
export default Feedback