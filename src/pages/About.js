import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./About.css";
import steveJobsImage from "../assets/sections/stevjobs.png";
import BASE_URL from "../api";

function About() {
  const [teamMembers, setTeamMembers] = useState([]);

  const timeline = [
    { year: "2015", event: "Company founded" },
    { year: "2017", event: "Launched first mobile app" },
    { year: "2019", event: "Expanded to digital marketing" },
    { year: "2022", event: "Crossed 100+ projects" },
  ];

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/teammembers`);
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="container py-5">
      <Helmet>
        <title>About | Nandi Softech Solutions</title>
        <meta
          name="description"
          content="Learn more about Nandi Softech Solutions — our mission, vision, history, and dedicated leadership team building software, testing, and training future developers."
        />
      </Helmet>

      <h1 className="text-center fw-bold text-primary display-4 mb-3">
        About Nandi Softech Solutions
      </h1>
      <p className="lead text-center text-muted fst-italic mb-5">
        Empowering Digital Dreams, One Line of Code at a Time
      </p>

      <div className="row mb-5 align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src={steveJobsImage}
            alt="Vision Illustration"
            className="img-fluid rounded-4 shadow-lg w-100"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="text-primary mb-4">Our Mission & Vision</h2>
          <p className="fs-5">
            To bridge the gap between innovation and implementation. We empower
            businesses and individuals by delivering smart, scalable, and
            sustainable technology solutions, while nurturing future tech minds
            through education.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <h2 className="text-center text-primary mb-4">Company Timeline</h2>
          <div className="timeline bg-light p-4 rounded-4 shadow-sm">
            {timeline.map(({ year, event }, index) => (
              <div
                key={index}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <strong>{year}</strong>
                <span>{event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary text-white text-center p-5 rounded-4 shadow-lg mb-5">
        <h3 className="fst-italic mb-3">
          A Message from Our Founder – Arjun Sir
        </h3>
        <blockquote className="fs-5 mb-0">
          “I believe true innovation lies not only in creating new things but in
          empowering people through technology.”
        </blockquote>
      </div>

      <div className="text-center">
        <p className="fs-5 mb-4">
          Whether you're a business owner looking for reliable tech solutions or
          a student with a dream of learning to code — we’re here for you.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <a
            href="mailto:contact@nandisoftech.com"
            className="btn btn-outline-primary btn-lg"
          >
            Email us
          </a>
          <a href="tel:+911234567890" className="btn btn-primary btn-lg">
            Call us
          </a>
          <a href="/contact" className="btn btn-dark btn-lg">
            Join us
          </a>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 className="text-primary mb-4">Leadership Team</h2>
        <div className="row g-4 justify-content-center">
          {teamMembers.map(({ id, name, role, bio, photo_url }) => (
            <div key={id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                <img
                  src={`http://localhost:5000/uploads/${photo_url}`}
                  alt={`${name}`}
                  className="rounded-circle border border-3 border-primary mx-auto d-block"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-user.png";
                  }}
                  loading="lazy"
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">{name}</h5>
                  <p className="text-muted mb-2 fst-italic">{role}</p>
                  <p className="text-secondary small">{bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
