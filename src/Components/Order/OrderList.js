import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './OrderList.css';

function OrderList() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store the user's role

  // Extract user role from token
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const userData = JSON.parse(atob(storedToken.split('.')[1])); // Decode JWT token payload
      setUserRole(userData.role); // Set the user role from the token
    }
  }, []);

  // Fetch orders when the component mounts
  useEffect(() => {
    if (token) {
      Service.getAllOrders(token)
        .then((response) => {
          setOrders(response.data);
        })
        .catch(() => {
          toast.error("Failed to fetch orders", {
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
    }
  }, [token]);

  // Mark an order as delivered
  const markAsDelivered = (obj) => {
    const vendorId = obj.orderStatus === "Processing" ? obj.vendorStatus[0]?.vendorId : null;

    if (!vendorId) {
      toast.error("Vendor ID not found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const status = "Delivered";
    Service.markOrderAsDelivered(token, obj.id, vendorId, status)
      .then(() => {
        toast.success("Order marked as delivered", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOrders(
          orders.map((order) =>
            order.id === obj.id ? { ...order, orderStatus: status } : order
          )
        );
      })
      .catch(() => {
        toast.error("Failed to mark order as delivered", {
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
  };

  // Cancel an order
  const cancelOrder = (orderId) => {
    const note = prompt("Please enter a note for cancellation");
    if (note) {
      Service.cancelOrder(token, orderId, note)
        .then(() => {
          toast.success("Order cancelled successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOrders(
            orders.map((order) =>
              order.id === orderId ? { ...order, orderStatus: "Cancelled" } : order
            )
          );
        })
        .catch(() => {
          toast.error("Failed to cancel order", {
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
    }
  };

  return (
    <div className="container order-list-container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-4 order-list-title">Order List</h2>
      <table className="table table-bordered table-striped order-list-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Vendor Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderID}</td>
                <td>{order.customerName}</td>
                <td>{order.orderStatus}</td>
                <td>{order.totalAmount}</td>
                <td>
                  {order.vendorStatus?.map((vendor) => (
                    <div key={vendor.vendorId}>{vendor.status}</div>
                  )) || <span>No vendor status available</span>}
                </td>
                <td className="btn-group">
                  <Link
                    to={`/orderDetail/${order.id}`}
                    className="btn btn-primary btn-sm order-list-btn order-list-btn-primary"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-success btn-sm order-list-btn order-list-btn-success"
                    onClick={() => markAsDelivered(order)}
                    disabled={order.orderStatus === "Delivered"}
                  >
                    Delivered
                  </button>
                  {/* Only show the Cancel button if the user is not a vendor */}
                  {userRole !== "Vendor" && (
                    <button
                      className="btn btn-danger btn-sm order-list-btn"
                      onClick={() => cancelOrder(order.id)}
                      disabled={
                        order.orderStatus === "Cancelled" ||
                        order.orderStatus === "Delivered" ||
                        order.orderStatus === "Dispatched"
                      }
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
