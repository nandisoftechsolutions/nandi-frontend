// ==== TeamPage.jsx ====
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamPage.css';
import BASE_URL from '../api';

const TeamPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/team`)
      .then((res) => setMembers(res.data))
      .catch((err) => console.error('Error fetching team data:', err));
  }, []);

  const grouped = members.reduce((acc, member) => {
    const dept = member.department || 'Others';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">Our Company Team</h2>

      {Object.keys(grouped).map((dept) => (
        <div key={dept} className="mb-5">
          <h3 className="text-secondary fw-semibold mb-4">{dept}</h3>
          <div className="row g-4">
            {grouped[dept].map((member) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={member.id}>
                <div className="card team-card text-center h-100 shadow-sm border-0 p-3">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="rounded-circle mx-auto mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '3px solid #0d6efd',
                    }}
                  />
                  <div className="card-body p-0">
                    <h5 className="fw-semibold mb-1">{member.name}</h5>
                    <p className="text-muted small mb-1">{member.role}</p>
                    <p className="small text-secondary">{member.bio}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="btn btn-sm btn-outline-primary mt-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.is_founder && (
                      <div className="badge bg-success mt-2">Founder</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamPage;
