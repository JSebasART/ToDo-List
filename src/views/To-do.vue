<template>
  <!-- Flex container for the entire page -->
  <div class="flex flex-col min-h-screen bg-cwhite">
    <!-- Main content container -->
    <div class="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-4 md:px-8 lg:px-12">
      
      <!-- Title and Logout button -->
      <div class="relative mb-8 flex flex-col md:flex-row justify-between items-center flex-wrap">
        <h2 class="text-4xl font-bold text-center w-full md:w-auto text-cblack">Your To-Do List</h2>
        <LogoutBtn class="mt-4 md:mt-0 md:ml-auto" />
      </div>

      <!-- Filters Section -->
      <div class="flex items-center justify-between mb-8 space-x-4 bg-cwhite-dark p-4 rounded-lg shadow-md w-full">
        <!-- Category filter -->
        <div class="flex items-center space-x-2">
          <label for="category" class="font-semibold text-cblack">Category:</label>
          <select v-model="todoStore.filter.category" @change="applyFilters" class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange">
            <option value="">All</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Personal">Personal</option>
            <option value="Etc">Etc</option>
          </select>
        </div>

        <!-- Status filter -->
        <div class="flex items-center space-x-2">
          <label for="completed" class="font-semibold text-cblack">Status:</label>
          <select v-model="todoStore.filter.completed" @change="applyFilters" class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange">
            <option value="">All</option>
            <option :value="true">Completed</option>
            <option :value="false">Pending</option>
          </select>
        </div>
      </div>

      <!-- Throbber for loading state -->
      <Throbber v-if="todoStore.loading" />

      <!-- Add New Task Button -->
      <button
        v-if="!showTaskForm && !todoStore.loading"
        @click="toggleTaskForm"
        class="bg-corange hover:bg-opacity-90 text-white py-2 px-4 mb-6 rounded-lg mx-auto block w-full md:w-auto font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
      >
        Add New Task
      </button>

      <!-- New Task Form -->
      <NewTaskForm
        v-if="showTaskForm"
        :taskData="taskEditData"
        @submit-task="saveTask"
        @cancel-task="toggleTaskForm"
      />

      <!-- Task Table -->
      <div v-if="!todoStore.loading" class="overflow-x-auto bg-cwhite-dark p-4 rounded-lg shadow-lg">
        <TaskTable
          :tasks="todoStore.tasks"
          :toggleComplete="toggleComplete"
          :editTask="editTask"
          :deleteTask="deleteTask"
        />
      </div>
    </div>

    <!-- Footer -->
    <Footerc/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TaskTable from "../components/TaskTable.vue";
import NewTaskForm from "../components/NewTaskForm.vue"; 
import LogoutBtn from "../components/LogoutBtn.vue";
import Footerc from "../components/Footer.vue";
import Throbber from "../components/Throbber.vue"; // Importing Throbber component
import { useTodoStore } from "../store/todoStore";

export default {
  components: {
    TaskTable,
    NewTaskForm,
    LogoutBtn,
    Footerc,
    Throbber, // Registering Throbber component
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

    // Fetch tasks when the component is mounted
    onMounted(() => {
      todoStore.fetchTasks();
    });

    // Save or update a task
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

    // Clear form fields
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

    // Edit an existing task
    const editTask = (task) => {
      taskEditData.value = { ...task };
      showTaskForm.value = true;
    };

    // Toggle task form visibility
    const toggleTaskForm = () => {
      showTaskForm.value = !showTaskForm.value;
    };

    // Toggle task completion status
    const toggleComplete = (taskId) => {
      const task = todoStore.tasks.find((task) => task.id === taskId);
      todoStore.updateTask(taskId, { completed: !task.completed });
    };

    // Delete a task
    const deleteTask = (taskId) => {
      todoStore.deleteTask(taskId);
    };

    // Apply filters for category and completion status
    const applyFilters = () => {
      todoStore.applyFilter({
        category: todoStore.filter.category,
        completed: todoStore.filter.completed,
      });
    };

    return {
      todoStore,
      taskEditData,
      saveTask,
      toggleComplete,
      deleteTask,
      editTask,
      showTaskForm,
      toggleTaskForm,
      applyFilters
    };
  },
};
</script>
