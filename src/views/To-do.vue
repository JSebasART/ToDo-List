<template>
  <div class="max-w-3xl mx-auto py-8 px-4 relative">
    <!-- Header with centered heading and Logout Button -->
    <div class="relative mb-8">
      <h2 class="text-3xl font-bold text-center">Your To-Do List</h2>
      <LogoutBtn class="absolute top-0 right-0" />
    </div>

    <!-- Filter Section -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-6">
      <div class="flex items-center space-x-2">
        <label for="category" class="font-semibold">Category:</label>
        <select v-model="todoStore.filter.category" class="border border-gray-300 rounded-lg p-2">
          <option value="">All</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Personal">Personal</option>
          <option value="Etc">Etc</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <label for="completed" class="font-semibold">Status:</label>
        <select v-model="todoStore.filter.completed" class="border border-gray-300 rounded-lg p-2">
          <option value="">All</option>
          <option :value="true">Completed</option>
          <option :value="false">Pending</option>
        </select>
      </div>

      <button @click="applyFilter" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
        Apply Filter
      </button>
    </div>

    <!-- Add New Task Button -->
    <button
      v-if="!showTaskForm"
      @click="toggleTaskForm"
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-6 rounded-lg mx-auto block"
    >
      Add New Task
    </button>

    <!-- Tasks Table Component -->
    <TaskTable
      :tasks="todoStore.tasks"
      :toggleComplete="toggleComplete"
      :editTask="editTask"
      :deleteTask="deleteTask"
    />

    <!-- No Tasks Available -->
    <div v-if="todoStore.tasks.length === 0" class="text-center mt-8 text-gray-500">
      <p>No tasks available</p>
    </div>

    <!-- Task Form -->
    <div v-if="showTaskForm" class="mt-6">
      <form @submit.prevent="saveTask" class="space-y-6">
        <div class="flex flex-col">
          <label for="title" class="font-semibold mb-2">Title:</label>
          <input
            type="text"
            v-model="taskEditData.title"
            id="title"
            required
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="category" class="font-semibold mb-2">Category:</label>
          <select v-model="taskEditData.category" id="category" required class="border border-gray-300 rounded-lg p-2">
            <option value="Trabajo">Trabajo</option>
            <option value="Personal">Personal</option>
            <option value="Etc">Etc</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="date" class="font-semibold mb-2">Date:</label>
          <input
            type="date"
            v-model="taskEditData.date"
            id="date"
            required
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="font-semibold mb-2">Description:</label>
          <input
            type="text"
            v-model="taskEditData.description"
            id="description"
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex space-x-4">
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            {{ taskEditData.id ? 'Update Task' : 'Add Task' }}
          </button>
          <button type="button" @click="toggleTaskForm" class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TaskTable from "../components/TaskTable.vue"; // Importing TaskTable component
import LogoutBtn from "../components/LogoutBtn.vue";
import { useTodoStore } from "../store/todoStore";

export default {
  components: {
    TaskTable,
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
