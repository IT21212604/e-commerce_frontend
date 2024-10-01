import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);

  // Fetch orders when component mounts
  useEffect(() => {
    Service.getAllOrders()
      .then((response) => {
        setOrders(response.data);
        toast.success("Orders loaded successfully", {
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
  }, []);

  const markAsDelivered = (orderId) => {
    Service.markOrderAsDelivered(orderId)
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
            order.id === orderId ? { ...order, status: "Delivered" } : order
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

  const cancelOrder = (orderId) => {
    const note = prompt("Please enter a note for cancellation");
    if (note) {
      Service.cancelOrder(orderId, note)
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
          setOrders(orders.filter((order) => order.id !== orderId));
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
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderStatus}</td>
                <td>{order.totalAmount}</td>
                <td>
                  {order.vendorStatus?.map((vendor) => (
                    <div key={vendor.vendorId}>
                      {vendor.status}
                    </div>
                  )) || <span>No vendor status available</span>}
                </td>
                <td className="btn-group">
                  {/* Updated Link to pass order id */}
                  <Link to={`/orderDetail/${order.id}`} className="btn btn-primary btn-sm order-list-btn order-list-btn-primary">
                    View
                  </Link>
                  {order.status !== "Delivered" && (
                    <>
                      <button
                        className="btn btn-success btn-sm order-list-btn order-list-btn-success"
                        onClick={() => markAsDelivered(order.id)}
                      >
                        Delivered
                      </button>
                      <button
                        className="btn btn-danger btn-sm order-list-btn "
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    </>
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
