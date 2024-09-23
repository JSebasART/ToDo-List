<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full text-left bg-cwhite shadow-md rounded-lg">
      <thead>
        <tr class="bg-cblack text-white">
          <th class="px-4 py-3">Complete</th>
          <th class="px-4 py-3">Task</th>
          <th class="px-4 py-3">Description</th>
          <th class="px-4 py-3">Category</th>
          <th class="px-4 py-3">Date</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.id"
          :class="{
            'bg-cwhite-dark text-gray-500 line-through': task.completed,
            'hover:bg-cwhite-dark': !task.completed,
          }"
          class="border-t border-cblack transition-all duration-200 ease-in-out"
        >
          <!-- Task Complete Checkbox -->
          <td class="px-4 py-3 text-center">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleComplete(task.id)"
              class="form-checkbox h-5 w-5 text-corange focus:ring-corange cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            />
          </td>

          <!-- Task Title -->
          <td class="px-4 py-3">{{ task.title }}</td>

          <!-- Task Description -->
          <td class="px-4 py-3">{{ task.description }}</td>

          <!-- Task Category -->
          <td class="px-4 py-3">{{ task.category }}</td>

          <!-- Task Date -->
          <td class="px-4 py-3">{{ task.date }}</td>

          <!-- Task Actions (Edit and Delete Buttons) -->
          <td class="px-4 py-3 flex items-center space-x-2">
            <!-- Edit Task Button (Pen Icon) -->
            <button
              class="edit-button p-2 text-corange hover:text-opacity-80 rounded-lg transition-transform duration-200 ease-in-out hover:scale-110"
              @click="editTask(task)"
              aria-label="Edit Task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 4h2m4.418 2.418l1.664-1.664a1.5 1.5 0 112.121 2.121l-1.664 1.664-6.05 6.05a2.5 2.5 0 01-1.415.586l-4 1a1 1 0 01-1.257-1.257l1-4a2.5 2.5 0 01.586-1.415l6.05-6.05z" />
              </svg>
            </button>

            <!-- Delete Task Button (Red Cross Icon) -->
            <button
              class="delete-button p-2 text-red-500 hover:text-red-700 rounded-lg transition-transform duration-200 ease-in-out hover:scale-110"
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
  </div>
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
.edit-button {
  transition: transform 0.2s ease;
}

.edit-button:hover {
  transform: scale(1.1);
}

.delete-button {
  transition: transform 0.2s ease;
}

.delete-button:hover {
  transform: scale(1.1);
}

.table-auto {
  border-collapse: collapse;
}

th, td {
  white-space: nowrap;
}

th {
  background-color: #4A4947; /* Using cblack for the header */
  color: white;
  font-weight: bold;
}

td {
  background-color: #FAF7F0; /* Using cwhite for rows */
}

input[type="checkbox"] {
  transition: transform 0.2s ease-in-out;
}

input[type="checkbox"]:hover {
  transform: scale(1.1);
}
</style>
