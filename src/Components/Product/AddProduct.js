import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'; // Import custom CSS for styling

function AddProduct() {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    description: '',
    price: '',
    category: '',
    vendorId: '',
    stockQuantity: '',
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData); // Adjust API route
      console.log(response.data); // Handle success
      // Reset the form after submission
      setFormData({
        productId: '',
        name: '',
        description: '',
        price: '',
        category: '',
        vendorId: '',
        stockQuantity: '',
        isActive: true,
      });
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="add-product-container container mt-5">
      <div className="add-product-form shadow-lg p-5 rounded">
        <h2 className="text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <label className="form-check-label">Is Active</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
