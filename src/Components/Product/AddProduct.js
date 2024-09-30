// import React, { useState } from 'react';
// import Sidebar from '../NavBar/Sidebar'; // Import Sidebar component
// import axios from 'axios';
// import './AddProduct.css'; // Import custom CSS for styling

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     productId: '',
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     vendorId: '',
//     stockQuantity: '',
//     isActive: true,
//   });

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,[e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/products', formData); // Adjust API route
//       console.log(response.data); // Handle success
//       // Reset the form after submission
//       setFormData({
//         productId: '',
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         vendorId: '',
//         stockQuantity: '',
//         isActive: true,
//       });
//     } catch (error) {
//       console.error(error); // Handle error
//     }
//   };

//   return (
//     <>
//       {/* Sidebar component */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main content */}
//       <div className={`add-product-container container mt-5 ${isSidebarOpen ? 'with-sidebar' : ''}`}>
//         <div className="add-product-form shadow-lg p-5 rounded">
//           <h2 className="text-center mb-4">Add Product</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Product ID</label>
//               <input
//                 type="text" className="form-control" name="productId" value={formData.productId} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control" name="description" value={formData.description} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Price</label>
//               <input
//                 type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Category</label>
//               <input
//                 type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Vendor ID</label>
//               <input
//                 type="text" className="form-control" name="vendorId" value={formData.vendorId} onChange={handleChange} required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Stock Quantity</label>
//               <input
//                 type="number" className="form-control" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required
//               />
//             </div>
//             <div className="form-check mb-3">
//               <input
//                 type="checkbox" className="form-check-input" name="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//               />
//               <label className="form-check-label">Is Active</label>
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Add Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from 'react';
import Sidebar from '../NavBar/Sidebar'; // Import Sidebar component
import './AddProduct.css'; // Import custom CSS for styling
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import Service from '../../Services/Service'; // Import the Service class for API calls

function AddProduct() {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    category: '',
    vendorId: '',
    price: 0,
    description: '',
    stockQuantity: 0,
    status: 'active', // Default status
    ratings: [], // Empty array for ratings initially
    imageUrl: '',
  });


  const [imageFile, setImageFile] = useState(null); // State for the image file
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.productId || !formData.name || !formData.price || !formData.category || !formData.vendorId || !formData.stockQuantity || !imageFile) {
      toast.error("Please fill in all required fields", { theme: "colored" });
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
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
      // Get token from session storage
      const token = sessionStorage.getItem("token");

      // Call the service to add the product
      const response = await Service.addProduct(productData, token);

      if (response.status === 200 || response.status === 201) {
        toast.success("Product added successfully!", { theme: "colored" });
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
          ratings: [], // Clear ratings
          imageUrl: '',
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
        <div className="form-inputs">
          <h2 className="text-center mb-4">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Product ID</label>
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
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vendor ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vendorId"
                    value={formData.vendorId}
                    onChange={handleChange}
                    required
                  />
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
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
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


