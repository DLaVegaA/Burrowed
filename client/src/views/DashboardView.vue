<template>
  <div class="dashboard">
    <header class="top-bar">
      <h1>Panel de Control ESCOM</h1>
      <div class="user-info">
        <span>Hola, {{ authStore.usuario?.nombre }}</span>
        <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
      </div>
    </header>

    <main class="content">
      <div class="welcome-card">
        <h2>Bienvenido al Sistema de Gestión de Laboratorios</h2>
        <p>Has iniciado sesión correctamente como Profesor.</p>
        <div class="stats">
          <div class="stat-box">
            <h3>0</h3>
            <p>Solicitudes Activas</p>
          </div>
          <div class="stat-box">
            <h3>0</h3>
            <p>Grupos Asignados</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.dashboard { min-height: 100vh; background-color: #f5f7fa; }
.top-bar {
  background: #0066cc; color: white; padding: 1rem 2rem;
  display: flex; justify-content: space-between; align-items: center;
}
.btn-logout {
  background: #cc0000; color: white; border: none; padding: 0.5rem 1rem;
  border-radius: 4px; cursor: pointer; margin-left: 1rem;
}
.content { padding: 2rem; }
.welcome-card {
  background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.stats { display: flex; gap: 1rem; margin-top: 2rem; }
.stat-box {
  background: #f0f2f5; padding: 1.5rem; border-radius: 8px; text-align: center; min-width: 150px;
}
.stat-box h3 { font-size: 2rem; margin: 0; color: #0066cc; }
</style>