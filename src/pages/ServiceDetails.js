import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServiceDetails.css";

function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { serviceTitle } = location.state || {};

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
      tech: [
        "Google Analytics",
        "SEO Tools",
        "Content Marketing",
        "Social Media",
      ],
      content:
        "We optimize your online presence using proven SEO techniques and marketing strategies.",
    },
  };

  // Fallback if route accessed directly
  if (!serviceTitle || !details[serviceTitle]) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger mb-3">Service Not Found</h2>
        <p>The service you're looking for doesn't exist or wasn't provided.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  const service = details[serviceTitle];

  return (
    <div className="container py-5">
      <Helmet>
        <title>{serviceTitle} | Nandi Softech</title>
        <meta
          name="description"
          content={`${serviceTitle} - ${service.content}`}
        />
      </Helmet>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">{serviceTitle}</h1>
            <p className="lead text-muted">{service.content}</p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">
                Technologies We Use
              </h5>
              <ul className="list-group list-group-flush">
                {service.tech.map((tech, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{tech}</span>
                    <span
                      className="badge bg-primary rounded-pill"
                      role="img"
                      aria-label="Supported technology"
                    >
                      ✓
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
