import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './BlogsSection.css';
import BASE_URL from '../api';

function BlogsSection() {
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

        <div className="text-center mb-4 flex-wrap d-flex justify-content-center">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-outline-secondary mx-1 mb-2 ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="scroll-wrapper position-relative">
          <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>&#10094;</button>

          <div className="scroll-container d-flex overflow-auto" ref={scrollRef}>
            {filteredBlogs.map(blog => (
              <a
                key={blog.id}
                href={blog.video_link || '#'}
                target="_blank"
                rel="noreferrer"
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
                      alt={blog.title}
                      className="w-100"
                      style={{ height: '180px', objectFit: 'cover', borderRadius: '0' }}
                    />
                    <div className="play-button-overlay position-absolute top-50 start-50 translate-middle">
                      <i className="bi bi-play-circle-fill text-white fs-1"></i>
                    </div>
                  </div>
                )}
                <div className="cards-body p-3">
                  <h5 className="cards-title fw-semibold">{blog.title}</h5>
                  <p className="cards-text text-muted">
                    {blog.content?.slice(0, 100)}...
                  </p>
                </div>
              </a>
            ))}
          </div>

          <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>&#10095;</button>
        </div>

        <hr />
      </div>
    </section>
  );
}

export default BlogsSection;
