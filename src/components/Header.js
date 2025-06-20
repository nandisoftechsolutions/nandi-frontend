import React from 'react';
import './Header.css';
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="tops-info-bar" id="topInfoBar">
      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center py-1">
        {/* Left Info */}
        <div className="admi d-flex flex-wrap align-items-center gap-2 text-center text-sm-start">
          <i className="info bi bi-geo-alt-fill"></i>
          <span>Vijayapura - 586101</span>
          <i className="info bi bi-telephone-fill ms-sm-3"></i>
          <span>+91 81528 53260</span>
          <a href="/Adminlogin" className="admi btn btn-outline-danger btn-sm">
            <RiAdminFill /> Admin
          </a>
        </div>

        {/* Right Icons */}
        <div className="d-flex flex-wrap justify-content-center justify-content-sm-end align-items-center gap-2 mt-2 mt-sm-0">
          <a href="https://www.facebook.com/share/16WH81FP95/" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/nandisoftechsolution?igsh=cm5xNWk2eGJpbW54" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="/order" className="btn btn-outline-warning btn-sm">Request Quote</a>
        </div>
      </div>
    </div>
  );
};

export default Header;