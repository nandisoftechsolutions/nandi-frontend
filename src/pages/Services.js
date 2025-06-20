import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Services.css";

import servicesBg from "../assets/bgimage/servicesbg.png"; // ✅ FIXED

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
    <div>
      {/* Hero Section with background image */}
      <div
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${servicesBg})`, // ✅ FIXED
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 className="display-4 fw-bold">Our Services</h1>
          <p className="lead">
            Explore our digital expertise crafted for your business success.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-container container my-5">
        <div className="row justify-content-center mb-2">
          <div className="col-12 text-center">
            <h2 className="services-heading">What We Offer</h2>
            <p className="services-subtext">
              We provide high-quality, modern, and tailored digital solutions for your business growth.
            </p>
          </div>
        </div>

        <div className="row justify-content-center gap-3">
          {servicesList.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="service-card text-center p-3 rounded-3 shadow-sm"
              style={{
                width: "180px",
                flex: "0 0 auto",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(title)}
            >
              <div className="service-icon fs-3 mb-2">{icon}</div>
              <h6 className="fw-semibold">{title}</h6>
              <p className="text-muted small">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
