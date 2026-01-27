import { defineStore } from 'pinia';
import axios from '../api/axios'; // Usamos tu instancia configurada
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null, // Recuperar si ya existe
    usuario: JSON.parse(localStorage.getItem('usuario')) || null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token, // True si hay token
  },

  actions: {
    async login(correo, contrasena) {
      try {
        // Petición al Backend que acabamos de hacer
        const { data } = await axios.post('/auth/login/profesor', { 
          correo, 
          contrasena 
        });

        // Guardar datos en el Estado de Pinia
        this.token = data.token;
        this.usuario = data.usuario;

        // Guardar en LocalStorage (para que no se borre al F5)
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        // Redirigir al Home o Dashboard
        router.push('/dashboard'); 
        
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
      router.push('/login');
    }
  }
});