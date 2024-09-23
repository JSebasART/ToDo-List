<template>
  <div class="min-h-screen flex flex-col bg-cwhite">
    <div class="max-w-md mx-auto mt-12 p-8 bg-cwhite-dark shadow-lg rounded-lg relative">
      <div class="relative mb-6">
        <button
          class="absolute left-0 px-4 py-2 bg-cblack text-white text-sm font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cblack flex items-center space-x-2"
          @click="goToLogin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="text-3xl font-bold text-center text-cblack">Join Us!!!</h2>
      </div>
      <!-- Registration Form -->
      <form @submit.prevent="registerUser" class="space-y-6">
        <div class="form-group">
          <label for="name" class="block text-cblack font-semibold mb-2">Name</label>
          <input
            type="text"
            v-model="name"
            id="name"
            required
            class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange"
          />
        </div>

        <div class="form-group">
          <label for="email" class="block text-cblack font-semibold mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            required
            class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange"
          />
        </div>

        <div class="form-group">
          <label for="password" class="block text-cblack font-semibold mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            required
            class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="block text-cblack font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            required
            class="w-full px-4 py-2 border border-cblack rounded-lg focus:outline-none focus:ring-2 focus:ring-corange"
          />
        </div>

        <button
          class="w-full py-2 bg-corange text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-corange"
          @click="handleRedirect"
        >
          Register
        </button>

        <p v-if="errorMessage" class="text-red-500 text-sm mt-4">{{ errorMessage }}</p>
      </form>
    </div>

    <!-- Footer -->
    <footerc class="mt-auto" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterStore } from '../store/registerStore';
import footerc from '../components/footer.vue';

export default {
  components: {
    footerc,
  },
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
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        store.errorMessage = 'All fields are required';
        return;
      }

      if (password.value !== confirmPassword.value) {
        store.errorMessage = 'Passwords do not match';
        return;
      }

      if (!validatePassword(password.value)) {
        store.errorMessage =
          'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 special character';
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

    const goToLogin = () => {
      router.push('/');
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      registerUser,
      handleRedirect,
      goToLogin,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Using your custom color scheme */
.bg-cwhite {
  background-color: #FAF7F0;
}

.bg-cwhite-dark {
  background-color: #D8D2C2;
}

.text-cblack {
  color: #4A4947;
}

.bg-corange {
  background-color: #B17457;
}

button:focus {
  box-shadow: 0 0 0 2px rgba(177, 116, 87, 0.5);
}
</style>
