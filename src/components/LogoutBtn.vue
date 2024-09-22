<template>
  <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
    Logout
  </button>
</template>

<script setup>
import { useAuthStore } from '../store/authStore.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/")
};
</script>
