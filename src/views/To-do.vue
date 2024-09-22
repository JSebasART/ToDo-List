<template>
  <div class="tasks-container">
    <h2>Your To-Do List</h2>
    <LogoutBtn />
    
    <div class="filter-section">
      <label for="category">Category:</label>
      <select v-model="todoStore.filter.category">
        <option value="">All</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Personal">Personal</option>
        <option value="Etc">Etc</option>
      </select>

      <label for="completed">Status:</label>
      <select v-model="todoStore.filter.completed">
        <option value="">All</option>
        <option :value="true">Completed</option>
        <option :value="false">Pending</option>
      </select>

      <button @click="applyFilter">Apply Filter</button>
    </div>

    <button v-if="!showTaskForm" @click="toggleTaskForm" class="add-task-button">Add New Task</button>

    <ul id="tasks">
      <TaskItem
        v-for="task in todoStore.tasks"
        :key="task.id"
        :task="task"
        @toggle-complete="toggleComplete"
        @delete-task="deleteTask"
        @edit-task="editTask"
      />
    </ul>

    <div v-if="todoStore.tasks.length === 0">
      <p>No tasks available</p>
    </div>
    
    <div v-if="showTaskForm">
      <form @submit.prevent="saveTask">
        <div>
          <label for="title">Title:</label>
          <input type="text" v-model="taskEditData.title" id="title" required />
        </div>
        <div>
          <label for="category">Category:</label>
          <select v-model="taskEditData.category" id="category" required>
            <option value="Trabajo">Trabajo</option>
            <option value="Personal">Personal</option>
            <option value="Etc">Etc</option>
          </select>
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" v-model="taskEditData.date" id="date" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" v-model="taskEditData.description" id="description" />
        </div>
        <button type="submit">{{ taskEditData.id ? 'Update Task' : 'Add Task' }}</button>
        <button type="button" @click="toggleTaskForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TaskItem from "../components/TaskItem.vue";
import { useTodoStore } from "../store/todoStore";
import LogoutBtn from "../components/LogoutBtn.vue";

export default {
  components: {
    TaskItem,
    LogoutBtn,
  },
  setup() {
    const todoStore = useTodoStore();
    const taskEditData = ref({
      id: null,
      title: "",
      category: "",
      date: "",
      description: "",
    });
    const showTaskForm = ref(false);

    onMounted(() => {
      todoStore.fetchTasks();
    });

    const saveTask = () => {
      if (taskEditData.value.id) {
        todoStore.updateTask(taskEditData.value.id, {
          title: taskEditData.value.title,
          category: taskEditData.value.category,
          date: taskEditData.value.date,
          description: taskEditData.value.description,
        });
      } else {
        todoStore.createTask(taskEditData.value);
      }
      clearForm();
    };

    const clearForm = () => {
      taskEditData.value = {
        id: null,
        title: "",
        category: "",
        date: "",
        description: "",
      };
      showTaskForm.value = false;
    };

    const editTask = (task) => {
      taskEditData.value = { ...task };
      showTaskForm.value = true;
    };

    const toggleTaskForm = () => {
      showTaskForm.value = !showTaskForm.value;
    };

    const toggleComplete = (taskId) => {
      const task = todoStore.tasks.find((task) => task.id === taskId);
      todoStore.updateTask(taskId, { completed: !task.completed });
    };

    const deleteTask = (taskId) => {
      todoStore.deleteTask(taskId);
    };

    const applyFilter = () => {
      todoStore.applyFilter(todoStore.filter);
    };

    return {
      todoStore,
      taskEditData,
      saveTask,
      toggleComplete,
      deleteTask,
      editTask,
      applyFilter,
      showTaskForm,
      toggleTaskForm,
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

.filter-section {
  margin-bottom: 20px;
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

.add-task-button {
  background-color: #007bff;
  margin-bottom: 20px;
}

.add-task-button:hover {
  background-color: #0056b3;
}
</style>
