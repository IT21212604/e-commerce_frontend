import React, { useState, useEffect } from "react";
import Sidebar from "../NavBar/Sidebar"; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "./ViewUserDetails.css"; 
import Service from "../../Services/Service"; // Import the service to get users

function ViewUserDetails() {
  const [users, setUsers] = useState([]); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch users on component mount
  useEffect(() => {
    Service.getUsers() // Call the Service to fetch users
      .then((data) => {
        setUsers(data); // Set fetched users to state
        toast.success("User data loaded successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error loading user data", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, []); 

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      {/* User Details Table */}
      <div className={`user-details-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
        <div className="user-details shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">User Details</h2>
          <table className="table table-hover table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewUserDetails;
