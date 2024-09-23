import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

// Base API URL and allowed task categories
const API_URL = 'http://localhost:3000'; 
const allowedCategories = ['Trabajo', 'Personal', 'Etc'];


// Fetch tasks with optional filters (completed status and category)
const getTasks = async (filter = {}) => {
  const authStore = useAuthStore(); // Access user data from auth store
  const userId = authStore.user.id;

  try {
    let url = `${API_URL}/todos?user_id=${userId}`;

    // Filter by completion status
    if (filter.completed !== undefined) {
      url += `&completed=${filter.completed}`;
    };

    // Filter by valid categories
    if (filter.category && allowedCategories.includes(filter.category)) {
      url += `&category=${filter.category}`;
    };

    const response = await axios.get(url); // Fetch filtered tasks
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

// Create a new task with validation for title and category
const createTask = async (taskData) => {
  const authStore = useAuthStore(); // Access user ID
  const userId = authStore.user.id;

  // Assign random ID and validate title and category
  taskData.id = (Math.floor(Math.random() * (50000 - 1 + 1)) + 1).toString();

  if (!taskData.title) {
    throw new Error('Task title is required');
  }

  if (!allowedCategories.includes(taskData.category)) {
    throw new Error(`Invalid category. Must be one of: ${allowedCategories.join(', ')}`);
  }

  try {
    const newTask = {
      ...taskData,
      user_id: userId,
      completed: false, // Set default task status to incomplete
    };

    const response = await axios.post(`${API_URL}/todos`, newTask); // Create new task
    return response.data;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

// Update an existing task with validation for category
const updateTask = async (taskId, updatedTaskData) => {
  try {
    // Validate updated category if provided
    if ('category' in updatedTaskData) {
      if (!allowedCategories.includes(updatedTaskData.category)) {
        throw new Error(`Invalid category. Must be one of: ${allowedCategories.join(', ')}`);
      }
    }

    const response = await axios.patch(`${API_URL}/todos/${taskId}`, updatedTaskData); // Update task
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

// Delete a task by its ID
const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${taskId}`); // Delete task
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
