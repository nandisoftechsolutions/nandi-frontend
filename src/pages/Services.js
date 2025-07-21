import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Services.css";
import servicesBg from "../assets/bgimage/servicesbg.png";

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
    <>
      <Helmet>
        <title>Our Services | Nandi Softech</title>
        <meta
          name="description"
          content="Discover the range of digital services we offer, from websites to mobile apps, software solutions, UI/UX design, and SEO marketing."
        />
      </Helmet>

      {/* Hero Section */}
      <section
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${servicesBg})`,
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
      </section>

      {/* Services Section */}
      <section className="container my-5">
        <div className="row justify-content-center mb-4">
          <div className="col-12 text-center">
            <h2 className="services-heading fw-bold">What We Offer</h2>
            <p className="services-subtext text-muted">
              We provide high-quality, modern, and tailored digital solutions
              for your business growth.
            </p>
          </div>
        </div>

        <div className="row gy-4 justify-content-center">
          {servicesList.map(({ icon, title, description }, idx) => (
            <div
              key={title}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              role="button"
              aria-label={`Learn more about ${title}`}
              onClick={() => handleCardClick(title)}
              style={{ cursor: "pointer" }}
            >
              <div className="service-card text-center p-3 rounded-3 shadow-sm h-100">
                <div className="service-icon fs-2 mb-2" aria-hidden="true">
                  {icon}
                </div>
                <h6 className="fw-semibold">{title}</h6>
                <p className="text-muted small">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
