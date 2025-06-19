import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaves = async () => {
    const res = await axios.get('https://api.sheetbest.com/sheets/a577c969-f257-4a22-9897-8b882f72821c');
    setLeaveRequests(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (slno, newStatus) => {
    try {
      await axios.patch(`https://api.sheetbest.com/sheets/a577c969-f257-4a22-9897-8b882f72821c/Sl%20No./${slno}`, {
        Status: newStatus
      });
      alert(`Leave ${newStatus}`);
      fetchLeaves(); // Refresh data
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Leave Requests</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave, index) => (
            <tr key={index}>
              <td>{leave['Sl No.']}</td>
              <td>{leave.EmployeeID}</td>
              <td>{leave.Name}</td>
              <td>{leave['Leave Type']}</td>
              <td>{leave['From Date']}</td>
              <td>{leave['To Date']}</td>
              <td>{leave.Reason}</td>
              <td>{leave.Status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleStatusChange(leave['Sl No.'], 'Approved')}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleStatusChange(leave['Sl No.'], 'Rejected')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
