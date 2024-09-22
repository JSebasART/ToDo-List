<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main content -->
    <div class="flex flex-col md:flex-row justify-between max-w-5xl mx-auto mt-12 mb-8 p-8 shadow-lg bg-cwhite rounded-lg">
      <!-- Information about the app -->
      <div class="flex-1 pr-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Welcome to the To-Do List App</h2>
        <p class="mb-4">A well-organized to-do list is an essential tool for productivity. It helps you:</p>
        <ul class="list-disc list-inside mb-4">
          <li>Stay on top of your daily tasks</li>
          <li>Keep track of long-term goals</li>
          <li>Reduce stress by organizing your thoughts</li>
          <li>Increase motivation as you check off completed tasks</li>
        </ul>
        <p class="mt-4">
          Our app is designed to simplify your life by offering a clean, intuitive interface to manage your tasks. Simply log in and start organizing your day!
        </p>
      </div>
      <!-- Login form -->
      <div class="flex-1 border-t md:border-l md:border-t-0 border-gray-300 pt-6 md:pt-0 md:pl-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div class="form-group">
            <label for="email" class="block text-gray-700">Email</label>
            <input type="email" v-model="email" id="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div class="form-group">
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" v-model="password" id="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" class="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none">Login</button>
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
          <button type="button" @click="redirectToRegister" class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mt-4 focus:outline-none">Register</button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footerc class="mt-auto" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import footerc from '../components/footer.vue';

export default {
  components: {
    footerc,
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