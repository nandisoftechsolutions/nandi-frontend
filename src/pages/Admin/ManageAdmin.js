import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminNavbar from "./Components/AdminNavbar";
import BASE_URL from "../../api";

function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "", photo: null, photo_url: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAdmins = async () => {
    const res = await axios.get(`${BASE_URL}/api/admins`);
    setAdmins(res.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    if (editingId) {
      await axios.put(`${BASE_URL}/api/admins/${editingId}`, data);
    } else {
      await axios.post(`${BASE_URL}/api/admins`, data);
    }

    setFormData({ name: "", email: "", password: "", role: "", photo: null, photo_url: "" });
    setEditingId(null);
    setShowModal(false);
    fetchAdmins();
  };

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      photo: null,
      photo_url: admin.photo_url,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/admins/${id}`);
    fetchAdmins();
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h2 className="text-center text-primary mb-4">Admin Management</h2>

        <div className="table-responsive mb-4">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <img
                      src={`${BASE_URL}${admin.photo_url}`}
                      width="50"
                      className="rounded-circle border"
                      alt={admin.name}
                    />
                  </td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleEdit(admin)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(admin.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Admin
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingId ? "Edit Admin" : "Add Admin"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body row">
                    <div className="col-md-6 mb-2">
                      <input className="form-control" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input className="form-control" type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
                    </div>
                    <div className="col-md-12 mb-2">
                      <input className="form-control" type="file" name="photo" onChange={handleChange} />
                      {formData.photo_url && (
                        <img
                          src={`${BASE_URL}${formData.photo_url}`}
                          alt="Current"
                          className="img-thumbnail mt-2"
                          width="100"
                        />
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">{editingId ? "Update" : "Add"}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageAdmin;
