<template>
    <table class="table-auto w-full text-left bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="px-4 py-2">Complete</th>
          <th class="px-4 py-2">Task</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Category</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.id"
          class="border-t border-gray-300 hover:bg-gray-100"
        >
          <td class="px-4 py-2 text-center">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleComplete(task.id)"
              class="form-checkbox h-5 w-5 text-green-600"
            />
          </td>
          <td class="px-4 py-2">{{ task.title }}</td>
          <td class="px-4 py-2">{{ task.description }}</td>
          <td class="px-4 py-2">{{ task.category }}</td>
          <td class="px-4 py-2">{{ task.date }}</td>
          <td class="px-4 py-2 flex items-center space-x-2">
            <!-- Edit Task Button (Pen Icon) -->
            <button
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg"
              @click="editTask(task)"
              aria-label="Edit Task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h2M8 6v1m8-1v1m1.5 6.72l1.5-1.52v4h-4l1.53-1.53-1.06-1.06a2.248 2.248 0 00-.438-.437m1.647 1.647L15 19l-6 6L2.47 18l6-6h5l2.5 2.5zM2 12V6" />
              </svg>
            </button>
  
            <!-- Delete Task Button (Red Cross Icon) -->
            <button
              class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
              @click="deleteTask(task.id)"
              aria-label="Delete Task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true,
      },
      toggleComplete: {
        type: Function,
        required: true,
      },
      editTask: {
        type: Function,
        required: true,
      },
      deleteTask: {
        type: Function,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  