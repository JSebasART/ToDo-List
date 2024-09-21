import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const API_URL = 'http://localhost:3000'; 

const getTasks = async (filter = {}) => {
  const authStore = useAuthStore();
  const userId = authStore.user.id; // Assuming you have user info in the auth store

  try {
    let url = `${API_URL}/todos?user_id=${userId}`;

    // Add filtering by completed status
    if (filter.completed !== undefined) {
      url += `&completed=${filter.completed}`;
    }

    // Add filtering by category
    if (filter.category && ['Work', 'Personal', 'Misc'].includes(filter.category)) {
      url += `&category=${filter.category}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

const createTask = async (taskData) => {
  const authStore = useAuthStore();
  const userId = authStore.user.id;

  // Ensure the required fields are present
  if (!taskData.title) {
    throw new Error('Task title is required');
  }

  // Restrict the categories to "Work", "Personal", and "Misc"
  const allowedCategories = ['Work', 'Personal', 'Misc'];
  if (!allowedCategories.includes(taskData.category)) {
    throw new Error(`Invalid category. Must be one of: ${allowedCategories.join(', ')}`);
  }

  try {
    const newTask = {
      ...taskData,
      user_id: userId, // Automatically set the user_id
      completed: false, // Default to false
    };

    const response = await axios.post(`${API_URL}/todos`, newTask);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

// Update an existing task
const updateTask = async (taskId, updatedTaskData) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${taskId}`, updatedTaskData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
