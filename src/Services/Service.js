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

  // Function to get users
  getUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/User`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  // Function to add a new user
  addStudent = async (studentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/User`, studentData);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };
}

export default new Service();
