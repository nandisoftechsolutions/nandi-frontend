// File: frontend/src/pages/TeacherManage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';

export default function TeacherManage() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    bio: '',
    profile_picture: null,
    current_picture_url: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const res = await axios.get('http://localhost:5000/api/teachers');
    setTeachers(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setForm({ ...form, profile_picture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('bio', form.bio);
    if (form.profile_picture) formData.append('profile_picture', form.profile_picture);

    if (form.id) {
      await axios.put(`http://localhost:5000/api/teachers/${form.id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/teachers', formData);
    }

    setForm({ id: null, name: '', email: '', bio: '', profile_picture: null, current_picture_url: '' });
    fetchTeachers();
  };

  const handleEdit = (teacher) => {
    setForm({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      bio: teacher.bio,
      profile_picture: null,
      current_picture_url: teacher.profile_picture
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teacher?')) {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers();
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container py-4">
      <br/>
      
      <h2 className="mb-4">Manage Teachers</h2>
      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <div className="mb-3">
          <input type="text" name="name" className="form-control" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="bio" className="form-control" placeholder="Bio" value={form.bio} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="file" name="profile_picture" className="form-control" onChange={handleChange} />
          {form.current_picture_url && (
            <img src={`http://localhost:5000/uploads/${form.current_picture_url}`} alt="Current" width="100" className="mt-2 rounded" />
          )}
        </div>
        <button className="btn btn-primary" type="submit">{form.id ? 'Update' : 'Add'} Teacher</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td><img src={`http://localhost:5000/uploads/${t.profile_picture}`} width="60" height="60" className="rounded-circle" alt={t.name} /></td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.bio}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(t)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
} 
