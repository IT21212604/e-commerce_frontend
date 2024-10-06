import React, { useEffect, useState } from "react";
import { Table, Form, InputGroup, Button } from "react-bootstrap";
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaTrash } from "react-icons/fa"; 
import Service from "../../Services/Service";
import "./ViewInventoryList.css"; 
import StockQuantityChart from "./StockQuantityChart";

function ViewInventoryList() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showChart, setShowChart] = useState(false); 
  const [chartData, setChartData] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredInventory, setFilteredInventory] = useState([]); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    Service.getAllInventory(token)
      .then((res) => {
        setInventory(res.data);
        setFilteredInventory(res.data); 

        const productIds = [
          ...new Set(res.data.map((item) => item.productId).filter((id) => id)),
        ];
        fetchProducts(productIds);

        const vendorIds = [
          ...new Set(res.data.map((item) => item.vendorId).filter((id) => id)),
        ];
        fetchVendors(vendorIds);

        const chartData = res.data.map((item) => ({
          name: products.find((prod) => prod.id === item.productId)?.name || "Unknown",
          stockQuantity: item.stockQuantity,
        }));
        setChartData(chartData);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        toast.error("Failed to load inventory. Please try again.", {
          theme: "colored",
        });
      });
  }, [token, products]);

  const fetchProducts = async (productIds) => {
    try {
      const productData = await Promise.all(
        productIds.map((id) =>
          Service.getProductById(token, id).then((res) => res.data)
        )
      );
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVendors = async (vendorIds) => {
    try {
      const vendorData = await Promise.all(
        vendorIds.map((id) =>
          Service.getUserById(token, id).then((res) => res.data)
        )
      );
      setVendors(vendorData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleStockClick = (stockHistory, productName) => {
    const newChartData = inventory.map((item) => ({
      name: products.find((prod) => prod.id === item.productId)?.name || "Unknown",
      stockQuantity: item.stockQuantity,
    }));

    setChartData(newChartData);
    setSelectedProduct(productName); 
    setShowChart(true); 
  };

  const handleDelete = (itemId) => {
    Service.deleteInventoryById(token, itemId)
      .then(() => {
        setInventory(inventory.filter((item) => item.id !== itemId));
        setFilteredInventory(filteredInventory.filter((item) => item.id !== itemId));
        toast.success("Item deleted successfully", { theme: "colored" });
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        toast.error("Failed to delete item. Please try again.", { theme: "colored" });
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = inventory.filter((item) => {
      const product = products.find((prod) => prod.id === item.productId);
      const vendor = vendors.find((ven) => ven.id === item.vendorId);

      return (
        (product?.productId &&
          product.productId.toString().toLowerCase().includes(value)) ||
        (product?.name && product.name.toLowerCase().includes(value)) ||
        (vendor?.name && vendor.name.toLowerCase().includes(value)) ||
        (product?.category && product.category.toLowerCase().includes(value))
      );
    });

    setFilteredInventory(filtered);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      <div
        className={`inventory-list-container container mt-5 ${
          isSidebarOpen ? "with-sidebar" : ""
        }`}
      >
        <h2 className="text-center mb-4">Inventory List</h2>

        <div className="input-group">
          <Form.Control
            type="text"
            placeholder="Search by Product ID, Name, Vendor, or Category"
            value={searchTerm}
            onChange={handleSearch}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </div>

        <Table className="table table-bordered table-striped table-header-">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Vendor Name</th>
              <th>Stock Quantity</th>
              <th>Low Stock Alert</th>
              <th>Last Updated</th>
              <th>Action</th> {/* New column for Action */}
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => {
              const product = products.find(
                (prod) => prod.id === item.productId
              );
              const vendor = vendors.find((ven) => ven.id === item.vendorId);

              return (
                <tr key={item.id}>
                  <td>{product?.productId}</td>
                  <td>{product?.name || "Unknown Product"}</td>
                  <td>{vendor?.name || "Unknown Vendor"}</td>
                  <td
                    onClick={() => handleStockClick([item.stockQuantity], product?.name)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.stockQuantity}
                  </td>
                  <td>{item.lowStockAlert ? "Yes" : "No"}</td>
                  <td>{new Date(item.lastUpdated).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td> {/* Action column with delete button */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <StockQuantityChart
        show={showChart}
        handleClose={() => setShowChart(false)}
        data={chartData}
        selectedProduct={selectedProduct}
      />
    </>
  );
}

export default ViewInventoryList;
