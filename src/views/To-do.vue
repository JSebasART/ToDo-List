<template>
  <div class="tasks-container">
    <h2>My To-Do List</h2>

    <div class="filter-section">
      <label for="category">Category:</label>
      <select v-model="filter.category">
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Misc">Misc</option>
      </select>

      <label for="completed">Status:</label>
      <select v-model="filter.completed">
        <option value="">All</option>
        <option :value="true">Completed</option>
        <option :value="false">Pending</option>
      </select>

      <button @click="applyFilter">Apply Filter</button>
    </div>

    <button @click="toggleNewTaskForm">{{ showNewTaskForm ? 'Cancel' : 'New Task' }}</button>

    <NewTaskForm v-if="showNewTaskForm" @task-added="fetchTasksAndHideForm" />

    <div v-if="tasks.length === 0">No tasks found.</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <div v-if="editingTaskId === task.id">
          <form @submit.prevent="updateTask(task.id)">
            <div class="form-group">
              <input type="text" v-model="taskEditData.title" placeholder="Task Title" required />
            </div>
            <div class="form-group">
              <input type="text" v-model="taskEditData.category" placeholder="Category" required />
            </div>
            <div class="form-group">
              <input type="date" v-model="taskEditData.date" placeholder="Date" required />
            </div>
            <div class="form-group">
              <input type="text" v-model="taskEditData.description" placeholder="Description (optional)" />
            </div>
            <button type="submit">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </form>
        </div>

        <div v-else>
          <h3>{{ task.title }}</h3>
          <p>{{ task.description || 'No description' }}</p>
          <p>Category: {{ task.category }}</p>
          <p>Date: {{ task.date }}</p>
          <p>Status: {{ task.completed ? 'Completed' : 'Pending' }}</p>
          <button @click="toggleComplete(task.id, task.completed)">Toggle Complete</button>
          <button @click="startEdit(task)">Edit Task</button>
          <button @click="deleteTask(task.id)">Delete Task</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import todoService from '../services/todoServices';
import NewTaskForm from '../components/NewTaskForm.vue';

export default {
  components: {
    NewTaskForm,
  },
  setup() {
    const tasks = ref([]);
    const showNewTaskForm = ref(false);
    const editingTaskId = ref(null);
    const taskEditData = ref({
      title: '',
      category: '',
      date: '',
      description: '',
    });
    const filter = ref({
      category: '',
      completed: '',
    });

    const fetchTasks = async () => {
      try {
        tasks.value = await todoService.getTasks(filter.value);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    const fetchTasksAndHideForm = async () => {
      await fetchTasks();
      showNewTaskForm.value = false;
    };

    const toggleNewTaskForm = () => {
      showNewTaskForm.value = !showNewTaskForm.value;
    };

    const toggleComplete = async (taskId, currentStatus) => {
      try {
        await todoService.updateTask(taskId, { completed: !currentStatus });
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    };

    const deleteTask = async (taskId) => {
      try {
        await todoService.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error.message);
      }
    };

    // Start editing a task
    const startEdit = (task) => {
      editingTaskId.value = task.id;
      taskEditData.value = {
        title: task.title,
        category: task.category,
        date: task.date,
        description: task.description || '',
      };
    };

    // Cancel the editing
    const cancelEdit = () => {
      editingTaskId.value = null;
      taskEditData.value = {
        title: '',
        category: '',
        date: '',
        description: '',
      };
    };

    // Update the task
    const updateTask = async (taskId) => {
      try {
        await todoService.updateTask(taskId, {
          title: taskEditData.value.title,
          category: taskEditData.value.category,
          date: taskEditData.value.date,
          description: taskEditData.value.description,
        });
        cancelEdit();
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    };

    const applyFilter = () => {
      fetchTasks();
    };

    onMounted(fetchTasks);

    return {
      tasks,
      showNewTaskForm,
      toggleNewTaskForm,
      fetchTasksAndHideForm,
      toggleComplete,
      deleteTask,
      startEdit,
      updateTask,
      cancelEdit,
      filter,
      applyFilter,
      editingTaskId,
      taskEditData,
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

.filter-section {
  margin-bottom: 20px;
}

.filter-section select {
  margin-right: 10px;
}

.filter-section button {
  margin-left: 10px;
}
</style>
