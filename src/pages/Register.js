// File: src/pages/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRegister = async () => {
    const { name, email, mobile, password, address } = formData;

    if (!name || !email || !mobile || !password || !address || !profilePicture) {
      alert('Please fill all fields and select a profile picture');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('mobile', mobile);
      data.append('password', password);
      data.append('address', address);
      data.append('profilePicture', profilePicture);

      const response = await axios.post(`${BASE_URL}/api/auth/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201 || response.status === 200) {
        alert('🎉 Registered successfully');
        setFormData({ name: '', email: '', mobile: '', password: '', address: '' });
        setProfilePicture(null);
        navigate('/login');
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100 rounded-4 border-0" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Create Your Account</h2>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Full Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Email Address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="tel"
            name="mobile"
            className="form-control"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          <label>Mobile Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <label>Address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading && <Spinner animation="border" size="sm" className="me-2" />}
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="text-center mt-4">
          <small className="text-muted">Already have an account?</small>
          <button
            className="btn btn-link p-0 ms-2"
            onClick={() => navigate('/login')}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
