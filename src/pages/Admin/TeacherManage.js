// File: frontend/src/pages/TeacherManage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

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
    try {
      const res = await axios.get(`${BASE_URL}/api/teachers`);
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
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

    try {
      if (form.id) {
        await axios.put(`${BASE_URL}/api/teachers/${form.id}`, formData);
      } else {
        await axios.post(`${BASE_URL}/api/teachers`, formData);
      }
      setForm({ id: null, name: '', email: '', bio: '', profile_picture: null, current_picture_url: '' });
      fetchTeachers();
    } catch (err) {
      console.error('Error submitting teacher data:', err);
    }
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
      try {
        await axios.delete(`${BASE_URL}/api/teachers/${id}`);
        fetchTeachers();
      } catch (err) {
        console.error('Error deleting teacher:', err);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <br/>
      <br/>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="mb-4 text-center fw-bold">Manage Teachers</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light mb-5">
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
                <input type="file" name="profile_picture" className="form-control" onChange={handleChange} accept="image/*" />
                {form.current_picture_url && (
                  <img
                    src={`${BASE_URL}/uploads/${form.current_picture_url}`}
                    alt="Current"
                    width="100"
                    className="mt-2 img-thumbnail"
                    style={{ borderRadius: '0px' }}
                  />
                )}
              </div>
              <div className="text-center">
                <button className="btn btn-primary w-100" type="submit">
                  {form.id ? 'Update' : 'Add'} Teacher
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
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
                  <td>
                    <img
                      src={`${BASE_URL}/uploads/${t.profile_picture}`}
                      width="60"
                      height="60"
                      style={{ borderRadius: '0px', objectFit: 'cover' }}
                      alt={t.name}
                    />
                  </td>
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
      </div>
    </>
  );
}
