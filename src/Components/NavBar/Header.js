// Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import the CSS file for styling

const Header = ({ toggleSidebar }) => {
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
        <button className="btn btn-primary">Login</button>
        <button className="btn btn-secondary">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
