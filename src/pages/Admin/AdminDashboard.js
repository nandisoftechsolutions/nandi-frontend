// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from './Components/AdminNavbar';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminData, setAdminData] = useState({ name: 'Admin', photo: '' });
  const [stats, setStats] = useState({
    totalOrders: 0,
    openJobs: 0,
    applications: 0,
    projects: 0,
    messages: 0,
    admins: 0,
    users: 0,
    teammembers: 0,
    blogs: 0,
    coursevideos: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem('adminData'));
    if (savedAdmin) setAdminData(savedAdmin);

    const fetchDashboardData = async () => {
      try {
        const endpoints = [
          'total-orders',
          'open-jobs',
          'total-applications',
          'total-projects',
          'total-messages',
          'total-admins',
          'total-users',
          'total-teammembers',
          'total-blogs',
          'total-coursevideos',
        ];

        const results = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`http://localhost:5000/api/dashboard/${endpoint}`).then((res) => res.json())
          )
        );

        setStats({
          totalOrders: results[0].total || 0,
          openJobs: results[1].openJobs || 0,
          applications: results[2].total || 0,
          projects: results[3].total || 0,
          messages: results[4].total || 0,
          admins: results[5].total || 0,
          users: results[6].total || 0,
          teammembers: results[7].total || 0,
          blogs: results[8].total || 0,
          coursevideos: results[9].total || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { icon: 'bi-cart', title: 'Total Orders', count: stats.totalOrders, link: '/orders' },
    { icon: 'bi-briefcase-fill', title: 'Open Job Posts', count: stats.openJobs, link: '/manageJobs' },
    { icon: 'bi-person-lines-fill', title: 'Applications', count: stats.applications, link: '/manageJobs' },
    { icon: 'bi-kanban', title: 'Projects', count: stats.projects, link: '/ProjectManager' },
    { icon: 'bi-envelope-paper', title: 'Messages', count: stats.messages, link: '/messages' },
    { icon: 'bi-person-circle', title: 'Admins', count: stats.admins, link: '/manageadmins' },
    { icon: 'bi-people', title: 'Users', count: stats.users, link: '/manageusers' },
    { icon: 'bi-people-fill', title: 'My Team', count: stats.teammembers, link: '/manageteam' },
    { icon: 'bi-pencil-square', title: 'Blogs', count: stats.blogs, link: '/manageblogs' },
    { icon: 'bi-collection-play', title: 'Course Videos', count: stats.coursevideos, link: '/managevideos' },
  ];

  return (
    <>
      <AdminNavbar />
     <br/>
     <br/>
      <div className="dash-wrapper container-fluid py-5 bg-light min-vh-100">
        <div className="dash-header text-center mb-5">
          <h2 className="card fw-bold text-dark">Welcome to Admin Panel, <span className="text-primary">{adminData.name}</span></h2>
        </div>
        <div className="dash-container d-flex rounded shadow bg-white overflow-hidden">
          {!collapsed && (
            <aside className="dash-sidebar bg-gradient p-3 text-white border-end">
              <div className="dash-profile text-center mb-4">
                <img
                  src={adminData?.photo ? `http://localhost:5000${adminData.photo}` : '/assets/Admin.jpg'}
                  alt="Admin"
                  className="dash-profile-img rounded-circle border border-white shadow"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5 className="mt-3 fw-bold">{adminData.name}</h5>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/dashboard">
                    <i className="bi bi-speedometer2"></i> Dashboard Overview
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/orders">
                    <i className="bi bi-cart-check"></i> Order Management
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/manageJobs">
                    <i className="bi bi-briefcase"></i> Job Postings
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/ProjectManager">
                    <i className="bi bi-kanban"></i> Projects
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/ManageVideoLearning">
                    <i className="bi bi-collection-play"></i> Course Videos
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/manageBlogs">
                    <i className="bi bi-pencil-square"></i> Blogs
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/messages">
                    <i className="bi bi-envelope-open"></i> Messages
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/TeamManage">
                    <i className="bi bi-people-fill"></i> Team
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link text-white dash-link hover-light" to="/users">
                    <i className="bi bi-person-gear"></i> Admin Users
                  </Link>
                </li>
              </ul>
            </aside>
          )}

          <main className="dash-main p-4 flex-grow-1 bg-white">
            <div className="d-flex justify-content-end mb-4">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setCollapsed(!collapsed)}>
                <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
              </button>
            </div>
            <div className="row g-4">
              {cards.map((card, index) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div
                    className="dash-stat-card card border-0 shadow-sm h-100 hover-card"
                    onClick={() => navigate(card.link)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body text-center">
                      <i className={`bi ${card.icon} fs-1 text-gradient`}></i>
                      <h6 className="mt-3 fw-semibold">{card.title}</h6>
                      <p className="fs-5 fw-bold text-dark mb-0">{card.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
