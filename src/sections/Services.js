import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ServicesSection.css";

const Services = () => {
  const navigate = useNavigate();

  const servicesList = [
    {
      icon: "🌐",
      title: "Website Development",
      description: "Fast, responsive websites using modern technologies.",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Apps for Android and iOS with smooth UX.",
    },
    {
      icon: "💻",
      title: "Software Solutions",
      description: "Custom-built software for business needs.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Clean and intuitive designs for all platforms.",
    },
    {
      icon: "📈",
      title: "SEO & Marketing",
      description: "Boost your online presence and reach.",
    },
  ];

  const handleCardClick = (serviceTitle) => {
    navigate("/service-details", { state: { serviceTitle } });
  };

  return (
    <section className="services-container py-5 px-3">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 className="services-heading mb-2">Our Services</h2>
          <p className="services-subtext">
            We offer high-quality, modern, and tailored digital solutions for your business growth.
          </p>
        </div>
      </div>

      <div className="row justify-content-center gy-4">
        {servicesList.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
          >
            <div
              className="service-card text-center p-3 rounded-3 shadow-sm w-100 h-100"
              role="button"
              onClick={() => handleCardClick(title)}
              onKeyDown={(e) => e.key === "Enter" && handleCardClick(title)}
              tabIndex={0}
            >
              <div className="service-icon fs-3 mb-2">{icon}</div>
              <h6 className="fw-semibold">{title}</h6>
              <p className="text-muted small">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
