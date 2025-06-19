// File: src/pages/TeacherLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert('Please fill all fields');

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/login', {
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
    <div className="container d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-primary text-center mb-4">Teacher Login</h2>

        <div className="mb-3 position-relative">
          <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
          <input
            type="email"
            className="form-control ps-5"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3 position-relative">
          <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
          <input
            type="password"
            className="form-control ps-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
