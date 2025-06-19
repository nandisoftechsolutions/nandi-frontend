// ==== TeamPage.jsx ====
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeamPage.css';

const TeamPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/team')
      .then(res => setMembers(res.data))
      .catch(err => console.error('Error fetching team data:', err));
  }, []);

  const grouped = members.reduce((acc, member) => {
    const dept = member.department || 'Others';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Our Company Team</h2>
      {Object.keys(grouped).map(dept => (
        <div key={dept} className="mb-5">
          <h3 className="text-secondary mb-3">{dept}</h3>
          <div className="row">
            {grouped[dept].map(member => (
              <div className="col-md-4 col-lg-3 mb-4" key={member.id}>
                <div className="card team-card text-center p-3">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="rounded-circle mx-auto mb-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #0d6efd' }}
                  />
                  <div className="card-body">
                    <h5>{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                    <small>{member.bio}</small><br />
                    {member.linkedin && <a href={member.linkedin} className="btn btn-outline-primary btn-sm mt-2" target="_blank" rel="noreferrer">LinkedIn</a>}
                    {member.is_founder && <span className="badge bg-success mt-2 d-block">Founder</span>}
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