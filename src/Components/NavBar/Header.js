import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Header.css'; // Import the CSS file for styling

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to login page
  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Function to handle navigation to signup page
  const handleSignUp = () => {
    navigate('/register'); // Navigate to the signup page
  };

  return (
    <header className="header">
      <div className="menu-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="sidebar-logo">
        <h2>Sellforce</h2>
        <p>Your Sales Solution</p>
      </div>
      <h1 className="app-title"></h1>
      <div className="auth-buttons">
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;