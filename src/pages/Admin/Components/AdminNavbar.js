import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import logo from '../../../assets/logo.png';


const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('userLogout'));
    navigate('/', { replace: true });
  };


  const scroll = (direction) => {
    const scrollAmount = 150;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/ManageUser', label: 'Users' },
    { to: '/manageadmins', label: 'Admins' },
    { to: '/manageteachers', label: 'Teachers' },
    { to: '/orders', label: 'Orders' },
    { to: '/ManageJobs', label: 'Jobs' },
    { to: '/ProjectManager', label: 'Projects' },
    { to: '/ManageVideoLearning', label: 'Videos' },
    { to: '/ManageBlogs', label: 'Blogs' },
    { to: '/manageMassage', label: 'Messages' },
    { to: '/TeamManage', label: 'Team' },
    { to: '/AddEmployee', label: 'Add Employee' },
    { to: '/EmployeeList', label: 'Employee List' },
    { to: '/LeaveList', label: 'Leave List' },
    { to: '/RequestLeave', label: 'Request Leave' },
    { to: '#', label: 'Logout', isLogout: true },
  ];

  return (
    <nav className={`mains-navbar ${isScrolled ? 'fixed' : ''}`}>
      <div className="admin-navbar-wrapper d-flex align-items-center">
        {/* Brand */}
        <NavLink
          to="/admin/dashboard"
          className="navbar-brand d-flex align-items-center text-decoration-none me-3 flex-shrink-0"
        >
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          <div className="brands-text">
            <h4 className="brands-main mb-0">NANDI</h4>
            <small className="brands-sub">SOFTECH SOLUTIONS</small>
          </div>
        </NavLink>

        
        <div className="scrolls-buttons d-flex align-items-center w-100 overflow-hidden">
          <button
            className="scrolls-btn"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
          >
            &#8592;
          </button>

          <div
            className="scrolls-container d-flex flex-nowrap"
            ref={scrollRef}
          >
            {navLinks.map(({ to, label, isLogout }) =>
              isLogout ? (
                <button
                  key={label}
                  onClick={handleLogout}
                  className="navs-link text-danger px-3 py-2 border-0 bg-transparent"
                >
                  {label}
                </button>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `navs-link px-3 py-2 text-nowrap text-decoration-none ${
                      isActive ? 'active' : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              )
            )}
          </div>

          <button
            className="scrolls-btn"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
