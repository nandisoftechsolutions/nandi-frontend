import React from 'react';
import './Header.css';
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="tops-info-bar" id="topInfoBar">
     
      <div className="container-fluid d-flex justify-content-between align-items-center">

       
        <div className="admi d-flex align-items-center gap-3 left-info">
          <i className="info bi bi-geo-alt-fill"></i>
          <span >Vijayapura - 586101</span>
          <i className="info bi bi-telephone-fill ms-3"></i>
          <span>+91 81528 53260</span>
          <a href="/Adminlogin" className="admi btn btn-outline-danger btn-sm "><RiAdminFill/>Admin</a>
        </div>

       
        <div className="d-flex align-items-center gap-3 right-icons mt-2 mt-sm-0">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter-x"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
          <a href="/order" className="btn btn-outline-warning btn-sm">Request Quote</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
