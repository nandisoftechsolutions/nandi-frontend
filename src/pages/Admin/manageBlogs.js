import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';
import './ManageBlogs.css';
import BASE_URL from '../../api';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    content: '',
    category: '',
    video_link: '',
    thumbnail: null
  });

  const [alert, setAlert] = useState({ message: '', type: '' });
  const scrollRef = useRef(null);

  const categories = ['React', 'Node.js', 'Design', 'Marketing'];

  const loadBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/manageblogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showAlert('Failed to load blogs.', 'danger');
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleFormChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'thumbnail' ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      ['title', 'content', 'category', 'video_link'].forEach(f => data.append(f, form[f]));
      if (form.thumbnail) data.append('thumbnail', form.thumbnail);

      if (form.id) {
        await axios.put(`${BASE_URL}/api/manageblogs/${form.id}`, data);
        showAlert('Blog updated successfully!');
      } else {
        await axios.post(`${BASE_URL}/api/manageblogs`, data);
        showAlert('Blog added successfully!');
      }

      setForm({ id: null, title: '', content: '', category: '', video_link: '', thumbnail: null });
      loadBlogs();
    } catch (err) {
      console.error('Error submitting form:', err);
      showAlert('Failed to submit blog.', 'danger');
    }
  };

  const handleEdit = blog => {
    setForm({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      category: blog.category,
      video_link: blog.video_link,
      thumbnail: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${BASE_URL}/api/manageblogs/${id}`);
        showAlert('Blog deleted successfully!', 'warning');
        loadBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        showAlert('Failed to delete blog.', 'danger');
      }
    }
  };

  const scrollBlogs = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container py-5">
      <AdminNavbar />
      <br />
      <h2 className="text-center fw-bold text-primary mb-4">📝 Manage Blogs</h2>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ message: '', type: '' })}></button>
        </div>
      )}

      {/* Blog Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="border p-4 rounded shadow-sm bg-white mb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="Blog Title"
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="col-md-6">
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className="form-select form-select-lg"
              required
            >
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-12">
            <textarea
              name="content"
              value={form.content}
              onChange={handleFormChange}
              className="form-control"
              placeholder="Blog Content"
              rows={5}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              name="video_link"
              value={form.video_link}
              onChange={handleFormChange}
              placeholder="YouTube Video Link (optional)"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              className="form-control"
              onChange={handleFormChange}
            />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-lg btn-outline-success px-5">
              {form.id ? 'Update' : 'Add'} Blog
            </button>
          </div>
        </div>
      </form>

      {/* Blog List with Horizontal Scroll */}
      <div className="position-relative">
        <button className="scroll-btn left" onClick={() => scrollBlogs('left')}>&#8592;</button>
        <div className="blog-scroll-container d-flex overflow-auto px-2" ref={scrollRef}>
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card shadow-sm bg-white rounded m-2 flex-shrink-0" style={{ minWidth: '280px', maxWidth: '320px' }}>
              {blog.thumbnail && (
                <img
                  src={`${BASE_URL}/uploads/${blog.thumbnail}`}
                  alt={`${blog.title} thumbnail`}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title text-primary">{blog.title}</h5>
                <p className="text-muted small mb-1">{new Date(blog.created_at).toLocaleDateString()}</p>
                <p className="flex-grow-1">{blog.content.slice(0, 100)}{blog.content.length > 100 && '...'}</p>
                <div className="d-flex justify-content-between pt-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(blog)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scrollBlogs('right')}>&#8594;</button>
      </div>
    </div>
  );
}
