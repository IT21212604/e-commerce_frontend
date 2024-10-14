import axios from "axios";

// Set the base URL of the API
const API_BASE_URL = "https://localhost:7237/api";

class Service {
  // Method to register a user
  register(name, email, password, userType) {
    return axios.post(`${API_BASE_URL}/Auth/register`, {
      name,
      email,
      password,
      userType,
    });
  }

  // Method to authenticate a user
  login(email, password) {
    return axios.post(`${API_BASE_URL}/Auth/login`, {
      email,
      password,
    });
  }

  // Function to get users
  getUsers(token) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/User`, config);
  }

  // Function to get a user
  getUserById(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/User/${id}`, config);
  }

  // Function to update users
  updateUserById(token, updatedData) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.put(`${API_BASE_URL}/User/updateName`, updatedData, config);
  }

  // Function to delete users
  deleteUserById(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.delete(`${API_BASE_URL}/User/${id}`, config);
  }

  // Method to active/inactive a user
  activateUser(token, id) {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };

    return axios.put(
      `${API_BASE_URL}/User/activeUser/${id}?status=Active`,
      null,
      config
    );
  }

  // Method to add a Product  GetProductById
  addProduct(token, formData) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.post(`${API_BASE_URL}/Product/AddProduct`, formData, config);
  }

  // Method to get a Product
  getProductById(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/Product/GetProductById/${id}`, config);
  }

  // Method to get all Products
  getAllProductList(token) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/Product/GetAllProductList`, config);
  }

  // Method to update product details
  updateProductById(token, id, formData) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.put(
      `${API_BASE_URL}/Product/UpdateProductById/${id}`,
      formData,
      config
    );
  }

  // Method to delete a product
  removeProductById(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.delete(
      `${API_BASE_URL}/Product/RemoveProductById/${id}`,
      config
    );
  }

  // Method to update product status by id
  updateProductStatusById(token, id, status) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.put(
      `${API_BASE_URL}/Product/UpdateProductStatusById/${id}?status=${status}`,
      null,
      config
    );
  }

  // Method to update product status by vendor id and Category
  updateProductsStatusByVendorAndCategory(token, vendorId, category, status) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.put(
      `${API_BASE_URL}/Product/UpdateProductsStatusByVendorAndCategory?vendorId=${vendorId}&category=${category}&status=${status}`,
      null,
      config
    );
  }

  // Function to get all orders
  getAllOrders(token) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/Orders`, config);
  }

  // Method to get a Order
  getOrderById(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/Orders/${id}`, config);
  }

  // Method to Confirm Canceling Order
  cancelOrder(token, id) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.patch(`${API_BASE_URL}/Orders/confirm-cancel/${id}`, config);
  }

  // Method to Mark as Delivered
  markOrderAsDelivered(token, id, vendorId, status) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.patch(
      `${API_BASE_URL}/Orders/deliver/${id}?vendorId=${vendorId}&status=${status}`,
      null,
      config
    );
  }

  // Method to getAllNotificationsByUserId
  getAllNotificationsByUserId(token, userId) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return axios.get(`${API_BASE_URL}/Notification/user/${userId}`, config);
  }

  // Add this function for inventory retrieval
  getAllInventory(token) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios.get(`${API_BASE_URL}/Inventory`, config);
  }

  // Add this function for inventory retrieval
  deleteInventoryById(token, itemId) {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios.delete(`${API_BASE_URL}/Inventory/${itemId}`, config);
  }
}

export default new Service();
