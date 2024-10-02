import React, { useState } from "react";
import Sidebar from "../NavBar/Sidebar"; // Import Sidebar component
import "./Register.css"; // Import custom CSS file
import { ToastContainer, toast } from 'react-toastify';
import Service from "../../Services/Service";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import icons

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Email format validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password format validation (at least 8 characters, 1 number, 1 special character)
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
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

    // Validate inputs
    if (name === '' || email === '' || password === '' || userType === '') {
      handleValidationErrorMsg('Inputs cannot be empty');
      return;
    }
    
    if (!isValidEmail(email)) {
      handleValidationErrorMsg('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      handleValidationErrorMsg('Password must be at least 6 characters long, contain at least 1 number, and 1 special character.');
      return;
    }

    Service.register(name, email, password, userType)
      .then((res) => {
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <ToastContainer />

      {/* Registration Form */}
      <div className={`register-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
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
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="password-toggle-icon" 
                  onClick={togglePasswordVisibility} 
                />
              </div>
              <small className="text-muted">Password must be at least 6 characters, with 1 number and 1 special character.</small>
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
                <option value="">Select User Type</option>
                <option value="Administrator">Administrator</option>
                <option value="Vendor">Vendor</option>
                <option value="CSR">CSR</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          {/* Section to redirect to login */}
          <div className="mt-4 text-center">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
