import React, { useState } from "react";
import Sidebar from "../NavBar/Sidebar"; 
import "./Register.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Service from "../../Services/Service";
import { useNavigate, Link } from "react-router-dom"; 

function Login() {
  const navigate = useNavigate(); 
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
    e.preventDefault(); 

    if (email === "" || password === "") {
      handleValidationErrorMsg("Inputs cannot be empty");
      return;
    }

    // Call the login service
    Service.login(email, password)
      .then((res) => {
        // Check if login was successful
        if (res.status === 200 && res.data.Token) { // Adjust to check for your token structure
          sessionStorage.setItem("token", res.data.Token); // Store the token
          sessionStorage.setItem("isLogged", true);
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/add-product"); // Navigate to the desired page after successful login
        } else {
          handleValidationErrorMsg("Login failed!! Please try again.");
        }
      })
      .catch((err) => {
        console.log("Error during login:", err); 
        handleValidationErrorMsg("Login failed!! Please try again."); // Show error message
      });
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />
      <div className={`login-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
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
          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
