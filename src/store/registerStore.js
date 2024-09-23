// registerStore.js
import { defineStore } from 'pinia';
import authService from '../services/authServices';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    isRegistered: false, // Track registration status
    errorMessage: '', // Store any error messages
  }),

  actions: {
    async register(userData) {
      try {
        const newUser = await authService.register(userData); // Call registration service

        this.isRegistered = true; // Set registration status to true
        this.errorMessage = ''; // Clear error messages

        return newUser;
      } catch (error) {
        this.isRegistered = false; // Registration failed
        this.errorMessage = error.message || 'Registration failed'; // Set error message
      }
    },
  },
});
