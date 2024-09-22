<template>
  <li :class="{ completed: task.completed }">
    <div class="task-details">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p>Category: {{ task.category }}</p>
      <p>Date: {{ task.date }}</p>
    </div>
    <div class="task-actions">
      <button @click="$emit('toggle-complete', task.id)">
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>
      <button @click="$emit('edit-task', task)">Edit</button> <!-- Edit Button -->
      <button @click="$emit('delete-task', task.id)">Delete</button>
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

<style scoped>
li {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li.completed {
  text-decoration: line-through;
}

button {
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

.task-details {
  flex-grow: 1;
}

.task-actions {
  flex-shrink: 0;
}
</style>
