// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import AddProduct from './Components/Product/AddProduct';
//import ViewProductDetails from './Components/Product/ViewProductDetails';
import Sidebar from './Components/NavBar/Sidebar';
import Header from './Components/NavBar/Header'; // Import Header
import ViewUserDetails from './Components/User/ViewUserDetails';
import OrderList from './Components/Order/OrderList';
import OrderDetail from './Components/Order/OrderDetail';
import ProductList from './Components/Product/ProductList';
import ViewInventoryList from './Components/Inventory/ViewInventoryList'

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
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/viewUser" element={<ViewUserDetails />} />
            <Route path="/orderList" element={<OrderList />} />
            <Route path="/orderDetail/:id" element={<OrderDetail />} />
            <Route path="/viewInventory" element={< ViewInventoryList/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
