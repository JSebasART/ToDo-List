<template>
  <li :class="['flex justify-between items-center p-4 mb-4 rounded-lg', task.completed ? 'bg-gray-200 line-through' : 'bg-gray-100']">
    <!-- Task Details -->
    <div class="flex-grow">
      <h3 class="font-semibold text-lg">{{ task.title }}</h3>
      <p class="text-gray-600">{{ task.description }}</p>
      <p class="text-sm text-gray-500">Category: {{ task.category }}</p>
      <p class="text-sm text-gray-500">Date: {{ task.date }}</p>
    </div>

    <!-- Task Actions -->
    <div class="flex space-x-2">
      <button
        @click="$emit('toggle-complete', task.id)"
        class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
      >
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>
      <button
        @click="$emit('edit-task', task)"
        class="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
      >
        Edit
      </button>
      <button
        @click="$emit('delete-task', task.id)"
        class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    task: Object
  }
};
</script>
