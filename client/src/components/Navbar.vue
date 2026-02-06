<template>
  <nav class="navbar-wrapper">
    <div class="navbar-card">
      
      <div class="nav-brand">
        <img src="/logo_burrowed_letras.png" alt="Burrowed" class="logo" />
      </div>

      <div class="nav-menu">
        <router-link to="/dashboard" class="nav-item">Inicio</router-link>
        <router-link to="/inventario" class="nav-item">Inventario</router-link>

        <template v-if="esProfesor">
          <router-link to="/solicitar-material" class="nav-item">Solicitar Material</router-link>
          <router-link to="/mis-solicitudes" class="nav-item">Mis Solicitudes</router-link>
        </template>

        <template v-if="esTecnico">
          <router-link to="/entregas" class="nav-item">Entregas</router-link>
        </template>
      </div>

      <div class="nav-user">
        <span class="user-name">{{ nombreUsuario }}</span>
        <button @click="logout" class="btn-logout">➜</button>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const nombreUsuario = computed(() => authStore.usuario?.nombre || 'Usuario');
const rol = computed(() => authStore.usuario?.rol);

const esProfesor = computed(() => rol.value === 'Profesor');
const esTecnico = computed(() => rol.value === 'Tecnico');

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.navbar-wrapper {
  padding: 20px 40px; /* Margen externo */
  position: sticky; top: 0; z-index: 100;
  background-color: #f4f6f9; /* Se funde con el fondo */
}

.navbar-card {
  background-color: #0A4275; /* AZUL BURROWED */
  height: 70px;
  border-radius: 35px; /* BORDES REDONDEADOS */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 5px 15px rgba(10, 66, 117, 0.2);
  color: white;
}

.logo { height: 35px; }

.nav-menu { display: flex; gap: 20px; }

.nav-item {
  color: #B0C4DE; /* Azul claro para texto normal */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-item:hover, .nav-item.router-link-active {
  color: white; /* Blanco al estar activo */
  font-weight: 700;
}

.nav-user { display: flex; align-items: center; gap: 15px; font-size: 0.9rem; }

.btn-logout {
  background: white; color: #0A4275; border: none;
  width: 30px; height: 30px; border-radius: 50%;
  cursor: pointer; font-weight: bold;
}
</style>