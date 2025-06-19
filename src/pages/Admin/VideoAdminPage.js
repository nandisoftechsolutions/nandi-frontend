import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';

function VideoAdminPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    youtube_url: '',
  });
  const [videos, setVideos] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchVideos = async () => {
    const res = await axios.get('http://localhost:5000/api/videos');
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/videos/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/videos', form);
    }
    setForm({ title: '', description: '', thumbnail_url: '', youtube_url: '' });
    setEditId(null);
    fetchVideos();
  };

  const handleEdit = (video) => {
    setForm(video);
    setEditId(video.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this video?')) {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      fetchVideos();
    }
  };

  return (
    <div className="container py-5">
      <AdminNavbar />
      <h2 className="mb-4 text-primary">Video Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Thumbnail URL</label>
          <input name="thumbnail_url" value={form.thumbnail_url} onChange={handleChange} required className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">YouTube URL</label>
          <input name="youtube_url" value={form.youtube_url} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">
          {editId ? 'Update Video' : 'Add Video'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setForm({ title: '', description: '', thumbnail_url: '', youtube_url: '' });
              setEditId(null);
            }}
            className="btn btn-secondary ms-3"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td><img src={video.thumbnail_url} alt="" width="100" /></td>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td><a href={video.youtube_url} target="_blank" rel="noreferrer">Link</a></td>
                <td>
                  <button onClick={() => handleEdit(video)} className="btn btn-sm btn-warning me-2">Edit</button>
                  <button onClick={() => handleDelete(video.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No videos added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VideoAdminPage;
