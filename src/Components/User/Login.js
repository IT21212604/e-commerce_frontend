import React, { useState } from "react";
import Sidebar from "../NavBar/Sidebar"; // Import Sidebar component
import "./Register.css"; // Reusing the same CSS for consistent styling

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify CSS is imported
import Service from "../../Services/Service";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleValidationErrorMsg(msg) {
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

  function handleAuthenticate(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page
  
    // Empty fields validation
    if (email === "" || password === "") {
      handleValidationErrorMsg("Inputs cannot be empty");
      return;
    }
  
    Service.login(email, password)
      .then((res) => {
        console.log("API Response:", res); // Log the full response to inspect
  
        if (res.status === 200 && res.data.accessToken != null) {
          sessionStorage.setItem("token", res.data.accessToken);
          sessionStorage.setItem("isLogged", true);
  
          // After successful login, navigate to add-product page
          navigate("/add-product");
        } else {
          toast.error("Login failed!! Please try again.", {
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
      })
      .catch((err) => {
        console.log("Error during login:", err); // Log any error from the API
  
        toast.error("Login failed!! Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }
  

  return (
    <>
      {/* Sidebar with toggle functionality */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ToastContainer must be placed here or globally in App.js */}
      <ToastContainer />

      {/* Main content */}
      <div
        className={`login-container container mt-5 ${
          isSidebarOpen ? "with-sidebar" : ""
        }`}
      >
        <div className="login-form shadow-lg p-5 rounded">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleAuthenticate}>
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
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
