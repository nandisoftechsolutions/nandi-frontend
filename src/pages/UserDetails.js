// src/pages/UserDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';
import BASE_URL from '../api';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData?.email;

  useEffect(() => {
    if (!email) {
      setError('User email not found. Please log in again.');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${BASE_URL}/api/user/${email}`);
        setUser(userRes.data);

        const ordersRes = await axios.get(`${BASE_URL}/api/user/${email}/orders`);
        setOrders(ordersRes.data);

        const subsRes = await axios.get(`${BASE_URL}/api/user/${email}/subscriptions`);
        setSubscriptions(subsRes.data);
      } catch (err) {
        console.error('❌ API Error:', err);
        setError(err.response?.data?.message || 'Something went wrong');
      }
    };

    fetchData();
  }, [email]);

  const submitFeedback = async () => {
    if (!feedback || rating === 0) {
      alert('Please provide feedback and rating');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/api/feedback`, {
        name: user.name,
        email: user.email,
        description: feedback,
        rating
      });
      alert('Thank you for your feedback!');
      setFeedback('');
      setRating(0);
    } catch (err) {
      console.error('Feedback submission failed', err);
      alert('Failed to submit feedback');
    }
  };

  if (error) return <div className="container mt-5 text-danger"><h4>Error:</h4><p>{error}</p></div>;

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container py-4">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <h3 className="mb-3">Welcome, {user.name}</h3>

      <div className="card mb-4">
        <div className="card-header">User Information</div>
        <div className="card-body">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Your Orders</div>
        <div className="card-body">
          {orders.length ? orders.map(order => (
            <div className="border p-3 mb-3" key={order.id}>
              <p><strong>Service:</strong> {order.service_type}</p>
              <p><strong>Platform:</strong> {Array.isArray(order.platform) ? order.platform.join(', ') : order.platform}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button className="btn btn-outline-primary btn-sm">Edit Order</button>
            </div>
          )) : <>
            <p>No orders found.</p>
            <button className="btn btn-success" onClick={() => navigate('/place-order')}>Place Your First Order</button>
          </>}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Subscribed Courses</div>
        <div className="card-body">
          {subscriptions.length ? subscriptions.map(sub => (
            <div className="border p-3 mb-3" key={sub.id}>
              <p><strong>Course:</strong> {sub.course_name}</p>
              <p><strong>Subscribed On:</strong> {new Date(sub.subscribed_at).toLocaleDateString()}</p>
              <button className="btn btn-outline-info btn-sm" onClick={() => navigate(`/course/${sub.course_id}`)}>Go to Course</button>
            </div>
          )) : <p>No subscriptions yet.</p>}
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-header">Submit Feedback</div>
        <div className="card-body">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <div className="mb-3">
            <label>Description</label>
            <textarea className="form-control" rows="4" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </div>

          <div className="mb-3">
            <label>Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '1.5rem' }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={submitFeedback}>Submit Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
