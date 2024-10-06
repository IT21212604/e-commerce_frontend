// import React, { useEffect, useState } from "react";
// import { Table, Form, InputGroup } from "react-bootstrap";
// import Sidebar from "../NavBar/Sidebar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaSearch } from "react-icons/fa"; // Import the search icon
// import Service from "../../Services/Service";
// import "./ViewInventoryList.css"; // Import the CSS for custom styling
// import StockQuantityChart from "./StockQuantityChart";

// function ViewInventoryList() {
//   const [token, setToken] = useState(sessionStorage.getItem("token"));
//   const [inventory, setInventory] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showChart, setShowChart] = useState(false); // State to show/hide chart modal
//   const [chartData, setChartData] = useState([]); // State to store chart data
//   const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
//   const [filteredInventory, setFilteredInventory] = useState([]); // Filtered inventory

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     // Fetch the inventory data and associated product/vendor details
//     Service.getAllInventory(token)
//       .then((res) => {
//         setInventory(res.data);
//         setFilteredInventory(res.data); // Set initial filtered inventory

//         const productIds = [
//           ...new Set(res.data.map((item) => item.productId).filter((id) => id)),
//         ];
//         fetchProducts(productIds);

//         const vendorIds = [
//           ...new Set(res.data.map((item) => item.vendorId).filter((id) => id)),
//         ];
//         fetchVendors(vendorIds);
//       })
//       .catch((err) => {
//         console.error("Error fetching inventory:", err);
//         toast.error("Failed to load inventory. Please try again.", {
//           theme: "colored",
//         });
//       });
//   }, [token]);

//   // Fetch the product names based on product IDs
//   const fetchProducts = async (productIds) => {
//     try {
//       const productData = await Promise.all(
//         productIds.map((id) =>
//           Service.getProductById(token, id).then((res) => res.data)
//         )
//       );
//       setProducts(productData);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Fetch the vendor names based on vendor IDs
//   const fetchVendors = async (vendorIds) => {
//     try {
//       const vendorData = await Promise.all(
//         vendorIds.map((id) =>
//           Service.getUserById(token, id).then((res) => res.data)
//         )
//       );
//       setVendors(vendorData);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   // Handle stock quantity click to show the chart modal
//   const handleStockClick = (stockHistory) => {
//     const dummyData = stockHistory.map((item, index) => ({
//       date: `10/0${index + 1}/2024`,
//       stockQuantity: item,
//     }));

//     setChartData(dummyData);
//     setShowChart(true); // Show the chart modal
//   };

//   // Handle search functionality
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = inventory.filter((item) => {
//       const product = products.find((prod) => prod.id === item.productId);
//       const vendor = vendors.find((ven) => ven.id === item.vendorId);

//       // Filter by product ID, product name, vendor name, or category
//       return (
//         (product?.productId &&
//           product.productId.toString().toLowerCase().includes(value)) ||
//         (product?.name && product.name.toLowerCase().includes(value)) ||
//         (vendor?.name && vendor.name.toLowerCase().includes(value)) ||
//         (product?.category && product.category.toLowerCase().includes(value))
//       );
//     });

//     setFilteredInventory(filtered);
//   };

//   return (
//     <>
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <ToastContainer />

//       <div
//         className={`inventory-list-container container mt-5 ${
//           isSidebarOpen ? "with-sidebar" : ""
//         }`}
//       >
//         <h2 className="text-center mb-4">Inventory List</h2>

//         {/* Search bar with search icon, positioned on the right */}
//         <div className="input-group">
//           <Form.Control
//             type="text"
//             placeholder="Search by Product ID, Name, Vendor, or Category"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <InputGroup.Text>
//             <FaSearch />
//           </InputGroup.Text>
//         </div>

//         <Table className="table table-bordered table-striped table-header-">
//           <thead>
//             <tr>
//               <th>Product Code</th>
//               <th>Product Name</th>
//               <th>Vendor Name</th>
//               <th>Stock Quantity</th>
//               <th>Low Stock Alert</th>
//               <th>Last Updated</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInventory.map((item) => {
//               // Get product and vendor based on productId and vendorId
//               const product = products.find(
//                 (prod) => prod.id === item.productId
//               );
//               const vendor = vendors.find((ven) => ven.id === item.vendorId);

//               return (
//                 <tr key={item.id}>
//                   <td>{product?.productId}</td>
//                   <td>{product?.name || "Unknown Product"}</td>
//                   <td>{vendor?.name || "Unknown Vendor"}</td>
//                   <td
//                     onClick={() => handleStockClick([item.stockQuantity])}
//                     style={{ cursor: "pointer", color: "blue" }}
//                   >
//                     {item.stockQuantity}
//                   </td>
//                   <td>{item.lowStockAlert ? "Yes" : "No"}</td>
//                   <td>{new Date(item.lastUpdated).toLocaleString()}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>

//       {/* Stock Quantity Chart Modal */}
//       <StockQuantityChart
//         show={showChart}
//         handleClose={() => setShowChart(false)}
//         data={chartData}
//       />
//     </>
//   );
// }

// export default ViewInventoryList;

import React, { useEffect, useState } from "react";
import { Table, Form, InputGroup } from "react-bootstrap";
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa"; 
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
  const [selectedProduct, setSelectedProduct] = useState(""); // Selected product to highlight
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredInventory, setFilteredInventory] = useState([]); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch the inventory data and associated product/vendor details
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

        // Generate initial chart data
        const chartData = res.data.map((item) => ({
          name: products.find((prod) => prod.id === item.productId)?.name || "Unknown",
          stockQuantity: item.stockQuantity,
        }));
        setChartData(chartData); // Set initial chart data
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

        {/* Search bar with search icon */}
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
        selectedProduct={selectedProduct}
      />
    </>
  );
}

export default ViewInventoryList;
