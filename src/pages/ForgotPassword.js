import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, { email });
      setMessage(res.data.message || 'OTP sent successfully.');
      setIsError(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send OTP');
      setIsError(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary">Forgot Password</h2>
        <form onSubmit={handleSendOtp}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Send OTP
          </button>
        </form>
        {message && (
          <div className={`alert mt-3 ${isError ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
