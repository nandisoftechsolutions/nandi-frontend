import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import BASE_URL from '../api';

const CourseDetails = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        if (location.state?.courseData) {
          const courseId = location.state.courseData;
          const res = await axios.get(`${BASE_URL}/api/courses/byid/${courseId}`);
          setSelectedCourse(res.data);
        } else if (courseSlug) {
          const res = await axios.get(`${BASE_URL}/api/courses/${courseSlug}`);
          setSelectedCourse(res.data);
        } else {
          const res = await axios.get(`${BASE_URL}/api/courses`);
          setCourses(res.data);
        }
      } catch (err) {
        console.error('❌ Error fetching course(s):', err.message);
        setError('Course not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseSlug, location]);

  const handleBuyNow = async (course) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.email) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/courses/init-payment`, {
        courseId: course.id,
        username: user.name,
        email: user.email,
      });

      const options = {
        key: 'rzp_test_SO0yWkGNPJARIG',
        amount: res.data.amount,
        currency: 'INR',
        name: 'Nandi Softech Solutions',
        description: `Purchase ${course.title}`,
        order_id: res.data.orderId,
        handler: async function (response) {
          await axios.post(`${BASE_URL}/api/courses/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course.id,
            email: user.email,
          });

          alert('✅ Payment successful and subscription activated!');
          navigate('/thank-you', { state: { courseTitle: course.title } });
        },
        prefill: {
          email: user.email,
          name: user.name,
        },
        theme: {
          color: '#28a745',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Payment error:', err);
      alert('Failed to initiate payment.');
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <Helmet>
          <title>Course Not Found | Nandi Softech</title>
        </Helmet>
        <h4 className="text-danger">{error}</h4>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <>
        <Helmet>
          <title>{selectedCourse.title} | Nandi Softech Courses</title>
          <meta
            name="description"
            content={`Learn more about the course ${selectedCourse.title} at Nandi Softech Solutions. Get lifetime access today.`}
          />
        </Helmet>
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <img
                src={selectedCourse.thumbnail || 'https://via.placeholder.com/600x350?text=No+Image'}
                alt={selectedCourse.title}
                className="card-img-top img-fluid"
                style={{ height: '350px', objectFit: 'cover' }}
              />
              <div className="card-body p-4">
                <h2 className="card-title fw-bold mb-3">{selectedCourse.title}</h2>
                <p className="card-text text-muted">{selectedCourse.description}</p>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mt-4 gap-3">
                  <div className="text-success fw-bold fs-4">
                    ₹{selectedCourse.price} <span className="text-muted fs-6">(One-time)</span>
                  </div>
                  <button className="btn btn-success px-4" onClick={() => handleBuyNow(selectedCourse)}>
                    Buy Now
                  </button>
                </div>
                <p className="text-muted fst-italic mt-3 mb-0">
                  ✅ Lifetime access to all modules and future updates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Courses | Nandi Softech</title>
        <meta
          name="description"
          content="Browse a wide range of software development, design, and marketing courses at Nandi Softech Solutions."
        />
      </Helmet>
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">📚 All Courses</h2>
        <div className="row">
          {courses.map((course) => (
            <motion.div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card h-100 shadow rounded-4">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x250?text=No+Image'}
                  className="card-img-top img-fluid"
                  alt={course.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-uppercase">{course.title}</h5>
                  <p className="card-text text-muted">{course.description?.slice(0, 100)}...</p>
                  <div className="mt-auto d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                    <span className="text-success fw-bold">₹{course.price}</span>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(`/course/${course.title.toLowerCase().replace(/\s+/g, '-')}/coursedetails`)
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
