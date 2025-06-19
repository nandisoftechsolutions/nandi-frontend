import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServiceDetails.css"; // Custom scoped CSS

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
    <div className="service-details-container container py-5">
      <h2 className="service-details-heading text-gradient">
        {serviceTitle}
      </h2>

      <p className="service-details-description lead">
        {service.content}
      </p>

      <div className="service-details-card card mt-4">
        <h5 className="service-details-tech-title">
          Technologies We Use:
        </h5>
        <ul className="list-group list-group-flush">
          {service.tech.map((tech, i) => (
            <li key={i} className="list-group-item service-details-list-item">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServiceDetails;
