import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import List from '../views/To-do.vue';
import Register from '../views/Register.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },{
    path: '/dashboard',
    name: 'List',
    component: List,
  },{
    path: '/register',
    name: 'Register',
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
