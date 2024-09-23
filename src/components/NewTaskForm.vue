<template>
  <div class="mt-6 mb-4 bg-cwhite-dark p-6 rounded-lg shadow-lg">
    <form @submit.prevent="submitTask" class="space-y-6">
      <!-- Title Input -->
      <div class="flex flex-col">
        <label for="title" class="font-semibold text-cblack mb-2">Title:</label>
        <input
          type="text"
          v-model="taskData.title"
          id="title"
          required
          class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange"
        />
      </div>

      <!-- Category Select -->
      <div class="flex flex-col">
        <label for="category" class="font-semibold text-cblack mb-2">Category:</label>
        <select 
          v-model="taskData.category" 
          id="category" 
          required 
          class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange"
        >
          <option value="Trabajo">Trabajo</option>
          <option value="Personal">Personal</option>
          <option value="Etc">Etc</option>
        </select>
      </div>

      <!-- Date Input -->
      <div class="flex flex-col">
        <label for="date" class="font-semibold text-cblack mb-2">Date:</label>
        <input
          type="date"
          v-model="taskData.date"
          id="date"
          required
          class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange"
        />
      </div>

      <!-- Description Input -->
      <div class="flex flex-col">
        <label for="description" class="font-semibold text-cblack mb-2">Description:</label>
        <input
          type="text"
          v-model="taskData.description"
          id="description"
          class="border border-cblack rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-corange"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4 mb-4">
        <button
          type="submit"
          class="bg-corange hover:bg-opacity-90 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105"
        >
          {{ taskData.id ? 'Update Task' : 'Add Task' }}
        </button>
        <button 
          type="button" 
          @click="cancelTask" 
          class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    taskData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitTask() {
      this.$emit('submit-task');
    },
    cancelTask() {
      this.$emit('cancel-task');
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
