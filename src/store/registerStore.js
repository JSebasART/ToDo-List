// registerStore.js
import { defineStore } from 'pinia';
import authService from '../services/authServices';
export const useRegisterStore = defineStore('register', {
  state: () => ({
    isRegistered: false,
    errorMessage: '',
  }),

  actions: {
    async register(userData) {
      try {
        console.log('register');
        // Call the register method from the authService
        const newUser = await authService.register(userData);

        // Set registration success
        this.isRegistered = true;
        this.errorMessage = '';

        return newUser;
      } catch (error) {
        // Handle registration failure
        this.isRegistered = false;
        this.errorMessage = error.message || 'Registration failed';
      }
    },
  },
});
