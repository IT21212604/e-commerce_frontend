// ProductList.js

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from React Bootstrap
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Service from "../../Services/Service"; // Import the Service class for API calls
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]); // For category filter
  const [vendors, setVendors] = useState([]); // For vendor list
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalAction, setModalAction] = useState(null); // Store action to perform after confirmation

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch all products
    Service.getAllProductList()
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);

        // Extract unique categories for filtering
        const uniqueCategories = [
          ...new Set(res.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        // Extract and filter vendor IDs
        const vendorIds = [
          ...new Set(
            res.data
              .map((product) => product.vendorId)
              .filter((vendorId) => vendorId)
          ),
        ]; // Filters out undefined or null vendor IDs
        fetchVendors(vendorIds); // Fetch vendor names based on their IDs
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products. Please try again.", {
          theme: "colored",
        });
      });
  }, []);

  // Fetch vendors based on vendor IDs
  const fetchVendors = async (vendorIds) => {
    try {
      const vendorData = await Promise.all(
        vendorIds.map((id) => Service.getUserById(id).then((res) => res.data))
      );
      setVendors(vendorData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Failed to load Vendors. Please try again.", {
        theme: "colored",
      });
    }
  };

  // Handle category and vendor change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    applyFilters(e.target.value, selectedVendor);
  };

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
    applyFilters(selectedCategory, e.target.value);
  };

  // Apply filtering logic for both category and vendor
  const applyFilters = (category, vendor) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (vendor) {
      filtered = filtered.filter((product) => product.vendorId === vendor);
    }
    setFilteredProducts(filtered);
  };

  // Check if all filtered products are active or inactive
  const allActive = filteredProducts.every(
    (product) => product.status === "Active"
  );
  const allInactive = filteredProducts.every(
    (product) => product.status === "Inactive"
  );

  // Function to show confirmation modal
  const showConfirmationModal = (action) => {
    setModalAction(() => action); // Store the action (function) to perform after confirmation
    setShowModal(true); // Show the modal
  };

  // Function to update product status
  const updateProductStatus = (status) => {
    if (!selectedCategory || !selectedVendor) {
      toast.error("Please select both Category and Vendor.", {
        theme: "colored",
      });
      return;
    }

    Service.updateProductsStatusByVendorAndCategory(
      selectedVendor,
      selectedCategory,
      status
    )
      .then(() => {
        toast.success(`Products have been updated to ${status}.`, {
          theme: "colored",
        });

        // Update product statuses in the UI after status change
        const updatedProducts = filteredProducts.map((product) => {
          return { ...product, status }; // Update status in the local state
        });
        setFilteredProducts(updatedProducts);
      })
      .catch((err) => {
        console.error("Error updating product status:", err);
        toast.error("Failed to update product status. Please try again.", {
          theme: "colored",
        });
      });
  };

  // Function to update status of individual products
  const updateIndividualProductStatus = (id, status) => {
    Service.updateProductStatusById(id, status)
      .then(() => {
        toast.success(`Product status updated to ${status}.`, {
          theme: "colored",
        });

        // Update status in the local state
        const updatedProducts = filteredProducts.map((product) => {
          if (product.id === id) {
            return { ...product, status };
          }
          return product;
        });
        setFilteredProducts(updatedProducts);
      })
      .catch((err) => {
        console.error("Error updating individual product status:", err);
        toast.error("Failed to update product status. Please try again.", {
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (modalAction) {
                modalAction(); // Execute the action passed when confirming
              }
              setShowModal(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className={`product-list-container container mt-5 ${
          isSidebarOpen ? "with-sidebar" : ""
        }`}
      >
        <h2 className="text-center mb-4">Product List</h2>

        {/* Filters in a horizontal layout */}
        <div className="mb-3 d-flex justify-content-between">
          <div className="w-50 me-2">
            <label htmlFor="categorySelect" className="form-label">
              Filter by Category
            </label>
            <select
              id="categorySelect"
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-50 ms-2">
            <label htmlFor="vendorSelect" className="form-label">
              Filter by Vendor
            </label>
            <select
              id="vendorSelect"
              className="form-control"
              value={selectedVendor}
              onChange={handleVendorChange}
            >
              <option value="">Select Vendor</option>
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Change Buttons */}
        <div className="mb-3 d-flex justify-content-center">
          {" "}
          {/* Center the buttons */}
          <button
            className="btn btn-success me-2" // Add a right margin for spacing
            disabled={allActive} // Disable if all products are active
            onClick={() =>
              showConfirmationModal(() => updateProductStatus("active"))
            }
          >
            Activate All
          </button>
          <button
            className="btn btn-danger"
            disabled={allInactive} // Disable if all products are inactive
            onClick={() =>
              showConfirmationModal(() => updateProductStatus("inactive"))
            }
          >
            Deactivate All
          </button>
        </div>

        {/* Product Table */}
        <table className="table table-bordered table-striped table-header">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendor</th> {/* Adding Vendor Column */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.status}</td>
                  <td>
                    {vendors.find((vendor) => vendor.id === product.vendorId)
                      ?.name || "Unknown Vendor"}
                  </td>{" "}
                  {/* Show vendor name */}
                  <td>
                    {product.status === "inactive" ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          showConfirmationModal(() =>
                            updateIndividualProductStatus(product.id, "active")
                          )
                        }
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          showConfirmationModal(() =>
                            updateIndividualProductStatus(
                              product.id,
                              "inactive"
                            )
                          )
                        }
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductList;
