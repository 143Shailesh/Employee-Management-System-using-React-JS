import axios from "axios";
import React, { useEffect, useState } from "react";
import "./employee.css";

const Employee = () => {
  // Separate states for each input field
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [qualification, setQualification] = useState("");
  const [religion, setReligion] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [editId, setEditId] = useState(null); // For tracking the entity being edited

  // Fetch all Employee entities from the backend
  const fetchEmployees = () => {
    axios.get("http://localhost:8080/api/employees") // Updated endpoint
      .then(response => setEmployeeList(response.data))
      .catch(error => console.error("There was an error fetching the employee list!", error));
  };

  // Handle form submission for creating/updating an employee
  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      id: editId,  // Include the editId in the body if it's an update
      name,
      address,
      country,
      state,
      qualification,
      religion,
    };

    if (editId) {
      // Update existing employee, passing id in the URL
      axios.put(`http://localhost:8080/api/employees/${editId}`, employee)
        .then(() => {
          fetchEmployees();
          resetForm();
        })
        .catch(error => console.error("There was an error updating the employee!", error));
    } else {
      // Create new employee
      axios.post("http://localhost:8080/api/employees", employee)
        .then(() => {
          fetchEmployees();
          resetForm();
        })
        .catch(error => console.error("There was an error creating the employee!", error));
    }
  };

  // Edit an employee
  const handleEdit = (employee) => {
    setEditId(employee.id);
    setName(employee.name);
    setAddress(employee.address);
    setCountry(employee.country);
    setState(employee.state);
    setQualification(employee.qualification);
    setReligion(employee.religion);
  };

  // Delete an employee
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(error => console.error("There was an error deleting the employee!", error));
  };

  // Reset the form fields
  const resetForm = () => {
    setEditId(null);
    setName("");
    setAddress("");
    setCountry("");
    setState("");
    setQualification("");
    setReligion("");
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
        />
        <input
          type="text"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          placeholder="Qualification"
          required
        />
        <input
          type="text"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          placeholder="Religion"
          required
        />
        <button type="submit">
          {editId ? "Update Employee" : "Create Employee"}
        </button>
      </form>

      <h3>Employee List</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Country</th>
            <th>State</th>
            <th>Qualification</th>
            <th>Religion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.address}</td>
              <td>{employee.country}</td>
              <td>{employee.state}</td>
              <td>{employee.qualification}</td>
              <td>{employee.religion}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
