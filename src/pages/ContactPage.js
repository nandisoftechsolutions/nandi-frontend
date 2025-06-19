import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name && user.email) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('👉 Sending:', formData);
  try {
    const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.data.success) {
        alert("✅ Your query submitted successfully!");
        setFormData((prev) => ({
          ...prev,
          subject: "",
          message: "",
        }));
      } else {
        alert("❌ Failed to submit your message.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Try again later.");
    }
  };

  const contactInfo = {
    address: "Nandi Softech Solutions, Vijayapura, Karnataka",
    email: "nandisoftechsolution.com",
    phone: "+91 8152853260",
    socials: {
      facebook: "https://www.facebook.com",
      youtube: "https://www.youtube.com",
      instagram: "https://www.instagram.com",
    },
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${require("../assets/bgimage/contct.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        
      </div>

      {/* Contact Form and Info */}
      <div className="container my-5">
        <p className="lead">
            We'd love to hear from you! Reach out for any questions, support, or collaboration.
          </p>
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white">
              <h3 className="mb-4">Get In Touch</h3>

              {!isLoggedIn ? (
                <p className="text-danger">🔒 Please login to send a message.</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white">
              <h3 className="mb-4">Contact Information</h3>
              <p>
                <i className="bi bi-geo-alt info-icon"></i>
                <strong>Address:</strong> {contactInfo.address}
              </p>
              <p>
                <i className="bi bi-envelope info-icon"></i>
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p>
                <i className="bi bi-telephone info-icon"></i>
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <hr />
              <h5>Follow Us</h5>
              <a href={contactInfo.socials.facebook} className="btn btn-outline-primary btn-sm me-2">
                <i className="bi bi-facebook me-1"></i>Facebook
              </a>
              <a href={contactInfo.socials.youtube} className="btn btn-outline-danger btn-sm me-2">
                <i className="bi bi-youtube me-1"></i>YouTube
              </a>
              <a href={contactInfo.socials.instagram} className="btn btn-outline-info btn-sm">
                <i className="bi bi-instagram me-1"></i>Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="container-fluid px-0">
        <iframe
  className="w-100 border-0"
  height="450"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://maps.google.com/maps?q=Vijayapura,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
  title="Vijayapura Map"
/>

      </div>
    </div>
  );
};

export default ContactPage;
