import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import UpdateUserModal from "../User/UpdateUserModal"; // Import the modal component
import Service from "../../Services/Service"; // Import your service

const Header = ({ toggleSidebar, isLoggedIn }) => {
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal visibility state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Extract user role and ID from token and fetch user details
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const userData = JSON.parse(atob(storedToken.split(".")[1])); // Decode JWT token payload
      setUserRole(userData.role);
      setUserId(userData.name); // Assuming userId is stored in 'name' field in the token

      // Fetch user details from the server using getUserById
      fetchUserDetails(userData.name, storedToken);
    }
  }, []);

  const fetchUserDetails = async (userId, token) => {
    try {
      const response = await Service.getUserById(token, userId); // Fetch user details using the service
      if (response && response.data) {
        setUserName(response.data.name);
        setEmail(response.data.email);
        console.log(response.data);
        // Check if createdAt is a valid date or a timestamp
        const date = new Date(response.data.accountCreatedAt);
        if (!isNaN(date.getTime())) {
          // Ensure it's a valid date
          setCreatedAt(date.toLocaleDateString()); // Format date to locale date string
        } else {
          setCreatedAt("Invalid date"); // Fallback for invalid dates
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch notifications if user is a vendor
  useEffect(() => {
    if (userRole === "Vendor" && userId) {
      fetchNotifications();
    }
  }, [userRole, userId]);

  const fetchNotifications = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await Service.getAllNotificationsByUserId(token, userId);
      setNotifications(response.data);

      // Calculate unread notifications
      const unread = response.data.filter(
        (notification) => !notification.isRead
      ).length;
      setUnreadCount(unread); // Set unread count
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await Service.deleteUserById(token, userId);
      handleLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleUpdateAccount = () => {
    setShowUpdateModal(true); // Show the modal when "Update Account" is clicked
  };

  const handleModalClose = () => {
    setShowUpdateModal(false); // Close the modal
  };

  const handleUpdateUserDetails = async (updatedData) => {
    const token = sessionStorage.getItem("token");
    try {
      // Make an API call to update user details
      const response = await Service.updateUserById(token, userId, updatedData);
      if (response && response.data) {
        // Update the profile information in the header with the new details
        setUserName(updatedData.name);
        setEmail(updatedData.email);
        setShowUpdateModal(false); // Close the modal after a successful update
        console.log("User details updated successfully:", updatedData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const toggleNotificationDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <header className="header">
      <div className="menu-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="sidebar-logo">
        <h2>
          Sellforce <span style={{ color: "red" }}>+</span>
        </h2>
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
            {userRole === "Vendor" && (
              <div className="notification-wrapper">
                <div className="notification-icon-wrapper">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="notification-icon"
                    onClick={toggleNotificationDropdown}
                  />
                  <span className="notification-count">{unreadCount}</span>
                </div>
                {showNotifications && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`notification-item ${
                            notification.isRead ? "read" : "unread"
                          }`}
                        >
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

            <button
              className="btn btn-danger logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

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
                  <div className="profile-item">Email: {email}</div>
                  <div className="profile-item">
                    Account Created: {createdAt}
                  </div>
                  <div className="profile-item">
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdateAccount}
                    >
                      Update Account
                    </button>
                  </div>
                  <div className="profile-item">
                    <button
                      className="btn btn-danger"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Include the UpdateUserModal component */}
      <UpdateUserModal
        show={showUpdateModal}
        handleClose={handleModalClose}
        userDetails={{ name: userName, email: email }}
        handleUpdate={handleUpdateUserDetails}
      />
    </header>
  );
};

export default Header;
