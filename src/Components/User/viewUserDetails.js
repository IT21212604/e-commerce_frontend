import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewUserDetails.css";
import Service from "../../Services/Service"; // Import the service to get users

function ViewUserDetails() {
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUserId, setSelectedUserId] = useState(null); // Store the selected user ID
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch users on component mount
  useEffect(() => {
    Service.getUsers(token) // Call the Service to fetch users
      .then((response) => {
        const usersData = response.data; // Adjust this based on the API response structure
        
        if (Array.isArray(usersData)) {
          setUsers(usersData); // Set fetched users to state if it's an array
        } else {
          toast.error("Unexpected response format from API", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
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

  // Function to open the modal
  const handleOpenModal = (userId) => {
    setSelectedUserId(userId); // Store the selected user ID
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedUserId(null); // Reset the selected user ID
  };

  // Function to handle user activation
  const activateUser = () => {
    if (!selectedUserId) return;

    Service.activateUser(token, selectedUserId)
      .then((response) => {
        toast.success("User activated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Update the user's status in the local state
        setUsers(users.map(user =>
          user.id === selectedUserId ? { ...user, status: "Active" } : user
        ));
        handleCloseModal(); // Close the modal after activation
      })
      .catch((error) => {
        console.error("Activation Error:", error.response); // Log the error response for debugging
        toast.error(`Error activating user: ${error.response.data.message || "Unknown error"}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleCloseModal(); // Close the modal on error
      });
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered users based on search term
  const filteredUsers = users.filter(user =>
    user.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) // Include email search
  );

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      <div className={`user-details-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
        <div className="user-details shadow-lg p-4 rounded">
          <h2 className="text-center mb-4">User Details</h2>
          
          {/* Search Bar */}
          <div className="d-flex justify-content-end mb-3">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by user type or email" 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
              <button className="btn btn-primary" onClick={() => setSearchTerm("")}>
                Search
              </button>
            </div>
          </div>

          <table className="table table-hover table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">User Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                    <td>
                      {user.status === "Inactive" ? (
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => handleOpenModal(user.id)}>
                          Activate
                        </button>
                      ) : (
                        <span>Active</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Activation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to activate this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={activateUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewUserDetails;
