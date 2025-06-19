import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

function PlaceOrder() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', serviceType: '',
    platform: [], features: [], designStyle: '',
    deadline: '', budget: '', attachment: null,
    additionalNotes: '',
  });

  const fileInputRef = useRef(null);
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
      const res = await axios.post('http://localhost:5000/api/orders', formData);
      if (res.data.success) {
        setMessage('✅ Order submitted successfully!');
        setForm({
          name: '', email: '', phone: '', serviceType: '',
          platform: [], features: [], designStyle: '',
          deadline: '', budget: '', attachment: null,
          additionalNotes: '',
        });
        if (fileInputRef.current) fileInputRef.current.value = ''; // reset file
      } else {
        setMessage('⚠️ Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || '❌ Server error. Try again.');
    }
  };

  const isChecked = (name, value) => form[name].includes(value);

  return (
    <div className="container py-5">
      <div className="card shadow p-4" style={{ backgroundColor: '#f7f9fc', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4">Place an Order</h2>
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Service Type</label>
              <select className="form-select" name="serviceType" value={form.serviceType} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Design Style</label>
              <select className="form-select" name="designStyle" value={form.designStyle} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {designStyles.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Deadline</label>
              <select className="form-select" name="deadline" value={form.deadline} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Budget</label>
              <select className="form-select" name="budget" value={form.budget} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Attachment</label>
              <input type="file" className="form-control" name="attachment" ref={fileInputRef} onChange={handleChange} accept=".pdf,.doc,.docx,.txt,.jpg,.png" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Platform</label>
              <div className="d-flex flex-wrap gap-2">
                {platforms.map(item => (
                  <div key={item} className="form-check me-3">
                    <input type="checkbox" className="form-check-input" id={`platform-${item}`} name="platform" value={item} checked={isChecked('platform', item)} onChange={handleChange} />
                    <label className="form-check-label" htmlFor={`platform-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Features</label>
              <div className="d-flex flex-wrap gap-2">
                {featuresList.map(item => (
                  <div key={item} className="form-check me-3">
                    <input type="checkbox" className="form-check-input" id={`features-${item}`} name="features" value={item} checked={isChecked('features', item)} onChange={handleChange} />
                    <label className="form-check-label" htmlFor={`features-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-control" name="additionalNotes" rows="3" value={form.additionalNotes} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Order</button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
