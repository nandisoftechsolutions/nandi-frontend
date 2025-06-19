import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem('userToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('username', user.name);
        localStorage.setItem('userAvatar', user.profile_picture || 'default-user.png');

        alert(`Welcome, ${user.name}`);
        window.location.href = '/';
      } else {
        alert(response.data.error || 'Unexpected error');
      }
    } catch (error) {
      console.error('Login error:', error.response);
      alert(error.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card shadow-lg p-4 bg-white rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-gradient">Welcome Back 👋</h2>
          <p className="text-muted mb-0">Login to your account</p>
        </div>

        <div className="form-group position-relative mb-4">
          <FaEnvelope className="form-icon text-muted" />
          <input
            type="email"
            className="form-control rounded-pill ps-5"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group position-relative mb-4">
          <FaLock className="form-icon text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control rounded-pill ps-5 pe-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-toggle text-muted"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary rounded-pill w-100 fw-semibold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-4">
          <small className="text-muted">Don't have an account?</small>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-link p-0 ms-1 text-decoration-none"
          >
            Register
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate('/forgot-password')}
            className="btn btn-link p-0 text-decoration-none"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate('/teacherslogin')}
            className="btn btn-link p-0 text-decoration-none"
          >
            Teacher Login
          </button>
        </div>
      </div>
    </div>
  );
}
