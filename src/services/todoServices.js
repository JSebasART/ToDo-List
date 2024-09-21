import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const API_URL = 'http://localhost:3000'; 

const getTasks = async () => {
  const authStore = useAuthStore();
  const userId = authStore.user.id;

  try {
    const response = await axios.get(`${API_URL}/todos`, {
      params: { user_id: userId },
    });
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
