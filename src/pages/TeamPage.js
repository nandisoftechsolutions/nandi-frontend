import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamPage.css';

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseURL}/api/team`);
        setMembers(response.data || []);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const groupedMembers = members.reduce((acc, member) => {
    const dept = member?.department?.trim() || 'Others';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">Meet Our Team</h2>

      {Object.entries(groupedMembers).map(([department, deptMembers]) => (
        <section key={department} className="mb-5">
          <h3 className="text-secondary fw-semibold mb-4">{department}</h3>
          <div className="row g-4">
            {deptMembers.map((member) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={member.id || member.name}>
                <div className="card h-100 shadow-sm border-0 text-center">
                  <img
                    src={member?.photo_url || '/default-user.png'}
                    alt={member?.name || 'Team Member'}
                    className="card-img-top team-photo mx-auto mt-3"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-user.png';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{member?.name || 'Unnamed'}</h5>
                    <p className="card-subtitle text-muted small">{member?.role || 'Team Member'}</p>
                    {member?.bio && (
                      <p className="card-text small text-secondary mt-2">{member.bio}</p>
                    )}
                    {member?.linkedin && (
                      <a
                        href={member.linkedin}
                        className="btn btn-sm btn-outline-primary mt-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member?.is_founder && (
                      <div className="badge bg-success mt-2">Founder</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TeamPage;
