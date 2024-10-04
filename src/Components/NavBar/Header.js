import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';

const Header = ({ toggleSidebar, isLoggedIn }) => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleSignUp = () => {
    navigate('/register'); 
  };

  const handleLogout = () => {
    // Clear token from local storage or session storage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  
    // Redirect user to the login page
    window.location.href = '/login';
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
        {!isLoggedIn ? (
          <>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={handleSignUp}>
              Sign Up
            </button>
          </>
        ) : (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
