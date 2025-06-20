import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServiceDetails.css";

function ServiceDetails() {
  const location = useLocation();
  const { serviceTitle } = location.state || { serviceTitle: "Service" };

  const details = {
    "Website Development": {
      tech: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
      content:
        "We build fast, secure, SEO-friendly websites tailored to your brand using modern frontend & backend stacks.",
    },
    "Mobile App Development": {
      tech: ["Flutter", "React Native", "Firebase", "Android SDK", "iOS SDK"],
      content:
        "We develop cross-platform apps that run smoothly on both Android and iOS devices.",
    },
    "Software Solutions": {
      tech: [".NET", "Java", "Python", "MySQL", "MongoDB"],
      content:
        "We deliver custom software to streamline your operations and boost productivity.",
    },
    "UI/UX Design": {
      tech: ["Figma", "Adobe XD", "Sketch"],
      content:
        "Beautiful, intuitive interfaces crafted with user experience and brand in mind.",
    },
    "SEO & Marketing": {
      tech: ["Google Analytics", "SEO Tools", "Content Marketing", "Social Media"],
      content:
        "We optimize your online presence using proven SEO techniques and marketing strategies.",
    },
  };

  const service = details[serviceTitle] || {
    tech: [],
    content: "No details available for this service yet.",
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">{serviceTitle}</h2>
            <p className="lead text-muted">{service.content}</p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">Technologies We Use</h5>
              <ul className="list-group list-group-flush">
                {service.tech.map((tech, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{tech}</span>
                    <span className="badge bg-primary rounded-pill">✓</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {service.tech.length === 0 && (
            <div className="alert alert-warning mt-4">
              No technologies listed for this service yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
