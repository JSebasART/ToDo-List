<template>
  <div class="tasks-container">
    <h2>My To-Do List</h2>
    <div v-if="tasks.length === 0">No tasks found.</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description || 'No description' }}</p>
        <p>Category: {{ task.category }}</p>
        <p>Date: {{ task.date }}</p>
        <p>Status: {{ task.completed ? 'Completed' : 'Pending' }}</p>
        <button @click="toggleComplete(task.id, task.completed)">Toggle Complete</button>
        <button @click="deleteTask(task.id)">Delete Task</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import todoService from '../services/todoServices';

export default {
  setup() {
    const tasks = ref([]);

    const fetchTasks = async () => {
      try {
        tasks.value = await todoService.getTasks();
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    const toggleComplete = async (taskId, currentStatus) => {
      try {
        await todoService.updateTask(taskId, { completed: !currentStatus });
        fetchTasks(); // Refresh task list after update
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    };

    const deleteTask = async (taskId) => {
      try {
        await todoService.deleteTask(taskId);
        fetchTasks(); // Refresh task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error.message);
      }
    };

    onMounted(fetchTasks);

    return {
      tasks,
      toggleComplete,
      deleteTask,
    };
  },
};
</script>

<style scoped>
.tasks-container {
  max-width: 800px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 10px;
}

li.completed {
  text-decoration: line-through;
}

button {
  margin-right: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #38a374;
}
</style>
