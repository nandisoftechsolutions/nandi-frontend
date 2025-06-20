import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';


const ThankYou = () => {
  const location = useLocation();
  const courseTitle = location.state?.courseTitle || 'your selected course';

  return (
    <>
    <br/>
    <br/>
   <br/>
    <br/>
 
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
     
      <motion.div
        className="card shadow-lg p-4 rounded-4 w-100"
        style={{ maxWidth: '600px', textAlign: 'center' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaCheckCircle className="text-success display-3 mb-3" />

        <h2 className="fw-bold text-success mb-3">Thank You for Your Purchase!</h2>

        <p className="text-muted fs-5 mb-4">
          Your subscription has been activated successfully. We're thrilled to welcome you to our
          learning family at <strong>Nandi Softech Solutions</strong>.
        </p>

        <p className="text-muted mb-4">
          Thank you for enrolling in <strong>{courseTitle}</strong>!
        </p>

        <hr className="my-4" />

        <div className="text-start">
          <h4 className="fw-bold mb-2 text-primary">About Us</h4>
          <p className="text-muted small">
            <strong>Nandi Softech Solutions</strong> is a growing software company focused on empowering students,
            professionals, and educators through cutting-edge technology and practical learning platforms.
            Our mission is to make quality tech education accessible to everyone, with lifetime access and
            real-world projects.
          </p>
          <p className="text-muted small">
            Whether you're a beginner or a seasoned learner, we provide curated courses,
            personalized mentorship, and lifetime updates — because we believe learning never ends.
          </p>
        </div>

        <Link to="/" className="btn btn-success mt-4 px-4 py-2 fw-semibold">
          Go to Home
        </Link>
      </motion.div>
    </div>
    </>
  );
};

export default ThankYou;
