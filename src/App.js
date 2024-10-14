import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import AddProduct from "./Components/Product/AddProduct";
import Sidebar from "./Components/NavBar/Sidebar";
import Header from "./Components/NavBar/Header";
import ViewUserDetails from "./Components/User/ViewUserDetails";
import OrderList from "./Components/Order/OrderList";
import OrderDetail from "./Components/Order/OrderDetail";
import ProductList from "./Components/Product/ProductList";
import ProductDetails from "./Components/Product/ProductDetails";
import ViewInventoryList from "./Components/Inventory/ViewInventoryList";
import Home from "./Components/Home/Home";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user token is stored (logged in state)
    const token = sessionStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode the token to get user info
      setUser(userData); // Set user data with role
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear token from session storage
    sessionStorage.removeItem("token");
    setUser(null); // Clear user state
  };

  return (
    <Router>
      <div>
        <Header
          toggleSidebar={toggleSidebar}
          isLoggedIn={!!user} // Check if user is logged in based on user data
          handleLogout={handleLogout} // Pass handleLogout to Header
        />
        {user && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={user}
          />
        )}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {!user && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
              </>
            )}
            {user && (
              <>
                {user.role === "Administrator" && (
                  <>
                    <Route path="/viewUser" element={<ViewUserDetails />} />
                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/orderDetail/:id" element={<OrderDetail />} />
                    <Route path="/ProductList" element={<ProductList />} />
                    <Route
                      path="/viewInventory"
                      element={<ViewInventoryList />}
                    />
                  </>
                )}
                {user.role === "Vendor" && (
                  <>
                    <Route
                      path="/productDetails"
                      element={<ProductDetails />}
                    />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/orderDetail/:id" element={<OrderDetail />} />
                  </>
                )}
                {(user.role === "Administrator" || user.role === "CSR") && (
                  <>
                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/orderDetail/:id" element={<OrderDetail />} />
                    <Route path="/viewUser" element={<ViewUserDetails />} />
                  </>
                )}
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
