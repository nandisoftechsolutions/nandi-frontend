import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

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
      const res = await axios.get(`${BASE_URL}/api/videos`);
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
        await axios.put(`${BASE_URL}/api/videos/${editId}`, form);
      } else {
        await axios.post(`${BASE_URL}/api/videos`, form);
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
        await axios.delete(`${BASE_URL}/api/videos/${id}`);
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
        <form onSubmit={handleSubmit} className="mb-5 p-3 border rounded bg-light">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">YouTube URL</label>
              <input
                name="youtube_url"
                value={form.youtube_url}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Thumbnail URL</label>
              <input
                name="thumbnail_url"
                value={form.thumbnail_url}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="form-control"
              />
            </div>

            <div className="col-12 d-flex flex-wrap gap-3 mt-2">
              <button type="submit" className="btn btn-success">
                {editId ? 'Update Video' : 'Add Video'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Video Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
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
                    <td className="text-start">{video.description}</td>
                    <td>
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Watch
                      </a>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
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
