import axios from 'axios';

// Base API URL for user-related operations
const API_URL = 'http://localhost:3000';

// Login function, checks user credentials against stored users
const login = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        email: email,
        password: password,
      },
    });

    // If a user with matching credentials is found
    if (response.data.length > 0) {
      const user = response.data[0];
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

// Registration function, creates a new user in the system
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

// Logout function, removes user data from local storage
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  register,
  logout,
};
