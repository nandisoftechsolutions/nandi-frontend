import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './portfolioSection.css';
import BASE_URL from '../api';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/manageprojects`);
        const updated = res.data.map((p) => ({
          ...p,
          full_image_url: p.image_url ? `${BASE_URL}${p.image_url}` : '',
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
      const scrollTo =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollRef.current.clientWidth
          : scrollRef.current.scrollLeft + scrollRef.current.clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  const serviceTypes = ['All', 'Website', 'Mobile App', 'Software'];

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.service_type === filter);

  return (
    <section className="portfolio-section-wrapper py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-primary fw-bold mb-2">Our Portfolio</h2>
        <p className="text-center text-muted mb-4 px-4">
          A collection of our web, mobile, and software projects, showcasing our skills and creativity.
        </p>
        <hr />

        <div className="text-center mb-4">
          {serviceTypes.map((type) => (
            <button
              key={type}
              className={`btn btn-outline-primary mx-1 ${filter === type ? 'active' : ''}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="scroll-wrapper position-relative">
          <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>
            &#10094;
          </button>

          <div className="scroll-container d-flex gap-3" ref={scrollRef}>
            {filtered.map((project) => (
              <div className="card project-card shadow-sm flex-shrink-0" key={project.id}>
                <div className="image-wrapper">
                  {project.full_image_url ? (
                    <img
                      src={project.full_image_url}
                      alt={project.title}
                      className="card-img-top"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text small text-muted">{project.description}</p>
                  <div className="d-flex justify-content-start gap-2 mt-2">
                    {project.youtube_link && (
                      <a
                        href={project.youtube_link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-danger"
                      >
                        YouTube
                      </a>
                    )}
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-success"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>
            &#10095;
          </button>
        </div>

        <hr />
      </div>
    </section>
  );
}

export default Portfolio;
