import React from "react";
import "./ViewInventoryList.css"; // Import custom CSS
import { Table } from "react-bootstrap"; // Import Bootstrap Table

const ViewInventoryList = ({ inventory }) => {
  return (
    <div className="inventory-details-container">
      <h2 className="text-center my-4">Inventory Details</h2>
      <Table striped bordered hover responsive className="inventory-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Vendor ID</th>
            <th>Stock Quantity</th>
            <th>Low Stock Alert</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productId}</td>
              <td>{item.vendorId}</td>
              <td>{item.stockQuantity}</td>
              <td>
                {item.lowStockAlert ? (
                  <span className="badge bg-danger">Low</span>
                ) : (
                  <span className="badge bg-success">Sufficient</span>
                )}
              </td>
              <td>{new Date(item.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewInventoryList;
