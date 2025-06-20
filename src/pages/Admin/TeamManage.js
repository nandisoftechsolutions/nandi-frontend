import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TeamManage.css';
import AdminNavbar from './Components/AdminNavbar';
import BASE_URL from '../../api';

const departments = ['Management', 'Engineering', 'Marketing', 'Sales', 'Design', 'HR', 'Support', 'Leadership'];
const roles = ['Developer', 'Designer', 'Manager', 'Engineer', 'Lead', 'CEO', 'CTO', 'CMO'];

const TeamManage = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [newMember, setNewMember] = useState({
    name: '', role: '', bio: '', department: '', email: '', linkedin: '', is_founder: false, is_cofounder: false, photo_url: ''
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);

  const fetchMembers = () => {
    axios.get(`${BASE_URL}/api/team`)
      .then(res => setMembers(res.data))
      .catch(err => console.error('Error fetching team data:', err));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    setUploading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/team/upload`, formData);
      setNewMember(prev => ({ ...prev, photo_url: res.data.photo_url }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Photo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    const method = editId ? 'put' : 'post';
    const url = editId ? `${BASE_URL}/api/team/${editId}` : `${BASE_URL}/api/team`;

    axios[method](url, newMember)
      .then(() => {
        fetchMembers();
        setNewMember({
          name: '', role: '', bio: '', department: '', email: '', linkedin: '',
          is_founder: false, is_cofounder: false, photo_url: ''
        });
        setEditId(null);
      })
      .catch(err => alert('Error saving team member'));
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`${BASE_URL}/api/team/${id}`)
        .then(() => fetchMembers())
        .catch(err => alert('Delete failed'));
    }
  };

  const grouped = members.reduce((acc, member) => {
    const dept = member.department || 'Others';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  const filteredDepartments = Object.keys(grouped).filter(dept =>
    filterDept === 'All' || dept === filterDept
  );

  return (
    <div className="container py-5">
      <AdminNavbar />
      <br/>
      <br/>
      <h2 className="text-center mb-4 text-primary">Company Team Management</h2>

      <div className="card p-4 shadow-sm mb-4" ref={formRef}>
        <h5 className="mb-3">{editId ? 'Edit' : 'Add'} Team Member</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input className="form-control" placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
          </div>
          <div className="col-md-6">
            <select className="form-select" value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })}>
              <option value="">Select Role</option>
              {roles.map(role => <option key={role}>{role}</option>)}
            </select>
          </div>
          <div className="col-md-12">
            <textarea className="form-control" placeholder="Bio" value={newMember.bio} onChange={e => setNewMember({ ...newMember, bio: e.target.value })}></textarea>
          </div>
          <div className="col-md-6">
            <select className="form-select" value={newMember.department} onChange={e => setNewMember({ ...newMember, department: e.target.value })}>
              <option value="">Select Department</option>
              {departments.map(dep => <option key={dep}>{dep}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Email" value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="LinkedIn URL" value={newMember.linkedin} onChange={e => setNewMember({ ...newMember, linkedin: e.target.value })} />
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" onChange={handlePhotoUpload} disabled={uploading} />
            {uploading && <small className="text-muted">Uploading...</small>}
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="founder" checked={newMember.is_founder} onChange={e => setNewMember({ ...newMember, is_founder: e.target.checked })} />
              <label className="form-check-label" htmlFor="founder">Founder</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="cofounder" checked={newMember.is_cofounder} onChange={e => setNewMember({ ...newMember, is_cofounder: e.target.checked })} />
              <label className="form-check-label" htmlFor="cofounder">Co-Founder</label>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100" onClick={() => {
              handleSubmit();
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
            }}>{editId ? 'Update' : 'Save'} Member</button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input type="text" className="form-control" placeholder="Search by name or role" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-6 mb-2">
          <select className="form-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="All">All Departments</option>
            {Object.keys(grouped).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredDepartments.map(dept => (
        <div key={dept} className="mb-5">
          <h4 className="text-secondary border-bottom pb-2">{dept}</h4>
          <div className="row">
            {grouped[dept]
              .filter(member =>
                member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.role.toLowerCase().includes(search.toLowerCase())
              )
              .map(member => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={member.id}>
                  <div className="card team-card text-center p-3 h-100 shadow-sm">
                    <img
                      src={`${BASE_URL}/uploads/${member.photo_url || 'default-user.jpg'}`}
                      alt={member.name}
                      className="rounded-circle mx-auto mb-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #0d6efd' }}
                    />
                    <div className="card-body">
                      <h6>{member.name}</h6>
                      <p className="text-muted small mb-1">{member.role}</p>
                      <small className="d-block text-truncate">{member.bio}</small>
                      {member.linkedin && <a href={member.linkedin} className="btn btn-outline-primary btn-sm mt-2" target="_blank" rel="noreferrer">LinkedIn</a>}
                      <div className="mt-2">
                        {member.is_founder && <span className="badge bg-success me-1">Founder</span>}
                        {member.is_cofounder && <span className="badge bg-warning text-dark">Co-Founder</span>}
                      </div>
                      <div className="mt-3 d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-outline-warning" onClick={() => {
                          setNewMember({ ...member });
                          setEditId(member.id);
                          formRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(member.id)}>Delete</button>
                      </div>
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

export default TeamManage;
