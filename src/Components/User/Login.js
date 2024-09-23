import React, { useState } from 'react';
import Sidebar from '../NavBar/Sidebar'; // Import Sidebar component
import axios from 'axios';
import './Register.css';  // Reusing the same CSS for consistent styling

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData); // Adjust API route
      console.log(response.data); // Handle success, maybe redirect or show a message
    } catch (error) {
      console.error(error); // Handle error, display an error message
    }
  };

  return (
    <>
      {/* Sidebar with toggle functionality */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className={`login-container container mt-5 ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="login-form shadow-lg p-5 rounded">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
