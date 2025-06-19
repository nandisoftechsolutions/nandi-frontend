import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser(storedUsername);
    }

    const handleUserUpdate = () => {
      setUser(localStorage.getItem('username'));
    };

    window.addEventListener('userLogin', handleUserUpdate);
    window.addEventListener('userLogout', handleUserUpdate);

    return () => {
      window.removeEventListener('userLogin', handleUserUpdate);
      window.removeEventListener('userLogout', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    setUser(null);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/contact', label: 'Contact' },
    { to: '/learn', label: 'Learn' },
    { to: '/careers', label: 'Careers', isButton: true },
    
    ...(!user ? [{ to: '/login', label: 'Login' }] : []),
      
  ];

  return (
    <nav className={`main-navbar ${isScrolled ? 'fixed' : ''} ${isHomePage ? 'white-navbar' : ''}`}>
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
            <div className="logo-mask me-2">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </div>
            <div className="brand-text text-center">
              <h4 className="brand-main">NANDI</h4>
              <small className="brand-sub">SOFTECH SOLUTIONS</small>
            </div>
          </NavLink>
        </div>

        <div className="menu-toggle d-lg-none" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links d-lg-flex align-items-center ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(({ to, label, isButton }) => (
            <NavLink
              key={to}
              to={to}
              className={isButton ? 'btn btn-outline-dark btn-sm ms-lg-2 mt-2 mt-lg-0' : 'nav-link ms-lg-3 mt-2 mt-lg-0'}
              onClick={toggleMenu}
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <>
              <button
                className="nav-link btn btn-link text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="user-info ms-3 mt-2 mt-lg-0">
                <span className="badge bg-primary">Hi, {user}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
