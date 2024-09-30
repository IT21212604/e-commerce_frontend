// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import AddProduct from './Components/Product/AddProduct';
import Sidebar from './Components/NavBar/Sidebar';
import Header from './Components/NavBar/Header'; // Import Header
import viewUserDetails from './Components/User/viewUserDetails';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div>
        <Header toggleSidebar={toggleSidebar} /> {/* Pass toggle function */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/viewUser" element={<viewUserDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
