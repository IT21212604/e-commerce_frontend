import axios from 'axios';

// Set the base URL of the API
const API_BASE_URL = 'https://localhost:7237/api';

// Function to get students
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/User`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to add a new user
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
