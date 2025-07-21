// src/constants/BASE_URL.js
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://nandisoftech-backend.onrender.com'
    : 'http://localhost:5000';

export default BASE_URL;
