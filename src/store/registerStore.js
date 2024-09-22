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
        const newUser = await authService.register(userData);

        this.isRegistered = true;
        this.errorMessage = '';

        return newUser;
      } catch (error) {
        this.isRegistered = false;
        this.errorMessage = error.message || 'Registration failed';
      }
    },
  },
});
