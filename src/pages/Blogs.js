// File: frontend/src/pages/Blogs.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blogs.css';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'React', 'Node.js', 'Design', 'Marketing'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/manageblogs');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filteredBlogs = filter === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === filter);

  return (
    <div className="container py-5">
      <br></br>
      <h2 className="mb-4 text-center fw-bold">📝 Our Blog</h2>
      <hr></hr>
      <div className="text-center mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-outline-primary mx-1 category-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
       <hr></hr>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredBlogs.map(blog => (
          <div className="col" key={blog.id}>
            <div className="blog-card h-100 shadow-sm">
              {blog.thumbnail && (
                <div className="blog-image-wrapper">
                  <img
                    src={`http://localhost:5000/uploads/${blog.thumbnail}`}
                    alt={blog.title}
                    className="blog-image"
                  />
                  {blog.video_link && (
                    <a
                      href={blog.video_link}
                      target="_blank"
                      rel="noreferrer"
                      className="play-button"
                    >
                      <i className="bi bi-play-circle-fill"></i>
                    </a>
                  )}
                </div>
              )}
              <div className="blog-content d-flex flex-column p-3">
                <h5 className="blog-title">{blog.title}</h5>
                <p className="blog-description">
                  {blog.content?.slice(0, 100)}...
                </p>
                <p className="text-muted mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
                {blog.video_link && (
                  <a
                    href={blog.video_link}
                    className="blog-watch-btn text-decoration-none text-center"
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
