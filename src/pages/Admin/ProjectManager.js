// File: ProjectManager.js

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';
import './ProjectManager.css'; // Make sure this file exists

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    service_type: '',
    image_file: null,
    current_image_url: '',
    youtube_link: '',
    demo_link: ''
  });
  const [editId, setEditId] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manageprojects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_file') {
      setForm({ ...form, image_file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const url = editId
        ? `http://localhost:5000/api/manageprojects/${editId}`
        : 'http://localhost:5000/api/manageprojects';
      const method = editId ? axios.put : axios.post;
      await method(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      service_type: project.service_type,
      image_file: null,
      current_image_url: project.image_url,
      youtube_link: project.youtube_link,
      demo_link: project.demo_link
    });
    setEditId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/manageprojects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      service_type: '',
      image_file: null,
      current_image_url: '',
      youtube_link: '',
      demo_link: ''
    });
    setEditId(null);
  };

  const scrollProjects = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid p-4 mt-5">
        <div className="container bg-white p-4 shadow-lg rounded">
          <h2 className="text-center mb-4 text-primary fw-bold">
            {editId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Service Type</label>
              <select name="service_type" value={form.service_type} onChange={handleChange} className="form-select" required>
                <option value="">Select Service</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="SEO">SEO</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows="3" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">YouTube Link</label>
              <input name="youtube_link" value={form.youtube_link} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Demo Link</label>
              <input name="demo_link" value={form.demo_link} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-12">
              <label className="form-label">Upload Image</label>
              <input type="file" name="image_file" onChange={handleChange} className="form-control" accept="image/*" />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-5 shadow-sm">
                {editId ? 'Update' : 'Add'} Project
              </button>
            </div>
          </form>
        </div>

        <h3 className="my-4 text-primary fw-bold text-center">Projects List</h3>
        <div className="position-relative">
          <button className="scroll-btn left" onClick={() => scrollProjects('left')}>&#8592;</button>
          <div className="project-scroll-container" ref={scrollRef}>
            {projects.map((p) => (
              <div className="project-card" key={p.id}>
                {p.image_url && (
                  <img
                    src={`http://localhost:5000${p.image_url}`}
                    alt={p.title}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{p.title}</h5>
                  <p className="card-text text-muted small">{p.description}</p>
                  <span className="badge bg-info mb-2">{p.service_type}</span>
                  <div className="mt-auto d-flex flex-wrap gap-2">
                    {p.youtube_link && (
                      <a href={p.youtube_link} target="_blank" rel="noreferrer" className="btn btn-outline-danger btn-sm">YouTube</a>
                    )}
                    {p.demo_link && (
                      <a href={p.demo_link} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm">Demo</a>
                    )}
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scrollProjects('right')}>&#8594;</button>
        </div>
      </div>
    </>
  );
};

export default ProjectManager;
