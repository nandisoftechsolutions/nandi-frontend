// ==== TeamPage.jsx ====
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamPage.css';

const TeamPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const res = await axios.get(`${baseURL}/api/team`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeam();
  }, []);

  const groupedMembers = members.reduce((acc, member) => {
    const department = member.department || 'Others';
    if (!acc[department]) acc[department] = [];
    acc[department].push(member);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">Our Company Team</h2>

      {Object.entries(groupedMembers).map(([department, deptMembers]) => (
        <div key={department} className="mb-5">
          <h3 className="text-secondary fw-semibold mb-4">{department}</h3>
          <div className="row g-4">
            {deptMembers.map((member) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={member.id}>
                <div className="card team-card text-center h-100 shadow-sm border-0 p-3">
                  <img
                    src={member.photo_url}
                    alt={`${member.name}'s photo`}
                    className="rounded-circle mx-auto mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '3px solid #0d6efd',
                    }}
                    loading="lazy"
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
                        rel="noopener noreferrer"
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
