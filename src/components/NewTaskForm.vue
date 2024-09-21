<template>
    <div class="new-task-form">
      <h3>Add New Task</h3>
      <form @submit.prevent="addTask">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" v-model="newTask.title" id="title" required />
        </div>
  
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" v-model="newTask.category" id="category" required />
        </div>
  
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" v-model="newTask.date" id="date" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description (optional)</label>
          <input type="text" v-model="newTask.description" id="description" />
        </div>
  
        <button type="submit">Add Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref} from 'vue';
  import todoService from '../services/todoServices';
  
  export default {
    emits: ['task-added'], // Emit event when task is added
    setup(props, { emit }) {
      const newTask = ref({
        title: '',
        category: '',
        date: '',
        description: '',
      });
  
      const addTask = async () => {
        try {
          if (!newTask.value.title || !newTask.value.category || !newTask.value.date) {
            alert('Please fill in all required fields.');
            return;
          }
  
          // Send the new task to the service
          await todoService.createTask({
            ...newTask.value,
            completed: false, // Default to false
          });
  
          // Clear the form fields after submission
          newTask.value.title = '';
          newTask.value.category = '';
          newTask.value.date = '';
          newTask.value.description = '';
  
          // Emit an event to notify the parent that a task was added
          emit('task-added');
        } catch (error) {
          console.error('Error adding task:', error.message);
        }
      };
  
      return {
        newTask,
        addTask,
      };
    },
  };
  </script>
  
  <style scoped>
  .new-task-form {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  