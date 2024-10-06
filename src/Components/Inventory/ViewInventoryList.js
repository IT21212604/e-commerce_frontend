import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Service from "../../Services/Service";
import "./ViewInventoryList.css"; // Import the CSS for custom styling
import StockQuantityChart from "./StockQuantityChart";

function ViewInventoryList() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChart, setShowChart] = useState(false); // Added state to show/hide chart modal
  const [chartData, setChartData] = useState([]);    // Added state to store chart data

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    Service.getAllInventory(token)
      .then((res) => {
        setInventory(res.data);

        const vendorIds = [
          ...new Set(
            res.data
              .map((product) => product.vendorId)
              .filter((vendorId) => vendorId)
          ),
        ];
        fetchVendors(vendorIds);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products. Please try again.", {
          theme: "colored",
        });
      });
  }, [token]);

  const fetchProducts = async (productIds) => {
    try {
      const productData = await Promise.all(
        productIds.map((id) => Service.getProductById(id).then((res) => res.data))
      );
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVendors = async (vendorIds) => {
    try {
      const vendorData = await Promise.all(
        vendorIds.map((id) => Service.getVendorById(id).then((res) => res.data))
      );
      setVendors(vendorData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleStockClick = (stockHistory) => {
    // Dummy stock history data for the modal (should come from backend)
    const dummyData = stockHistory.map((item, index) => ({
      date: `10/0${index + 1}/2024`,
      stockQuantity: item,
    }));

    setChartData(dummyData);
    setShowChart(true); // Show the chart modal
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      <div className={`inventory-list-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
        <h2 className="text-center mb-4">Inventory List</h2>

        <Table className="table table-bordered table-striped table-header">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Vendor Name</th>
              <th>Stock Quantity</th>
              <th>Low Stock Alert</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              // Get product and vendor based on productId and vendorId
              const product = products.find((prod) => prod.id === item.productId);
              const vendor = vendors.find((ven) => ven.id === item.vendorId);

              return (
                <tr key={item.id}>
                  {/* Access product and vendor name correctly */}
                  <td>{product?.name || "Unknown Product"}</td>
                  <td>{vendor?.name || "Unknown Vendor"}</td>
                  <td
                    onClick={() => handleStockClick([item.stockQuantity])}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.stockQuantity}
                  </td>
                  <td>{item.lowStockAlert ? "Yes" : "No"}</td>
                  <td>{new Date(item.lastUpdated).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Stock Quantity Chart Modal */}
      <StockQuantityChart
        show={showChart}
        handleClose={() => setShowChart(false)}
        data={chartData}
      />
    </>
  );
}

export default ViewInventoryList;
