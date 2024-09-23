<template>
  <div class="flex flex-col min-h-screen bg-cwhite">
    <div class="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-4 md:px-8 lg:px-12">
      <div class="relative mb-8 flex flex-col md:flex-row justify-between items-center flex-wrap">
        <h2 class="text-4xl font-bold text-center w-full md:w-auto text-cblack">Your To-Do List</h2>
        <LogoutBtn class="mt-4 md:mt-0 md:ml-auto" />
      </div>

      <div class="flex items-center justify-between mb-8 space-x-4 bg-cwhite-dark p-4 rounded-lg shadow-md w-full">
        <div class="flex items-center space-x-2">
          <label for="category" class="font-semibold text-cblack">Category:</label>
          <select v-model="todoStore.filter.category" @change="applyFilters" class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange">
            <option value="">All</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Personal">Personal</option>
            <option value="Etc">Etc</option>
          </select>
        </div>

        <div class="flex items-center space-x-2">
          <label for="completed" class="font-semibold text-cblack">Status:</label>
          <select v-model="todoStore.filter.completed" @change="applyFilters" class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange">
            <option value="">All</option>
            <option :value="true">Completed</option>
            <option :value="false">Pending</option>
          </select>
        </div>
      </div>

      <button
        v-if="!showTaskForm"
        @click="toggleTaskForm"
        class="bg-corange hover:bg-opacity-90 text-white py-2 px-4 mb-6 rounded-lg mx-auto block w-full md:w-auto font-semibold shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
      >
        Add New Task
      </button>

      <NewTaskForm
        v-if="showTaskForm"
        :taskData="taskEditData"
        @submit-task="saveTask"
        @cancel-task="toggleTaskForm"
      />

      <div class="overflow-x-auto bg-cwhite-dark p-4 rounded-lg shadow-lg">
        <TaskTable
          :tasks="todoStore.tasks"
          :toggleComplete="toggleComplete"
          :editTask="editTask"
          :deleteTask="deleteTask"
        />
      </div>

      <div v-if="todoStore.tasks.length === 0" class="text-center mt-8 text-cblack">
        <p>No tasks available</p>
      </div>
    </div>

    <Footerc/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import TaskTable from "../components/TaskTable.vue";
import NewTaskForm from "../components/NewTaskForm.vue"; 
import LogoutBtn from "../components/LogoutBtn.vue";
import Footerc from "../components/Footer.vue";
import { useTodoStore } from "../store/todoStore";

export default {
  components: {
    TaskTable,
    NewTaskForm,
    LogoutBtn,
    Footerc, 
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

