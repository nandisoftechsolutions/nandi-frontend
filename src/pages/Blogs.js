import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blogs.css';
import BASE_URL from '../api';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'React', 'Node.js', 'Design', 'Marketing'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/manageblogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filteredBlogs = filter === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === filter);

  return (
    <div className="container py-4">
      <br/>
      <br/>
      <h2 className="mb-4 text-center fw-bold">📝 Our Blog</h2>
      <div className="text-center mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-outline-primary mx-1 mb-2 category-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredBlogs.map(blog => (
          <div className="col" key={blog.id}>
            <div className="blog-card h-100 shadow-sm">
              {blog.thumbnail && (
                <div className="blog-image-wrapper position-relative">
                  <img
                    src={`${BASE_URL}/uploads/${blog.thumbnail}`}
                    alt={blog.title}
                    className="blog-image w-100"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  {blog.video_link && (
                    <a
                      href={blog.video_link}
                      target="_blank"
                      rel="noreferrer"
                      className="play-button position-absolute top-50 start-50 translate-middle"
                    >
                      <i className="bi bi-play-circle-fill fs-2 text-white"></i>
                    </a>
                  )}
                </div>
              )}
              <div className="blog-content d-flex flex-column p-3">
                <h5 className="blog-title">{blog.title}</h5>
                <p className="blog-description mb-2">
                  {blog.content?.slice(0, 100)}...
                </p>
                <small className="text-muted mb-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </small>
                {blog.video_link && (
                  <a
                    href={blog.video_link}
                    className="blog-watch-btn btn btn-outline-dark btn-sm mt-auto text-nowrap"
                    target="_blank"
                    rel="noreferrer"
                  >
                    🎥 Watch Video
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
