import { defineStore } from 'pinia';
import todoService from '../services/todoServices';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    filter: {
      category: '',
      completed: '',
    },
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const tasks = await todoService.getTasks(this.filter);
        this.tasks = tasks;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createTask(taskData) {
      this.loading = true;
      this.error = null;
      try {
        const newTask = await todoService.createTask(taskData);
        this.tasks.push(newTask);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateTask(taskId, updatedTaskData) {
      this.loading = true;
      this.error = null;
      try {
        const updatedTask = await todoService.updateTask(taskId, updatedTaskData);
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteTask(taskId) {
      this.loading = true;
      this.error = null;
      try {
        await todoService.deleteTask(taskId);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    applyFilter(newFilter) {
      this.filter = { ...this.filter, ...newFilter };
      this.fetchTasks();
    },
  },
});
