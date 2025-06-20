import React, { useState, useEffect } from "react";
import axios from "axios";
import contactBg from "../assets/bgimage/contct.png"; // ✅ Ensure this exists
import BASE_URL from "../api";

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
    if (user?.name && user?.email) {
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
    try {
      const res = await axios.post(`${BASE_URL}/api/contact`, formData);
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
    email: "nandisoftechsolution@gmail.com",
    phone: "+91 8152853260",
    socials: {
      facebook: "https://www.facebook.com",
      youtube: "https://www.youtube.com",
      instagram: "https://www.instagram.com",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          height: "60vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-3">
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">We’d love to hear from you!</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container my-5">
        <p className="lead text-center mb-4">
          Reach out for any questions, support, or collaboration.
        </p>
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-12 col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white h-100">
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
                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white h-100">
              <h3 className="mb-4">Contact Information</h3>
              <p><strong>📍 Address:</strong> {contactInfo.address}</p>
              <p><strong>📧 Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
              <p><strong>📞 Phone:</strong> <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
              <hr />
              <h5>Follow Us</h5>
              <div className="d-flex gap-2 flex-wrap">
                <a href={contactInfo.socials.facebook} className="btn btn-outline-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook me-1"></i> Facebook
                </a>
                <a href={contactInfo.socials.youtube} className="btn btn-outline-danger btn-sm" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube me-1"></i> YouTube
                </a>
                <a href={contactInfo.socials.instagram} className="btn btn-outline-info btn-sm" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram me-1"></i> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="container-fluid px-0">
        <iframe
          title="Vijayapura Map"
          src="https://maps.google.com/maps?q=Vijayapura,%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
