import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './portfolioSection.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/manageprojects');
        const updated = res.data.map(p => ({
          ...p,
          full_image_url: p.image_url ? `http://localhost:5000${p.image_url}` : '',
        }));
        setProjects(updated);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const serviceTypes = ['All', 'Website', 'Mobile App', 'Software'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.service_type === filter);

  return (
    <div className="portfolio-section-wrapper">
      <h2 className="text-center mb-2">Our Portfolio</h2>
      <p className="text-center text-muted mb-4 px-4">
        A collection of our web, mobile, and software projects, showcasing our skills and creativity.
      </p>
      <hr />

      <div className="text-center mb-4">
        {serviceTypes.map(type => (
          <button
            key={type}
            className={`btn btn-outline-primary mx-1 ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="scroll-wrapper">
        <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>&#10094;</button>

        <div className="scroll-container" ref={scrollRef}>
          {filtered.map(project => (
            <div className="project-card" key={project.id}>
              {project.full_image_url ? (
                <div className="image-wrapper">
                  <img
                    src={project.full_image_url}
                    alt={project.title}
                    className="card-img-top"
                  />
                </div>
              ) : (
                <div className="image-wrapper">
                  <div className="no-image">No Image Available</div>
                </div>
              )}
              <div className="card-body">
                <div className="card-title">{project.title}</div>
                <div className="card-text">{project.description}</div>
                <div className="d-flex justify-content-between mt-2">
                  {project.youtube_link && (
                    <a href={project.youtube_link} target="_blank" rel="noreferrer" className="btn btn-sm btn-danger">YouTube</a>
                  )}
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" rel="noreferrer" className="btn btn-sm btn-success">Live Demo</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>&#10095;</button>
      </div>

      <hr />
    </div>
  );
}

export default Portfolio;
