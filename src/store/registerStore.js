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
        if (!userData.name) {
          throw new Error('Name is required');
        }
        if (!userData.email) {
          throw new Error('Email is required');
        }
        if (!userData.password) {
          throw new Error('Password is required');
        }

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
