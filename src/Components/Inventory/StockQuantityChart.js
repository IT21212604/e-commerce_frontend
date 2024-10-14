import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockQuantityChart = ({ show, handleClose, data, selectedProduct }) => {
  // Define a color palette for the lines
  const colors = "#8884d8";

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Stock Quantity History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="stockQuantity" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            {data.map((product, index) => (
              <Line
                key={product.name}
                type="monotone"
                dataKey="stockQuantity"
                stroke={
                  selectedProduct === product.name
                    ? "#ff7300"
                    : colors[index % colors.length]
                } // Assign different colors
                strokeWidth={selectedProduct === product.name ? 3 : 1}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StockQuantityChart;
