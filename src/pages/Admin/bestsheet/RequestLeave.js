import React, { useState } from 'react';
import axios from 'axios';

const RequestLeave = () => {
  const [formData, setFormData] = useState({
    'Sl No.': '',
    EmployeeID: '',
    Name: '',
    'Leave Type': '',
    'From Date': '',
    'To Date': '',
    Reason: '',
    Status: 'Pending',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.sheetbest.com/sheets/a577c969-f257-4a22-9897-8b882f72821c', formData);
      alert("Leave request submitted successfully.");
      setFormData({
        'Sl No.': '',
        EmployeeID: '',
        Name: '',
        'Leave Type': '',
        'From Date': '',
        'To Date': '',
        Reason: '',
        Status: 'Pending',
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Request Leave</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="Sl No." placeholder="Sl No." value={formData['Sl No.']} onChange={handleChange} required />
        <input className="form-control mb-2" name="EmployeeID" placeholder="Employee ID" value={formData.EmployeeID} onChange={handleChange} required />
        <input className="form-control mb-2" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required />
        <select className="form-control mb-2" name="Leave Type" value={formData['Leave Type']} onChange={handleChange} required>
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Paid Leave">Paid Leave</option>
        </select>
        <input type="date" className="form-control mb-2" name="From Date" value={formData['From Date']} onChange={handleChange} required />
        <input type="date" className="form-control mb-2" name="To Date" value={formData['To Date']} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="Reason" placeholder="Reason" value={formData.Reason} onChange={handleChange} required />
        <button className="btn btn-primary">Submit Leave Request</button>
      </form>
    </div>
  );
};

export default RequestLeave;
