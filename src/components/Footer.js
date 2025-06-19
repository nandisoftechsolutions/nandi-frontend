import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">
        {/* Admin Login */}
        <div className="text-center mb-4">
          <NavLink to="/AdminLogin">
            <button className="btn btn-outline-light px-4 py-2">
              <i className="bi bi-lock-fill me-2"></i> Admin Login
            </button>
          </NavLink>
        </div>

        <hr className="bg-light" />

        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Nandi Softech Solutions</h5>
            <p className="small">
              Empowering Digital Dreams — we specialize in software development, automation testing, and tech education.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-light">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-light">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-light">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-light">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="footer-link d-block py-1">Home</NavLink></li>
              <li><NavLink to="/about" className="footer-link d-block py-1">About Us</NavLink></li>
              <li><NavLink to="/services" className="footer-link d-block py-1">Services</NavLink></li>
              <li><NavLink to="/projects" className="footer-link d-block py-1">Projects</NavLink></li>
              <li><NavLink to="/contact" className="footer-link d-block py-1">Contact</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Our Services</h6>
            <ul className="list-unstyled">
              <li className="py-1">Web Development</li>
              <li className="py-1">Mobile Apps</li>
              <li className="py-1">Automation Testing</li>
              <li className="py-1">AI Solutions</li>
              <li className="py-1">Tech Workshops</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Newsletter</h6>
            <p className="small">Stay updated with our latest innovations.</p>
            <form className="d-flex">
              <input type="email" className="form-control me-2" placeholder="Your email" />
              <button type="submit" className="btn btn-outline-light">Subscribe</button>
            </form>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="text-center small mt-3">
          © {new Date().getFullYear()} Nandi Softech Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
