import { defineStore } from 'pinia';
import axios from '../api/axios';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    usuario: JSON.parse(localStorage.getItem('usuario')) || null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(correo, contrasena) {
      try {
        // CAMBIO CLAVE: Ahora apuntamos a la ruta universal
        const { data } = await axios.post('/auth/login', { 
          correo, 
          contrasena 
        });

        // Guardar datos en Pinia
        this.token = data.token;
        this.usuario = data.usuario;

        // Guardar en LocalStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        // Retornamos true para que Login.vue sepa que puede redirigir
        return true;

      } catch (error) {
        console.error("Error de login:", error.response?.data?.message);
        throw error.response?.data?.message || "Error de conexión";
      }
    },

    logout() {
      this.token = null;
      this.usuario = null;
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      // El logout sí lo forzamos desde aquí para mayor seguridad
      router.push('/login');
    }
  }
});