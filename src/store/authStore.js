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
    // Login action, handles user authentication and session storage
    async login(email, password) {
      try {
        const user = await authService.login(email, password); // Call login service
        this.user = user; 
        this.isAuthenticated = true; 
        this.errorMessage = '';

        sessionStorage.setItem('user', JSON.stringify(user)); // Store user in session storage

        return user;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        this.errorMessage = error.message;
      }
    },

    // Logout action, clears user data and session storage
    logout() {
      this.user = null; 
      this.isAuthenticated = false;
      this.errorMessage = '';

      sessionStorage.removeItem('user'); // Remove user from session storage
    },

    // Load user data from session storage when the app initializes
    loadUserFromSession() {
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser); // Restore user data from session storage
        this.isAuthenticated = true; // Set authentication status to true
      }
    },
  },
});
