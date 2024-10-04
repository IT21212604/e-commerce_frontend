
// export default new Service();
import axios from "axios";

// Set the base URL of the API
const API_BASE_URL = "https://localhost:7237/api";

class Service {
  register(name, email, password, userType) {
    return axios.post(`${API_BASE_URL}/Auth/register`, {
      name,
      email,
      password,
      userType,
    });
  }

  login(email, password) {
    return axios.post(`${API_BASE_URL}/Auth/login`, {
      email,
      password,
    });
  }

   // Function to get users
   getUsers(token) { //token
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/User`, config);
  }

  // Function to get users
  getUserById(token, id) { //token
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/User/${id}`, config);
  }

  activateUser(token, id){ //token, id, formData
    const config = {
        headers: { 
            'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.put(`${API_BASE_URL}/User/activeUser/${id}?status=Active`, null,config);
  }


  // Method to add a Product  GetProductById
  addProduct(token, formData) {
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.post(`${API_BASE_URL}/Product/AddProduct`, formData, config);
  }

  // Method to get a Product  
  getProductById(token, id) { //token, id
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/Product/GetProductById/${id}`, config);
  }

  getAllProductList(token){ //token
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/Product/GetAllProductList`, config);
  }

  updateProductById(token, id, formData){ //token, id, formData
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.put(`${API_BASE_URL}/Product/UpdateProductById/${id}`, formData, config);
  }

  removeProductById(token, id){//token, id
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.delete(`${API_BASE_URL}/Product/RemoveProductById/${id}`, config); //config
  }

  updateProductStatusById(token, id, status){
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.put(`${API_BASE_URL}/Product/UpdateProductStatusById/${id}?status=${status}`, null, config); //config
  }

  updateProductsStatusByVendorAndCategory(token, vendorId, category, status){
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.put(`${API_BASE_URL}/Product/UpdateProductsStatusByVendorAndCategory?vendorId=${vendorId}&category=${category}&status=${status}`
    ,null ,config); //config
  }

   // Function to get all orders
   getAllOrders(token) { //token
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/Orders`, config);  
  }

  // Method to get a Order  
  getOrderById(token, id) { //token, id
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.get(`${API_BASE_URL}/Orders/${id}`, config);
  }

  // Method to Confirm Canceling Order  
  cancelOrder(token, id) { //token, id
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.patch(`${API_BASE_URL}/Orders/confirm-cancel/${id}`, config);
  }

  // Method to Mark as Delivered  
  markOrderAsDelivered(token, id, vendorId, status) { //token, id
    const config = {
        headers: { 
            // 'Access-Control-Allow-Origin': "*", 
            'Authorization': 'Bearer ' + token 
        }
    }

    return axios.patch(`${API_BASE_URL}/Orders/deliver/${id}?vendorId=${vendorId}&status=${status}`, null, config);
  }

  // Add new method to send notifications
  sendNotification(token, userId, message) {
    const config = {
      headers: {
        //"Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    };

    return axios.post(`${API_BASE_URL}/Notification`, { userId, message }, config);
  }

}

export default new Service();
