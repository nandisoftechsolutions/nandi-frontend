import React from 'react';
import './TechStack.css';
import bgImage from '../assets/sections/usertechnology.jpg';

const TechStack = () => {
  const techs = ['React', 'Node.js', 'PostgreSQL', 'Bootstrap', 'Figma', 'AWS'];

  return (
    <section
      className="tech-stack-section text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container-fluid py-5">
        <div className="row">
          {/* Left empty space (70%) */}
          <div className="col-12 col-md-7"></div>

          {/* Right side content (30%) */}
          <div className="col-12 col-md-5 d-flex flex-column align-items-start text-start tech-stack-content">
            <h1 className="mb-4 fw-bold">Technologies We Use</h1>
            {techs.map((tech, i) => (
              <div key={i} className="tech-card p-3 mb-3 rounded shadow-sm w-100">
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
