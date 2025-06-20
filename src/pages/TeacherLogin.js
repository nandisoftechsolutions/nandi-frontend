// File: src/pages/TeacherLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/teacher/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      const { token, teacher } = res.data;

      localStorage.setItem('teacherToken', token);
      localStorage.setItem('teacher', JSON.stringify(teacher));
      localStorage.setItem('teacherName', teacher.name);

      alert(`Welcome, ${teacher.name}`);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '420px' }}>
        <h3 className="text-center text-primary mb-4 fw-semibold">Teacher Login</h3>

        <div className="form-group mb-3 position-relative">
          <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
          <input
            type="email"
            className="form-control ps-5 py-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4 position-relative">
          <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
          <input
            type="password"
            className="form-control ps-5 py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn btn-primary w-100 fw-semibold"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
