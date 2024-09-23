import { defineStore } from 'pinia';
import todoService from '../services/todoServices';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [], // Store the list of tasks
    filter: {
      category: '', // Filter by category
      completed: '', // Filter by completion status
    },
    loading: false, // Indicates if a request is in progress
    error: null, // Store any error messages
  }),

  actions: {
    // Fetch tasks with the applied filter
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const tasks = await todoService.getTasks(this.filter); // Call service to get tasks
        this.tasks = tasks; // Update tasks in the store
      } catch (error) {
        this.error = error.message; // Handle errors
      } finally {
        this.loading = false;
      }
    },

    // Create a new task and add it to the store
    async createTask(taskData) {
      this.loading = true;
      this.error = null;
      try {
        const newTask = await todoService.createTask(taskData); // Call service to create task
        this.tasks.push(newTask); // Add the new task to the list
      } catch (error) {
        this.error = error.message; // Handle errors
      } finally {
        this.loading = false;
      }
    },

    // Update an existing task
    async updateTask(taskId, updatedTaskData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedTask = await todoService.updateTask(taskId, updatedTaskData); // Call service to update task
        const index = this.tasks.findIndex(task => task.id === taskId); // Find the task in the list
        if (index !== -1) {
          this.tasks[index] = updatedTask; // Update the task in the store
        }
      } catch (error) {
        this.error = error.message; // Handle errors
      } finally {
        this.loading = false;
      }
    },

    // Delete a task from the store
    async deleteTask(taskId) {
      this.loading = true;
      this.error = null;
      try {
        await todoService.deleteTask(taskId); // Call service to delete task
        this.tasks = this.tasks.filter(task => task.id !== taskId); // Remove the task from the list
      } catch (error) {
        this.error = error.message; // Handle errors
      } finally {
        this.loading = false;
      }
    },

    // Apply new filters and fetch tasks based on the updated filter
    applyFilter(newFilter) {
      this.filter = { ...newFilter }; // Update the filter state
      this.fetchTasks(); // Fetch tasks with the new filter
    },    
  },
});
