import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    'Sl No.': '',
    EmployeeID: '',
    Name: '',
    Role: '',
    Email: '',
    Phone: '',
    'Join Date': '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api.sheetbest.com/sheets/a83bd58e-805b-4a2a-aae9-a47ca48c3afc', formData);
      alert('Employee added successfully!');
      setFormData({
        'Sl No.': '',
        EmployeeID: '',
        Name: '',
        Role: '',
        Email: '',
        Phone: '',
        'Join Date': '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add employee.');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Employee</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="Sl No." placeholder="Sl No." value={formData['Sl No.']} onChange={handleChange} required />
        <input className="form-control mb-2" name="EmployeeID" placeholder="Employee ID" value={formData.EmployeeID} onChange={handleChange} required />
        <input className="form-control mb-2" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required />
        <input className="form-control mb-2" name="Role" placeholder="Role" value={formData.Role} onChange={handleChange} required />
        <input className="form-control mb-2" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
        <input className="form-control mb-2" name="Phone" placeholder="Phone" value={formData.Phone} onChange={handleChange} required />
        <input className="form-control mb-3" name="Join Date" placeholder="Join Date (YYYY-MM-DD)" value={formData['Join Date']} onChange={handleChange} required />
        <button className="btn btn-success">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
