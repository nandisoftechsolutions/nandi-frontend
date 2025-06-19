import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://api.sheetbest.com/sheets/a83bd58e-805b-4a2a-aae9-a47ca48c3afc')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h3>Employee List</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp['Sl No.']}</td>
              <td>{emp.EmployeeID}</td>
              <td>{emp.Name}</td>
              <td>{emp.Role}</td>
              <td>{emp.Email}</td>
              <td>{emp.Phone}</td>
              <td>{emp['Join Date']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
