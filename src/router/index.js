import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import List from '../views/To-do.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
