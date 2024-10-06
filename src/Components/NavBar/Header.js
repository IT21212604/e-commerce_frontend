import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import user profile icon
import { useNavigate } from 'react-router-dom'; 
import './Header.css';
import Service from '../../Services/Service'; // Import your service

const Header = ({ toggleSidebar, isLoggedIn }) => {
  const navigate = useNavigate(); 
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [showNotifications, setShowNotifications] = useState(false); // Toggle notification dropdown
  const [userRole, setUserRole] = useState(''); // State for user role
  const [userId, setUserId] = useState(''); // State for user ID
  const [userName, setUserName] = useState(''); // State for user name
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Toggle profile dropdown

  // Extract user role and ID from token
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const userData = JSON.parse(atob(storedToken.split('.')[1])); // Decode JWT token payload
      setUserRole(userData.role); // Set the user role from the token
      setUserId(userData.id); // Assuming the ID is also in the token
      setUserName(userData.name); // Assuming user name is in the token
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

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await Service.deleteUserAccount(token, userId); // Assuming a service method for deleting the user
      handleLogout(); // Automatically log out the user after account deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleUpdateAccount = () => {
    navigate('/update-profile'); // Navigate to the update profile page
  };

  const toggleNotificationDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown); // Toggle user profile dropdown
  };

  return (
    <header className="header">
      <div className="menu-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="sidebar-logo">
        <h2>Sellforce <span style={{color:'red'}}>+</span></h2>
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
            {/* Notification Bell */}
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

            {/* User Profile Icon */}
            <div className="profile-wrapper">
              <FontAwesomeIcon 
                icon={faUserCircle} 
                className="profile-icon" 
                onClick={toggleProfileDropdown} 
              />
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-item">Name: {userName}</div>
                  <div className="profile-item">Role: {userRole}</div>
                  <div className="profile-item">User ID: {userId}</div>
                  <div className="profile-item">
                    <button className="btn btn-primary" onClick={handleUpdateAccount}>
                      Update Account
                    </button>
                  </div>
                  <div className="profile-item">
                    <button className="btn btn-danger" onClick={handleDeleteAccount}>
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button in Nav Bar */}
            <button className="btn btn-danger logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
