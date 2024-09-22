import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const API_URL = 'http://localhost:3000'; 
const allowedCategories = ['Trabajo', 'Personal', 'Etc'];

const getTasks = async (filter = {}) => {
  const authStore = useAuthStore();
  const userId = authStore.user.id;

  try {
    let url = `${API_URL}/todos?user_id=${userId}`;

    if (filter.completed !== undefined) {
      url += `&completed=${filter.completed}`;
    }

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
      completed: false,
    };

    const response = await axios.post(`${API_URL}/todos`, newTask);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};


const updateTask = async (taskId, updatedTaskData) => {
  try {
    if ('category' in updatedTaskData) {
      if (!allowedCategories.includes(updatedTaskData.category)) {
        throw new Error(`Invalid category. Must be one of: ${allowedCategories.join(', ')}`);
      }
    }

    const response = await axios.patch(`${API_URL}/todos/${taskId}`, updatedTaskData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

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
