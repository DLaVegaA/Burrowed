import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirigir inicio al login
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: () => import('../views/DashboardView.vue') // Crea un archivo vacío aquí si no existe
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;