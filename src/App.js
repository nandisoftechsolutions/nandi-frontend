import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Portfolio from './pages/Portfolio';
import Careers from './pages/Careers';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/ContactPage';
import PlaceOrder from './pages/PlaceOrder';
import VideoLearning from './pages/VideoLearning';
import VideoDetails from './pages/VideoDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import TeamPage from './pages/TeamPage';
import CourseDetails from './pages/CourseDetails';
import ThankYou from './pages/ThankYou';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserDetails from './pages/UserDetails';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderManagement from './pages/Admin/OrderManagement';
import ManageJobs from './pages/Admin/manageJobs';
import ProjectManager from './pages/Admin/ProjectManager';
import ManageVideoLearning from './pages/Admin/manageVideoLearning';
import ManageBlogs from './pages/Admin/manageBlogs';
import TeamManage from './pages/Admin/TeamManage';
import ManageMassage from './pages/Admin/ManageMassage';
import ManageUser from './pages/Admin/ManageUser';
import ManageAdmin from './pages/Admin/ManageAdmin';
import TeacherLogin from './pages/TeacherLogin';
import TeacherManage from './pages/Admin/TeacherManage';

import './App.css';

// Optional: Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { pathname } = useLocation();

  // Admin routes prefix for checking
  const isAdminRoute = pathname.startsWith('/admin') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/manage') ||
    pathname.startsWith('/projectmanager') ||
    pathname.startsWith('/teammanage') ||
    pathname.startsWith('/teacherslogin') ||
    pathname.startsWith('/manageteachers');

  return (
    <>
      <ScrollToTop />

      {/* Show Header/Navbar/Footer only for non-admin paths */}
      {!isAdminRoute && (
        <div className="overlay-wrapper">
          <Header />
          <Navbar />
        </div>
      )}

      <div className="page-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-details" element={<ServiceDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/learn" element={<VideoLearning />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/learn/:id" element={<VideoDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teampage" element={<TeamPage />} />
          <Route path="/course/:courseSlug/coursedetails" element={<CourseDetails />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user-details" element={<UserDetails />} />

          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/managejobs" element={<ManageJobs />} />
          <Route path="/projectmanager" element={<ProjectManager />} />
          <Route path="/managevideolearning" element={<ManageVideoLearning />} />
          <Route path="/manageblogs" element={<ManageBlogs />} />
          <Route path="/teammanage" element={<TeamManage />} />
          <Route path="/managemassage" element={<ManageMassage />} />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/manageadmins" element={<ManageAdmin />} />
          <Route path="/teacherslogin" element={<TeacherLogin />} />
          <Route path="/manageteachers" element={<TeacherManage />} />

          {/* Fallback - 404 */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </div>

      {/* Footer only for non-admin routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
