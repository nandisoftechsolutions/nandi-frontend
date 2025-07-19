import React, { useState, useRef } from "react"; // ✅ added useRef
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import BASE_URL from '../api';

function PlaceOrder() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', serviceType: '',
    platform: [], features: [], designStyle: '',
    deadline: '', budget: '', attachment: null,
    additionalNotes: '',
  });

  const fileInputRef = useRef(null);
  const messageRef = useRef(null);
  const [message, setMessage] = useState('');

  const platforms = ['Android', 'iOS', 'Web App'];
  const featuresList = ['Login', 'Payment', 'Admin Panel', 'Notifications'];
  const serviceTypes = ['Website', 'Mobile App', 'Software', 'UI/UX'];
  const designStyles = ['Minimal', 'Modern', 'Corporate', 'Creative'];
  const deadlines = ['1 Week', '2 Weeks', '1 Month', 'Flexible'];
  const budgets = ['< ₹10k', '₹10k–₹50k', '₹50k–₹1L', '₹1L+'];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] || null }));
    } else if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (Array.isArray(form[key])) {
        form[key].forEach(val => formData.append(key, val));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/orders`, formData);
      if (res.data.success) {
        setMessage('✅ Your order has been submitted successfully!');
        resetForm();
      } else {
        setMessage('⚠️ Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || '❌ Server error. Try again.');
    } finally {
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const resetForm = () => {
    setForm({
      name: '', email: '', phone: '', serviceType: '',
      platform: [], features: [], designStyle: '',
      deadline: '', budget: '', attachment: null,
      additionalNotes: '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isChecked = (name, value) => form[name].includes(value);

  return (
    <div className="container py-5">
      <Helmet>
        <title>Place an Order | Nandi Softech</title>
        <meta
          name="description"
          content="Place your project order with Nandi Softech Solutions. Select service type, platform, features, and upload files easily."
        />
      </Helmet>

      <div className="card shadow p-4 bg-light rounded-4">
        <h2 className="text-center mb-4 fw-bold">Place an Order</h2>

        {message && (
          <div ref={messageRef} className="alert alert-info text-center fw-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Type</label>
              <select className="form-select" name="serviceType" value={form.serviceType} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Design Style</label>
              <select className="form-select" name="designStyle" value={form.designStyle} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {designStyles.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Deadline</label>
              <select className="form-select" name="deadline" value={form.deadline} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Budget</label>
              <select className="form-select" name="budget" value={form.budget} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Attachment</label>
              <input
                type="file"
                className="form-control"
                name="attachment"
                ref={fileInputRef}
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
              />
              {form.attachment && (
                <small className="text-muted d-block mt-1">📎 {form.attachment.name}</small>
              )}
            </div>
            <div className="col-12">
              <label className="form-label">Platform</label>
              <div className="d-flex flex-wrap gap-3">
                {platforms.map(item => (
                  <div key={item} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`platform-${item}`}
                      name="platform"
                      value={item}
                      checked={isChecked('platform', item)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`platform-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Features</label>
              <div className="d-flex flex-wrap gap-3">
                {featuresList.map(item => (
                  <div key={item} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`features-${item}`}
                      name="features"
                      value={item}
                      checked={isChecked('features', item)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor={`features-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-control"
                name="additionalNotes"
                rows="4"
                value={form.additionalNotes}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Submit Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
