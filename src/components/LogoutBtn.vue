<template>
    <button @click="logout" class="logout-button">
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
  
  <style scoped>
  .logout-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .logout-button:hover {
    background-color: #d32f2f;
  }
  </style>