// src/pages/ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', formData);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Verification failed');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleVerify}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>OTP</label>
          <input type="text" name="otp" className="form-control" value={formData.otp} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input type="password" name="newPassword" className="form-control" value={formData.newPassword} onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Reset Password</button>
      </form>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
}

export default ResetPassword;
