// frontend/src/pages/Admin/ManageUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './Components/AdminNavbar';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: '' });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Fetch Users Error:', error);
      setShowAlert({ show: true, message: 'Failed to load users', variant: 'danger' });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setShowAlert({ show: true, message: 'User deleted successfully', variant: 'success' });
        fetchUsers();
      } catch (error) {
        console.error('Delete Error:', error);
        setShowAlert({ show: true, message: 'Failed to delete user', variant: 'danger' });
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editUser.id}`, editUser);
      setEditUser(null);
      setShowAlert({ show: true, message: 'User updated successfully', variant: 'success' });
      fetchUsers();
    } catch (error) {
      console.error('Update Error:', error);
      setShowAlert({ show: true, message: 'Failed to update user', variant: 'danger' });
    }
  };

  return (
    <>
    <AdminNavbar/>
    
    <div className="container mt-4">
        <br/>
        <br/>
        <br/>
      <h2 className="mb-4 text-center">User Management</h2>

      {showAlert.show && (
        <Alert variant={showAlert.variant} onClose={() => setShowAlert({ ...showAlert, show: false })} dismissible>
          {showAlert.message}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => setEditUser({ ...user, password: '' })}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!editUser} onHide={() => setEditUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editUser?.name || ''}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editUser?.email || ''}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={editUser?.role || ''}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={editUser?.password || ''}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditUser(null)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default ManageUser;
