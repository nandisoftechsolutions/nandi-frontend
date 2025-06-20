import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    salary_range: '',
    job_type: '',
    interview_type: '',
    exp_level: '',
  });
  const [applicationsCount, setApplicationsCount] = useState({});
  const [allApplicants, setAllApplicants] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/jobs`);
      const jobsData = res.data;
      setJobs(jobsData);

      const countResults = await Promise.all(
        jobsData.map(async (job) => {
          try {
            const countRes = await axios.get(`${BASE_URL}/api/jobs/${job.id}/applications/count`);
            return { jobId: job.id, count: countRes.data.count };
          } catch {
            return { jobId: job.id, count: 0 };
          }
        })
      );

      const countsMap = countResults.reduce((acc, { jobId, count }) => {
        acc[jobId] = count;
        return acc;
      }, {});
      setApplicationsCount(countsMap);

      const allApps = await Promise.all(
        jobsData.map((job) =>
          axios.get(`${BASE_URL}/api/jobs/${job.id}/applications`).then((res) =>
            res.data.map((app) => ({
              ...app,
              job_title: job.title,
              job_location: job.location,
              salary_range: job.salary_range,
              job_type: job.job_type,
            }))
          )
        )
      );

      setAllApplicants(allApps.flat());
    } catch (error) {
      console.error('Error loading jobs/applicants:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJobId) {
        await axios.put(`${BASE_URL}/api/jobs/${editingJobId}`, jobForm);
      } else {
        await axios.post(`${BASE_URL}/api/jobs`, jobForm);
      }
      fetchJobs();
      resetForm();
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const resetForm = () => {
    setJobForm({
      title: '',
      description: '',
      location: '',
      salary_range: '',
      job_type: '',
      interview_type: '',
      exp_level: '',
    });
    setEditingJobId(null);
    setFormVisible(false);
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${BASE_URL}/api/jobs/${jobId}`);
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const handleEdit = (job) => {
    setJobForm({ ...job });
    setEditingJobId(job.id);
    setFormVisible(true);
  };

  const handleStatusChange = async (applicantId, status) => {
    try {
      await axios.patch(`${BASE_URL}/api/applicants/${applicantId}/status`, { status });
      fetchJobs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-5">
        <div className="mb-5">
          <h2 className="text-center mb-4">All Job Applicants</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Applicant Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Job Type</th>
                  <th>Applied At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allApplicants.length > 0 ? (
                  allApplicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>{applicant.applicant_name}</td>
                      <td>{applicant.applicant_email}</td>
                      <td>{applicant.applicant_phone}</td>
                      <td>{applicant.job_title}</td>
                      <td>{applicant.job_location}</td>
                      <td>{applicant.salary_range}</td>
                      <td>{applicant.job_type}</td>
                      <td>{new Date(applicant.applied_at).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="form-select"
                          value={applicant.status}
                          onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No applicants found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <h1 className="text-center text-primary fw-bold mb-4">Manage Job Openings</h1>
        <div className="row g-4 mb-5">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-6 col-lg-4">
              <div className="p-4 shadow rounded bg-white">
                <h5 className="text-primary fw-bold">{job.title}</h5>
                <p>{job.description}</p>
                <p className="text-muted">{job.location}</p>
                <p className="text-muted">Applications: {applicationsCount[job.id] || 0}</p>
                <button className="btn btn-outline-secondary me-2" onClick={() => handleEdit(job)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mb-4" onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? 'Cancel' : 'Add New Job'}
        </button>

        {formVisible && (
          <section className="mb-5">
            <h2 className="text-center mb-4">{editingJobId ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
              {['title', 'location', 'salary_range', 'job_type', 'interview_type', 'exp_level'].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">{field.replace('_', ' ')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={jobForm[field]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  required
                  value={jobForm.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                {editingJobId ? 'Update Job' : 'Submit Job'}
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
}

export default ManageJobs;
