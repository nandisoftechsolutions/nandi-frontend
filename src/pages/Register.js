import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRegister = async () => {
    const { name, email, mobile, password } = formData;

    if (!name || !email || !mobile || !password || !profilePicture) {
      alert('Please fill all fields and select a profile picture');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('mobile', mobile);
      data.append('password', password);
      data.append('profilePicture', profilePicture);

      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('User registered successfully');
        setFormData({ name: '', email: '', mobile: '', password: '' });
        setProfilePicture(null);
        navigate('/login');
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <br />
      <div className="register-form-box">
        <h2 className="register-form-title">Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="register-input"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          className="register-input"
          value={formData.mobile}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profilePicture"
          className="register-input"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <p className="register-footer-text">
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className="register-login-link"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
