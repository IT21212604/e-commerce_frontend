import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'; // Import bell icon
import { useNavigate } from 'react-router-dom'; 
import './Header.css';
import Service from '../../Services/Service'; // Import your service

const Header = ({ toggleSidebar, isLoggedIn }) => {
  const navigate = useNavigate(); 
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [showNotifications, setShowNotifications] = useState(false); // Toggle notification dropdown
  const [userRole, setUserRole] = useState(''); // State for user role
  const [userId, setUserId] = useState(''); // State for user ID

  // Extract user role and ID from token
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const userData = JSON.parse(atob(storedToken.split('.')[1])); // Decode JWT token payload
      setUserRole(userData.role); // Set the user role from the token
      setUserId(userData.id); // Assuming the ID is also in the token
    }
  }, []);

  // Fetch notifications if user is a vendor
  useEffect(() => {
    if (userRole === 'Vendor' && userId) {
      fetchNotifications();
    }
  }, [userRole, userId]);

  const fetchNotifications = async () => {
    const token = sessionStorage.getItem("token"); // Get the token
    try {
      const response = await Service.getAllNotificationsByUserId(token, userId); // Use the new service method
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleSignUp = () => {
    navigate('/register'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleNotificationDropdown = () => {
    setShowNotifications(!showNotifications);
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
          <>
            {userRole === 'Vendor' && (
              <div className="notification-wrapper">
                <FontAwesomeIcon 
                  icon={faBell} 
                  className="notification-icon" 
                  onClick={toggleNotificationDropdown} 
                />
                {showNotifications && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                          {notification.message}
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">No notifications</div>
                    )}
                  </div>
                )}
              </div>
            )}
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
