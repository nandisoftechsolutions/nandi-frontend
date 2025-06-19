import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './BlogsSection.css'; // Make sure this file is in the same folder

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
      const res = await axios.get('http://localhost:5000/api/manageblogs');
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
    <div className="blogs-section-wrapper">
      <h2 className="text-center mb-2">Our Blog</h2>
      <p className="text-center text-muted mb-4 px-4">
        Explore insightful articles, tutorials, and videos on web development, design, and tech tips from our team of experienced developers.
      </p>
      <hr />

      <div className="text-center mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-outline-secondary mx-1 ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="scroll-wrapper">
        <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>&#10094;</button>

        <div className="scroll-container" ref={scrollRef}>
          {filteredBlogs.map(blog => (
            <a
              key={blog.id}
              href={blog.video_link || '#'}
              target="_blank"
              rel="noreferrer"
              className="blog-card"
            >
              {blog.thumbnail && (
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000/uploads/${blog.thumbnail}`}
                    alt={blog.title}
                    className="card-img-top"
                  />
                  <div className="play-button-overlay">
                    <i className="bi bi-play-circle-fill play-icon"></i>
                  </div>
                </div>
              )}
              <div className="cards-body">
                <h5 className="cards-title">{blog.title}</h5>
                <p className="cards-text">{blog.content?.slice(0, 100)}...</p>
              </div>
            </a>
          ))}
        </div>

        <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>&#10095;</button>
      </div>

      <hr />
    </div>
  );
}

export default BlogsSection;
