// Updated OrderManagement.js with responsive design and scroll-to-form behavior

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './OrderManagement.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

const platformsList = ['Web', 'Android', 'iOS', 'Windows'];
const featuresList = ['Login', 'Payment', 'Notifications', 'Analytics'];
const serviceTypes = ['Web Development', 'App Development', 'UI/UX Design'];
const designStyles = ['Minimalist', 'Futuristic', 'Classic'];
const deadlines = ['1 Week','2 Weeks','1 Month','2 Months','Flexible'];
const budgets = ['₹10k - ₹20k','₹20k - ₹50k','₹50k - ₹1L','₹1L+'];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [assignToList, setAssignToList] = useState([]);
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [deliveryWebsite, setDeliveryWebsite] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [deliveryAdminId, setDeliveryAdminId] = useState('');
  const [deliveryAdminPassword, setDeliveryAdminPassword] = useState('');

  const deliveryFormRef = useRef(null);
  const editFormRef = useRef(null);

  const initialOrder = {
    name: '', project_name: '', email: '', phone: '', service_type: '', platform: [],
    features: [], design_style: '', deadline: '', budget: '', attachment: '',
    additional_notes: '', status: 'Pending', assigned_team: '', assign_to: '',
    start_date: '', end_date: ''
  };
  const [newOrder, setNewOrder] = useState(initialOrder);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/orders`)
      .then(res => setOrders(res.data))
      .catch(console.error);

    setTeamList(['Design','Development','Marketing','QA','Support']);
    setAssignToList(['Arjun Nandi','Nirmala K','Ramesh P','Divya S','Kiran J']);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    isEditing ? setEditOrder(prev => ({ ...prev, [name]: value })) : setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const updatedList = checked
      ? [...(isEditing ? editOrder[field] : newOrder[field]), value]
      : (isEditing ? editOrder[field] : newOrder[field]).filter(item => item !== value);
    isEditing ? setEditOrder(prev => ({ ...prev, [field]: updatedList })) : setNewOrder(prev => ({ ...prev, [field]: updatedList }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      isEditing ? setEditOrder(prev => ({ ...prev, attachment: reader.result })) : setNewOrder(prev => ({ ...prev, attachment: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = isEditing ? editOrder : newOrder;
    const request = isEditing
      ? axios.put(`${BASE_URL}/api/orders/${editOrder.id}`, data)
      : axios.post(`${BASE_URL}/api/orders`, data);

    request.then(resp => {
      if (isEditing) {
        setOrders(prev => prev.map(o => o.id === resp.data.id ? resp.data : o));
        setIsEditing(false);
        setEditOrder(null);
      } else {
        setOrders(prev => [...prev, resp.data]);
        setNewOrder(initialOrder);
      }
    }).catch(console.error);
  };

  const handleDelete = id => {
    axios.delete(`${BASE_URL}/api/orders/${id}`)
      .then(() => setOrders(prev => prev.filter(o => o.id !== id)))
      .catch(console.error);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['#','Name','Project','Email','Phone','Service','Status','Team','Assigned','Start','End']],
      body: orders.map(o => [o.id, o.name, o.project_name, o.email, o.phone, o.service_type, o.status, o.assigned_team, o.assign_to, o.start_date, o.end_date])
    });
    doc.save('orders.pdf');
  };

  const exportToExcel = () => {
    const rows = [['#','Name','Project','Email','Phone','Service','Status','Team','Assigned','Start','End'],
      ...orders.map(o => [o.id, o.name, o.project_name, o.email, o.phone, o.service_type, o.status, o.assigned_team, o.assign_to, o.start_date, o.end_date])];
    const csv = rows.map(r => r.join(',')).join('\n');
    saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'orders.csv');
  };

  const openDeliveryForm = (order) => {
    setDeliveryOrder(order);
    setDeliveryWebsite('');
    setDeliveryPrice('');
    setDeliveryAdminId('');
    setDeliveryAdminPassword('');
    setTimeout(() => deliveryFormRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleEdit = (order) => {
    setIsEditing(true);
    setEditOrder(order);
    setTimeout(() => editFormRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleDelivery = e => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/deliveries`, {
      order_id: deliveryOrder.id,
      website_link: deliveryWebsite,
      final_price: deliveryPrice,
      admin_id: deliveryAdminId,
      admin_password: deliveryAdminPassword
    }).then(() => {
      alert('Delivered successfully & email sent!');
      setDeliveryOrder(null);
    }).catch(console.error);
  };

  const formData = isEditing ? editOrder : newOrder;

  return (
    <div className="container-fluid px-3 py-4">
      <AdminNavbar />
      <br /><br /><br />
      <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center">
        <h2 className="fw-bold">Order Management</h2>
        <div className="btn-group">
          <button className="btn btn-outline-success" onClick={exportToPDF}>Export PDF</button>
          <button className="btn btn-outline-warning" onClick={exportToExcel}>Export CSV</button>
        </div>
      </div>
      <div className="table-responsive mb-5 shadow rounded bg-white p-3">
        <table className="table table-striped table-hover text-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th><th>Name</th><th>Project</th><th>Email</th><th>Phone</th><th>Service</th>
              <th>Platform</th><th>Features</th><th>Style</th><th>Deadline</th><th>Budget</th>
              <th>Start</th><th>End</th><th>Team</th><th>Assigned</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.name}</td><td>{o.project_name}</td><td>{o.email}</td><td>{o.phone}</td><td>{o.service_type}</td>
                <td>{o.platform?.join(', ')}</td><td>{o.features?.join(', ')}</td><td>{o.design_style}</td>
                <td>{o.deadline}</td><td>{o.budget}</td><td>{o.start_date || '-'}</td><td>{o.end_date || '-'}</td>
                <td>{o.assigned_team}</td><td>{o.assign_to}</td><td>{o.status}</td>
                <td>
                  <button className="btn btn-sm btn-success me-1" onClick={() => handleEdit(o)}>Edit</button>
                  <button className="btn btn-sm btn-info me-1" onClick={() => openDeliveryForm(o)}>Deliver</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={editFormRef} className="bg-light shadow-sm p-4 rounded mb-4">
        <h4 className="mb-4 text-primary text-center">{isEditing ? 'Edit Order' : 'Add New Order'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4 col-12"><input className="form-control" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required /></div>
            <div className="col-md-4 col-12"><input className="form-control" placeholder="Project Name" name="project_name" value={formData.project_name} onChange={handleChange} required /></div>
            <div className="col-md-4 col-12"><input className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required /></div>
            <div className="col-md-4 col-12"><input className="form-control" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} /></div>
            <div className="col-md-4 col-12"><select className="form-select" name="service_type" value={formData.service_type} onChange={handleChange}><option value="">Service Type</option>{serviceTypes.map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="col-md-4 col-12"><select className="form-select" name="design_style" value={formData.design_style} onChange={handleChange}><option value="">Design Style</option>{designStyles.map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="col-md-4 col-12"><select className="form-select" name="deadline" value={formData.deadline} onChange={handleChange}><option value="">Deadline</option>{deadlines.map(d => <option key={d}>{d}</option>)}</select></div>
            <div className="col-md-4 col-12"><select className="form-select" name="budget" value={formData.budget} onChange={handleChange}><option value="">Budget</option>{budgets.map(b => <option key={b}>{b}</option>)}</select></div>
            <div className="col-md-4 col-12"><select className="form-select" name="assigned_team" value={formData.assigned_team} onChange={handleChange}><option value="">Team</option>{teamList.map(t => <option key={t}>{t}</option>)}</select></div>
            <div className="col-md-4 col-12"><select className="form-select" name="assign_to" value={formData.assign_to} onChange={handleChange}><option value="">Assign To</option>{assignToList.map(p => <option key={p}>{p}</option>)}</select></div>
            <div className="col-md-6 col-12"><input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} /></div>
            <div className="col-md-6 col-12"><input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} /></div>
            <div className="col-12">
              <label className="form-label">Platform</label><br />
              {platformsList.map(pl => (
                <div key={pl} className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input" value={pl} checked={formData.platform.includes(pl)} onChange={e => handleCheckboxChange(e, 'platform')} />
                  <label className="form-check-label">{pl}</label>
                </div>
              ))}
            </div>
            <div className="col-12">
              <label className="form-label">Features</label><br />
              {featuresList.map(ft => (
                <div key={ft} className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input" value={ft} checked={formData.features.includes(ft)} onChange={e => handleCheckboxChange(e, 'features')} />
                  <label className="form-check-label">{ft}</label>
                </div>
              ))}
            </div>
            <div className="col-12"><input type="file" className="form-control" onChange={handleFileChange} /></div>
            <div className="col-12"><textarea name="additional_notes" className="form-control" rows="3" value={formData.additional_notes} onChange={handleChange} placeholder="Additional Notes"></textarea></div>
            <div className="col-12"><button type="submit" className="btn btn-primary w-100">{isEditing ? 'Update Order' : 'Add Order'}</button></div>
          </div>
        </form>
      </div>
      {deliveryOrder && (
        <div ref={deliveryFormRef} className="bg-light shadow-sm p-4 rounded mb-4">
          <h5 className="mb-3 text-success">Deliver Project to {deliveryOrder.name} ({deliveryOrder.email})</h5>
          <form onSubmit={handleDelivery}>
            <input className="form-control mb-2" placeholder="Website Link" value={deliveryWebsite} onChange={e => setDeliveryWebsite(e.target.value)} required />
            <input className="form-control mb-2" placeholder="Final Price" value={deliveryPrice} onChange={e => setDeliveryPrice(e.target.value)} required />
            <input className="form-control mb-2" placeholder="Admin ID" value={deliveryAdminId} onChange={e => setDeliveryAdminId(e.target.value)} required />
            <input className="form-control mb-3" placeholder="Admin Password" type="password" value={deliveryAdminPassword} onChange={e => setDeliveryAdminPassword(e.target.value)} required />
            <button className="btn btn-success w-100">Deliver Now & Send Email</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
