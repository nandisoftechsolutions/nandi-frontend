import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './BlogsSection.css';
import BASE_URL from '../api';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');
  const scrollRef = useRef(null);

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

  const filteredBlogs =
    filter === 'All' ? blogs : blogs.filter(blog => blog.category === filter);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="blogs-section-wrapper py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-primary">Our Blog</h2>
        <p className="text-center text-muted mb-4">
          Explore insightful tutorials and tech updates by our developers.
        </p>
        <hr />

        <div className="text-center mb-4 d-flex flex-wrap justify-content-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-outline-secondary mx-1 mb-2 ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="scroll-wrapper position-relative">
          <button
            type="button"
            className="arrow-btn left-arrow"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            &#10094;
          </button>

          <div className="scroll-container d-flex overflow-auto px-2" ref={scrollRef}>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <a
                  key={blog._id || blog.id}
                  href={blog.video_link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card text-decoration-none mx-2"
                  style={{
                    flex: '0 0 auto',
                    width: '300px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                  }}
                >
                  {blog.thumbnail && (
                    <div className="image-wrapper position-relative">
                      <img
                        src={`${BASE_URL}/uploads/${blog.thumbnail}`}
                        alt={blog.title || 'Blog thumbnail'}
                        className="w-100"
                        style={{
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '0',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                        }}
                      />
                      <div className="play-button-overlay position-absolute top-50 start-50 translate-middle">
                        <i className="bi bi-play-circle-fill text-white fs-1"></i>
                      </div>
                    </div>
                  )}
                  <div className="card-body p-3">
                    <h5 className="card-title fw-semibold">{blog.title}</h5>
                    <p className="card-text text-muted">
                      {blog.content?.slice(0, 100)}...
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-center text-muted mx-auto">No blogs available.</p>
            )}
          </div>

          <button
            type="button"
            className="arrow-btn right-arrow"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            &#10095;
          </button>
        </div>

        <hr />
      </div>
    </section>
  );
};

export default BlogsSection;
