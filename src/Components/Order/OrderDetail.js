import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Service from "../../Services/Service";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderDetail.css";

function OrderDetail() {
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const { id } = useParams(); // Get the order ID from the route parameters
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details by ID
    Service.getOrderById(token, id)
      .then((response) => {
        setOrder(response.data); // Set the order data
      })
      .catch((error) => {
        toast.error("Failed to fetch order details", {
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
  }, [id]);

  return (
    <div className="container order-detail-container mt-5">
      <ToastContainer />
      {order ? (
        <>
          <h2 className="order-detail-section-title mb-4">
            Order Details (ID: {order.orderID})
          </h2>
          <div className="order-detail-info row mb-3">
            <div className="col-md-6">
              <h5 className="order-detail-sub-title">Order Information</h5>
              <p>
                <strong>Customer Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Total Amount:</strong> {order.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
            </div>
            <div className="col-md-6">
              <h5 className="order-detail-sub-title">Shipping Address</h5>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </p>
            </div>
          </div>
          <div className="order-detail-info row mb-3">
            <h5 className="order-detail-sub-title">Order Items</h5>
            <table className="table table-bordered table-striped order-detail-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center order-detail-loading">
          Loading order details...
        </p>
      )}
    </div>
  );
}

export default OrderDetail;
