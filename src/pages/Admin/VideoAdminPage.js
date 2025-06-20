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

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/videos/${editId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/videos', form);
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error('Failed to submit video:', err);
    }
  };

  const handleEdit = (video) => {
    setForm(video);
    setEditId(video.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete(`http://localhost:5000/api/videos/${id}`);
        fetchVideos();
      } catch (err) {
        console.error('Failed to delete video:', err);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      thumbnail_url: '',
      youtube_url: '',
    });
    setEditId(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container py-5">
        <h2 className="mb-4 text-primary">Video Management</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Thumbnail URL</label>
            <input
              name="thumbnail_url"
              value={form.thumbnail_url}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success">
            {editId ? 'Update Video' : 'Add Video'}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
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
                <th>YouTube Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video.id}>
                    <td>
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        width="100"
                        height="60"
                        style={{ objectFit: 'cover' }}
                      />
                    </td>
                    <td>{video.title}</td>
                    <td>{video.description}</td>
                    <td>
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary"
                      >
                        Watch
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(video)}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No videos added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VideoAdminPage;
