<template>
  <div class="min-h-screen flex flex-col bg-cwhite">
    <div class="flex flex-col md:flex-row justify-between max-w-5xl mx-4 md:mx-auto mt-12 mb-8 p-8 shadow-lg bg-cwhite-dark rounded-lg">
      <div class="flex-1 pr-6">
        <h2 class="text-2xl font-bold mb-4 text-center text-cblack">Welcome to the To-Do List App</h2>
        <p class="mb-4 text-cblack">A well-organized to-do list is an essential tool for productivity. It helps you:</p>
        <ul class="list-disc list-inside mb-4 text-cblack">
          <li>Stay on top of your daily tasks</li>
          <li>Keep track of long-term goals</li>
          <li>Reduce stress by organizing your thoughts</li>
          <li>Increase motivation as you check off completed tasks</li>
        </ul>
        <p class="mt-4 text-cblack">
          Our app is designed to simplify your life by offering a clean, intuitive interface to manage your tasks. Simply log in and start organizing your day!
        </p>
      </div>
      <div class="flex-1 border-t md:border-l md:border-t-0 border-cblack pt-6 md:pt-0 md:pl-6">
        <h2 class="text-2xl font-bold mb-4 text-center text-cblack">Login</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div class="form-group">
            <label for="email" class="block text-cblack">Email</label>
            <input type="email" v-model="email" id="email" required class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange" />
          </div>
          <div class="form-group">
            <label for="password" class="block text-cblack">Password</label>
            <input type="password" v-model="password" id="password" required class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange" />
          </div>
          <button type="submit" class="w-full py-2 bg-corange text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-corange">Login</button>
          <button type="button" @click="redirectToRegister" class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-4 focus:outline-none">Register</button>
          <p v-if="errorMessage" class="text-red text-md font-semibold mt-4 p-3 rounded-lg mx-auto">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
    <Footerc class="mt-auto" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import Footerc from '../components/Footer.vue';

export default {
  components: {
    Footerc,
  },
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
