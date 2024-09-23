<template>
  <button 
    @click="logout" 
    class="bg-corange text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:bg-opacity-90 transition duration-200 ease-in-out transform hover:scale-105"
  >
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
  router.push("/");
};
</script>
