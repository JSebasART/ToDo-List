// authStore.js
import { defineStore } from 'pinia';
import authService from '../services/authServices';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    isAuthenticated: !!sessionStorage.getItem('user'),
    errorMessage: '',
  }),

  actions: {
    async login(email, password) {
      try {
        const user = await authService.login(email, password);

        this.user = user;
        this.isAuthenticated = true;
        this.errorMessage = '';

        sessionStorage.setItem('user', JSON.stringify(user));

        return user;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        this.errorMessage = error.message;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.errorMessage = '';

      sessionStorage.removeItem('user');
    },

    loadUserFromSession() {
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        this.isAuthenticated = true;
      }
    },
  },
});
