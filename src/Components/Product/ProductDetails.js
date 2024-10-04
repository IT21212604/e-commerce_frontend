import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Sidebar from "../NavBar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Service from "../../Services/Service";
import "./ProductDetails.css";

function ProductDetails() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    Service.getAllProductList(token)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);

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
      toast.error("Failed to load Vendors. Please try again.", {
        theme: "colored",
      });
    }
  };

  // Handle the click event for adding a new product
  const handleAddProduct = () => {
    navigate('/add-product'); // Navigate to Add Product page
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase()) ||
      (vendors.find(vendor => vendor.id === product.vendorId)?.name.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  const showModalWithProduct = (action, product) => {
    setModalAction(action);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    Service.removeProductById(token, id)
      .then(() => {
        toast.success("Product deleted successfully", {
          theme: "colored",
        });
        setProducts(products.filter((product) => product.id !== id));
        setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Failed to delete product. Please try again.", {
          theme: "colored",
        });
      });
  };

  const updateProduct = () => {
    const formData = {
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: selectedProduct.price,
      status: selectedProduct.status,
      vendorId: selectedProduct.vendorId,
    };

    Service.updateProductById(token, selectedProduct.id, formData)
      .then(() => {
        toast.success("Product updated successfully", {
          theme: "colored",
        });
        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? { ...selectedProduct } : product
          )
        );
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Failed to update product. Please try again.", {
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />

      {/* Modal for View, Update and Delete Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "delete" ? "Delete Product" : "Product Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "delete" ? (
            "Are you sure you want to delete this product?"
          ) : (
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={selectedProduct?.name || ""}
                  readOnly // Read-only for View mode
                />
              </Form.Group>
              <Form.Group controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product category"
                  value={selectedProduct?.category || ""}
                  readOnly // Read-only for View mode
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={selectedProduct?.price || ""}
                  onChange={(e) =>
                    modalAction === "update" && setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  readOnly={modalAction !== "update"} // Editable only in Update mode
                />
              </Form.Group>
              <Form.Group controlId="productStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product status"
                  value={selectedProduct?.status || ""}
                  readOnly // Read-only for View mode
                />
              </Form.Group>
              <Form.Group controlId="productVendorId">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vendor name"
                  value={vendors.find(vendor => vendor.id === selectedProduct?.vendorId)?.name || ""}
                  onChange={(e) =>
                    modalAction === "update" && setSelectedProduct({ 
                      ...selectedProduct, 
                      vendorId: e.target.value // Adjust according to your data structure
                    })
                  }
                  readOnly={modalAction !== "update"} // Editable only in Update mode
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          {modalAction === "delete" ? (
            <Button
              variant="danger"
              onClick={() => {
                deleteProduct(selectedProduct.id);
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                if (modalAction === "update") {
                  updateProduct();
                }
              }}
            >
              {modalAction === "update" ? "Update" : "Confirm"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className={`product-list-container container mt-5 ${isSidebarOpen ? "with-sidebar" : ""}`}>
        <h2 className="text-center mb-4">Product List</h2>

        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, category, or vendor name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Add Product Button */}
      <button onClick={handleAddProduct} className="btn btn-primary mb-3">
        Add Product
      </button>

        {/* Product Table */}
        <table className="table table-bordered table-striped table-header">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendor Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.status}</td>
                <td>
                  {vendors.find((vendor) => vendor.id === product.vendorId)?.name || "Unknown Vendor"}
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => showModalWithProduct("view", product)}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => showModalWithProduct("update", product)}
                    className="mx-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => showModalWithProduct("delete", product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductDetails;
