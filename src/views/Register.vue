<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
      </div>

      <button class="register" @click="handleRedirect">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '../store/registerStore';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const store = useRegisterStore();
    const router = useRouter();

    const errorMessage = computed(() => store.errorMessage);

    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      return regex.test(password);
    };

    const registerUser = async () => {
      if (password.value !== confirmPassword.value) {
        store.errorMessage = 'Passwords do not match';
        return;
      }

      if (!validatePassword(password.value)) {
        store.errorMessage = 'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 special character';
        return;
      }

      await store.register({ name: name.value, email: email.value, password: password.value });

      if (store.isRegistered) {
        router.push('/');
      }
    };
    
    const handleRedirect = async () => {
      await registerUser();
      if (store.isRegistered) {
        router.push('/');
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      registerUser,
      handleRedirect,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
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
