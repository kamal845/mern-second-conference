import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminnavbar from './adminnavbar';
axios.defaults.baseURL = 'http://localhost:4000';

const Adminviewsch = () => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/viewsch', {
          headers: {
            'x-auth-token': token,
          },
        });
        setRegistrations(res.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setError('Error fetching registrations. Please try again later.');
      }
    };
    fetchRegistrations();
  }, []);

  if (error) return <p>{error}</p>;
  if (registrations.length === 0) return <p>Loading...</p>;

  return (
    <>
      <Adminnavbar />
      <h1>View schedule of conference meeting</h1>
      {registrations.map((registration, index) => (
        <div key={index}>
          <p>Name: {registration.Name}</p>
          <p>Phone: {registration.Phone}</p>
          <p>Email: {registration.Email}</p>
          <p>Timing: {registration.Timing}</p>
          <p>Purpose: {registration.Purpose}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Adminviewsch;