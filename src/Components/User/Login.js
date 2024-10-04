import React, { useState } from "react";
import Sidebar from "../NavBar/Sidebar"; 
import "./Register.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Service from "../../Services/Service";
import { useNavigate, Link } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import show/hide icons

function Login({ setUser }) {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
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

    Service.login(email, password)
      .then((res) => {
        console.log("API Response:", res); 
        if (res.status === 200 && res.data.token != null) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("isLogged", true);
          
          // Decode the token to get user data
          const userData = JSON.parse(atob(res.data.token.split('.')[1]));
          setUser(userData); // Update user state with role
          
          // Redirect to the correct page based on role
          if (userData.role === 'Administrator') {
            navigate("/viewUser");
          } else if (userData.role === 'Vendor') {
            navigate("/productDetails");
          } else {
            navigate("/orderList"); // Default to orderList for CSR
          }
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
        console.log("Error during login:", err); 
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye} // Toggle icon based on state
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="text-center"> 
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>

          <div className="or-separator my-3 text-center">
            <span>OR</span>
          </div>

          <div className="oauth-login text-center">
            <p>Login with</p>
            <button className="btn btn-outline-danger me-2">
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button className="btn btn-outline-primary">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
