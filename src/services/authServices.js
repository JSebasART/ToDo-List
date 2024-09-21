import axios from 'axios';

const API_URL = 'http://localhost:3000';

const login = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        email: email,
        password: password,
      },
    });

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

/* const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
}; */

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  //register,
  logout
};
