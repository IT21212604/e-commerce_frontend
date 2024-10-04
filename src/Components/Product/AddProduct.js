import React, { useEffect, useState } from 'react';
import Sidebar from '../NavBar/Sidebar'; // Import Sidebar component
import './AddProduct.css'; // Import custom CSS for styling
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import Service from '../../Services/Service'; // Import the Service class for API calls

function AddProduct() {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    category: '', // Initially empty for dropdown
    vendorId: '', // Initially empty for vendor ID
    price: 0,
    description: '',
    stockQuantity: 0,
    status: 'active', // Default status
  });
  
  const [token, settoken] = useState(sessionStorage.getItem("token"));
  const [categories, setCategories] = useState([]); // State for categories
  const [vendors, setVendors] = useState([]); // State for vendors
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch categories and vendors when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products to get unique categories
        const productResponse = await Service.getAllProductList(token);
        const uniqueCategories = [
          ...new Set(productResponse.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);

        // Fetch all users to get vendors
        const usersResponse = await Service.getUsers(token);
        console.log(usersResponse)
        const vendorUsers = usersResponse.data.filter(user => user.userType === 'Vendor'); // Filter for vendor role
        setVendors(vendorUsers);
        console.log(vendors)
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load categories or vendors. Please try again.", {
          theme: "colored",
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.productId || !formData.name || !formData.price || !formData.category || !formData.vendorId || !formData.stockQuantity) {
      toast.error("Please fill in all required fields", { theme: "colored" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    // Add timestamps for createdAt and updatedAt
    const productData = {
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Call the service to add the product
      const response = await Service.addProduct(token, productData);

      if (response.status === 200 || response.status === 201) {
        //toast.success("Product added successfully!", { theme: "colored" });
        // Reset the form after successful submission
        setFormData({
          productId: '',
          name: '',
          category: '',
          vendorId: '',
          price: 0,
          description: '',
          stockQuantity: 0,
          status: 'active', // Reset status to default
        });
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      toast.error("Failed to add product. Please try again.", { theme: "colored" });
    }
  };

  return (
    <>
      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <ToastContainer />

      {/* Main content */}
      <div className={`add-product-container container mt-5 ${isSidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="form-inputs mt-3">
          <h2 className="text-center mb-4">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Product Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Vendor</label>
                  <select
                    className="form-control"
                    name="vendorId"
                    value={formData.vendorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Right Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
