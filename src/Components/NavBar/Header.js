import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Header.css'; // Import the CSS file for styling

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to different pages
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <header className="header">
      <div className="left-section">
        <div className="menu-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="sidebar-logo">
          <h2>Sellforce</h2>
          <p>Your Sales Solution</p>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-primary" onClick={() => handleNavigation('/dashboard')}>
          Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => handleNavigation('/viewUser')}>
          User Details
        </button>
        <button className="btn btn-primary" onClick={() => handleNavigation('/orderList')}>
          Order Details
        </button>
        <button className="btn btn-primary" onClick={() => handleNavigation('/productDetails')}>
          Product Details
        </button>
      </div>

      <div className="auth-buttons">
        <button className="btn btn-primary" onClick={() => handleNavigation('/login')}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={() => handleNavigation('/register')}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
