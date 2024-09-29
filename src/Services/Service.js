
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
  async getUsers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/User`);
      console.log("Service API Response:", response.data); // Log to verify response
      return response.data; // Assuming the data is returned in response.data
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Function to add a new user
  async addStudent(studentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/User`, studentData);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }
}

export default new Service();
