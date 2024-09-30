import axios from "axios";

// Set the base URL of the API
const API_BASE_URL = "https://localhost:7237/api";

class Service {
  register(name, email, password, userType) {
    return axios.post(`${API_BASE_URL}/Auth/register`, {
      name: name,
      email: email,
      password: password,
      userType: userType,
    });
  }

  login(email, password) {
    return axios.post(`${API_BASE_URL}/Auth/login`, {
      email: email,
      password: password,
    });
  }

  // Method to add a Product  GetProductById
  addProduct(formData) {
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.post(`${API_BASE_URL}/Product/AddProduct`, formData);
  }

  // Method to get a Product  
  getProductById(id) { //token, id
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.get(`${API_BASE_URL}/Product/GetProductById/${id}`);
  }

  getAllProductList(){ //token
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.get(`${API_BASE_URL}/Product/GetAllProductList`);
  }

  updateProductById(id, formData){ //token, id, formData
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.put(`${API_BASE_URL}/Product/UpdateProductById/${id}`, formData);
  }

  removeProductById(id){//token, id
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.delete(`${API_BASE_URL}/Product/RemoveProductById/${id}`); //config
  }

  updateProductStatusById(id, status){
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.put(`${API_BASE_URL}/Product/UpdateProductStatusById/${id}`, {status: status}); //config
  }

  updateProductsStatusByVendorAndCategory(vendorId, category, status){
    // const config = {
    //     headers: { 
    //         'Access-Control-Allow-Origin': "*", 
    //         'Authorization': 'Bearer ' + token 
    //     }
    // }

    return axios.put(`${API_BASE_URL}/Product/updateProductsStatusByVendorAndCategory`, 
      {
        vendorId: vendorId,
        category: category,
        status: status
      }
    ); //config
  }

}

export default new Service();
