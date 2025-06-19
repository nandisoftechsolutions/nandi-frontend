// src/pages/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
    setMessage(res.data.message);
  } catch (err) {
    setMessage(err.response?.data?.error || 'Failed to send OTP');
  }
};

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSendOtp}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Send OTP</button>
      </form>
      {message && <p className="mt-3 text-danger">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
