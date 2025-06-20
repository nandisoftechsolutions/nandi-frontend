// src/pages/ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, formData);
      setMessage(response.data.message);
      setFormData({ email: '', otp: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || '❌ Verification failed');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
        <h3 className="text-center mb-4 text-success">🔒 Reset Password</h3>

        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              name="otp"
              className="form-control"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP sent to your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Reset Password
          </button>
        </form>

        {message && (
          <div className="alert alert-success mt-3 text-center">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
