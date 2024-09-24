import React, { useState } from 'react';
import Sidebar from '../NavBar/Sidebar'; // Import Sidebar component
import axios from 'axios';
import './Register.css';  // Import custom CSS file

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Customer', // Default user type
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData); // Adjust API route
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Registration Form */}
      <div className={`register-container container mt-5 ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="register-form shadow-lg p-5 rounded">
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select
                className="form-control" name="userType" value={formData.userType} onChange={handleChange} required
              >
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
