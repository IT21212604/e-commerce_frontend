import React, { useState } from "react";
import Sidebar from "../NavBar/Sidebar"; // Import Sidebar component
import "./Register.css"; // Import custom CSS file

import { ToastContainer, toast } from 'react-toastify';
import Service from "../../Services/Service";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default user type

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleValidationErrorMsg(msg){
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }

  function handleRegister(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (name === '' || email === '' || password === '' || userType === '') {
      handleValidationErrorMsg('Inputs cannot be empty');
      return;
    }

    Service.register(name, email, password, userType) // Pass the correct parameters
      .then((res) => {
        // Check if registration was successful
        if (res.status === 200 || res.data.success) {
          toast.success('Registration successful! Redirecting to login...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          handleValidationErrorMsg('Registration failed. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        handleValidationErrorMsg('Registration failed. Please try again.');
      });
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <ToastContainer />

      {/* Registration Form */}
      <div
        className={`register-container container mt-5 ${
          isSidebarOpen ? "with-sidebar" : ""
        }`}
      >
        <div className="register-form shadow-lg p-5 rounded">
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select
                className="form-control"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
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


