<template>
  <div class="login-container">
    <div class="info-section">
      <h2>Welcome to the To-Do List App</h2>
      <p>A well-organized to-do list is an essential tool for productivity. It helps you:</p>
      <ul>
        <li>Stay on top of your daily tasks</li>
        <li>Keep track of long-term goals</li>
        <li>Reduce stress by organizing your thoughts</li>
        <li>Increase motivation as you check off completed tasks</li>
      </ul>
      <p>
        Our app is designed to simplify your life by offering a clean, intuitive interface to manage your tasks. Simply
        log in and start organizing your day!
      </p>
    </div>
    <div class="login-section">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button class="register" type="button" @click="redirectToRegister">Register</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { ref ,computed} from 'vue';
  import { useRouter } from 'vue-router';
  import {useAuthStore} from '../store/authStore';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const store = useAuthStore();
      const router = useRouter();
      const errorMessage = computed(() => store.errorMessage);
      
      const login = async () => {
        await store.login(email.value, password.value);
        if (store.isAuthenticated) {
          router.push('/dashboard');
        }
      };

      const redirectToRegister = () => {
        router.push('/register');
      };
  
      return {
        email,
        password,
        login,
        redirectToRegister,
        errorMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: space-between;
    max-width: 900px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 10px;
  }
  
  .info-section {
    flex: 1;
    padding-right: 20px;
  }
  
  h2 {
    margin-bottom: 15px;
  }
  
  ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  ul li {
    margin-bottom: 8px;
  }
  
  p {
    margin-top: 10px;
  }
  
  .login-section {
    flex: 1;
    border-left: 1px solid #e0e0e0;
    padding-left: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .register{
    background-color:lightblue;
    margin-top: 2vh;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }

  </style>
  