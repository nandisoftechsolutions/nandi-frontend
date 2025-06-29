import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import './Careers.css'; 
import BASE_URL from '../api';

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', jobId: '', resume: null });
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/jobs`);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('jobId', formData.jobId);
    form.append('resume', formData.resume);

    try {
      await axios.post(`${BASE_URL}/api/applications/apply`, form);
      setSubmitMessage('✅ Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', jobId: '', resume: null });
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
      setSubmitMessage('❌ Submission failed. Please try again.');
    }
  };

  return (
    <div className="container py-5 careers-page">
      <Helmet>
        <title>Careers at Nandi Softech Solutions</title>
        <meta
          name="description"
          content="Explore exciting job opportunities at Nandi Softech Solutions. Join us to build your future in tech."
        />
      </Helmet>

      <br/>
      <h1 className="text-center text-primary fw-bold mb-4">Join Our Team</h1>
      <p className="text-center text-muted mb-5">
        Explore exciting opportunities to work with Nandi Softech Solutions.
      </p>

      {loading && (
        <div className="text-center py-5 fs-4 text-muted">Loading opportunities...</div>
      )}

      {error && (
        <div className="alert alert-danger text-center py-5">{error}</div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-5 fs-5 text-muted">
          🚀 No job openings at the moment. Please check back soon!
        </div>
      )}

      {/* Job Cards */}
      <div className="row g-4 mb-5">
        {jobs.map((job) => (
          <div key={job.id} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-dark">{job.title}</h5>
                  <p className="card-text text-secondary small">{job.description}</p>
                  <p className="text-muted mb-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>{job.location}
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-outline-primary w-100 mt-auto"
                  onClick={() => {
                    setSelectedJob(job);
                    setFormData((prev) => ({ ...prev, jobId: job.id }));
                    setSubmitMessage('');
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {selectedJob && (
        <section className="application-form border-top pt-5">
          <h2 className="text-center text-dark mb-4">
            Apply for <span className="text-primary">{selectedJob.title}</span>
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mx-auto bg-white shadow rounded p-4"
            style={{ maxWidth: '600px' }}
            encType="multipart/form-data"
          >
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Upload Resume</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
                {formData.resume && (
                  <small className="text-muted d-block mt-1">
                    📎 {formData.resume.name}
                  </small>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Submit Application
            </button>
            {submitMessage && (
              <div className="alert alert-info text-center mt-3">{submitMessage}</div>
            )}
          </form>
        </section>
      )}
    </div>
  );
}

export default Careers;
