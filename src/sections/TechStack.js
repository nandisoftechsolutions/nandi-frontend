import React from 'react';
import './TechStack.css';
import bgImage from '../assets/sections/usertechnology.jpg';

const TechStack = () => {
  const techs = ['React', 'Node.js', 'PostgreSQL', 'Bootstrap', 'Figma', 'AWS'];

  return (
    <section
      className="tech-stack-section text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Technology Stack Section"
    >
      <div className="container-fluid py-5">
        <div className="row">
          {/* Left spacer column (optional, remains empty on larger screens) */}
          <div className="col-12 col-md-7" />

          {/* Right content column */}
          <div className="col-12 col-md-5 d-flex flex-column align-items-start text-start tech-stack-content">
            <h1 className="mb-4 fw-bold">Technologies We Use</h1>
            {techs.map((tech, index) => (
              <div
                key={index}
                className="tech-card p-3 mb-3 rounded shadow-sm w-100 bg-dark text-white"
              >
                <h5 className="m-0">{tech}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
