<template>
  <div class="max-w-3xl mx-auto py-8 px-4 relative">
    <div class="relative mb-8 flex justify-between items-center flex-wrap">
      <h2 class="text-3xl font-bold text-center w-full md:w-auto">Your To-Do List</h2>
      <LogoutBtn class="mt-4 md:mt-0 md:ml-auto" />
    </div>

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

      <button @click="applyFilter" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full md:w-auto">
        Apply Filter
      </button>
    </div>

    <button
      v-if="!showTaskForm"
      @click="toggleTaskForm"
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-6 rounded-lg mx-auto block w-full md:w-auto"
    >
      Add New Task
    </button>

    <div class="overflow-x-auto">
      <TaskTable
        :tasks="todoStore.tasks"
        :toggleComplete="toggleComplete"
        :editTask="editTask"
        :deleteTask="deleteTask"
      />
    </div>

    <div v-if="todoStore.tasks.length === 0" class="text-center mt-8 text-gray-500">
      <p>No tasks available</p>
    </div>

    <NewTaskForm
      v-if="showTaskForm"
      :taskData="taskEditData"
      @submit-task="saveTask"
      @cancel-task="toggleTaskForm"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import TaskTable from "../components/TaskTable.vue";
import NewTaskForm from "../components/NewTaskForm.vue"; 
import LogoutBtn from "../components/LogoutBtn.vue";
import { useTodoStore } from "../store/todoStore";

export default {
  components: {
    TaskTable,
    NewTaskForm,
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
</style>
