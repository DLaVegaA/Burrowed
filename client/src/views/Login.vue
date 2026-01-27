<template>
  <div class="login-page">
    <div class="login-card">
      
      <div class="brand-section">
        <div class="header-text">
          <button class="back-btn">←</button> 
        </div>
        <div class="logos-container">
          <img src="/logo_burrowed_letras.png" alt="Burrowed" class="logo-burro" />
          <div class="divider"></div>
          <img src="/logo_escom.png" alt="ESCOM" class="logo-escom" />
        </div>
      </div>

      <div class="form-section">
        
        <div class="section-header">
          <h2 class="welcome-title">Bienvenida Comunidad ESCOM</h2>
          <h2 class="identify-subtitle">Identifícate</h2>
        </div>

        <form @submit.prevent="handleLogin" class="main-form">
          
          <div class="section-inputs">
            <p class="instruction">Tu material de laboratorio en un sólo lugar</p>
            
            <input 
              v-model="correo" 
              type="email" 
              placeholder="Correo" 
              required
            />

            <input 
              v-model="contrasena" 
              type="password" 
              placeholder="Contraseña" 
              required
            />

            <a href="#" class="forgot-pass">Recuperar Contraseña</a>
            
            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
          </div>
          
          <div class="section-footer">
            <button type="submit" :disabled="cargando" class="btn-login">
              {{ cargando ? 'Entrando...' : 'Iniciar sesión' }}
            </button>
            </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const correo = ref('');
const contrasena = ref('');
const errorMsg = ref('');
const cargando = ref(false);

const handleLogin = async () => {
  cargando.value = true;
  errorMsg.value = '';
  try {
    await authStore.login(correo.value, contrasena.value);
  } catch (error) {
    errorMsg.value = "Credenciales incorrectas"; // Mensaje simple
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
/* FUENTE (Opcional: Importar Google Fonts en index.html si quieres la exacta) */
* { box-sizing: border-box;}

/* FONDO BLANCO GENERAL */
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

/* TARJETA AZUL GRANDE */
.login-card {
  display: flex;
  width: 1000px;
  height: 600px;
  background-color: #0A4275;
  border-radius: 60px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  color: white;
}

/* LADO IZQUIERDO (Logos) */
.brand-section {
  width: 50%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.back-btn {
  position: absolute; 
  top: 30px; 
  left: 30px;
  background: none; 
  border: none; 
  color: white; 
  font-size: 2rem; 
  cursor: pointer;
}

.logos-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.logo-burro { height: 160px;}
.logo-escom { height: 140px;}

.divider {
  width: 2px; height: 150px; background-color: white;
}

/* LADO DERECHO (Formulario) */
.form-section {
  width: 50%;
  padding: 2rem 3rem; /* Padding general para que nada toque los bordes de la tarjeta */
  display: flex;
  flex-direction: column;
  height: 100%; /* Importante para que el flex funcione */
}

/* 1. SECCIÓN DE ARRIBA (Títulos) */
.section-header {
  flex: 1; /* NUEVO: Ocupa espacio para empujar el texto al centro */
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  /* justify-content: center; */ /* Centra el texto verticalmente en su área */
  text-align: center;
}

.welcome-title { 
    font-weight: 300; 
    font-size: 1.5rem; 
    margin: 0; 
}

.identify-subtitle { 
    font-weight: 300; 
    font-size: 1.5rem; 
    margin: 0;
}

/* 2. SECCIÓN DE EN MEDIO (Inputs) */
/* El <form> actúa como contenedor del bloque 2 y 3, pero visualmente controlamos los inputs aquí */
.main-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;/* MAGIA: Esto hace que el form ocupe todo el espacio sobrante */
}

.section-inputs {
  flex-grow: 1; /* MAGIA X2: Esto empuja los inputs al centro y el botón al fondo */
  display: flex; 
  flex-direction: column; 
  margin-top: 20px;
  margin-bottom: 10px;
  /* justify-content: center; */ /* Centra los inputs verticalmente en su espacio */

  width: 100%; /* IMPORTANTE: Ocupa todo el espacio Horizontal */
  align-items: stretch; /* Estira los hijos para tocar los bordes */
}

.instruction { 
    font-size: 0.9rem; 
    /* margin-bottom: 1.5rem;  */
    opacity: 0.9; 
    text-align: left; 
}

form {
  display: flex; flex-direction: column; align-items: center; width: 100%;
}

.input-group {
  width: 80%;
  margin-bottom: 1rem;
}

input {
  width: 100%; padding: 15px; margin-bottom: 15px;
  border-radius: 8px; border: none; font-size: 1rem; outline: none;
}

.forgot-pass {
  color: white; font-size: 0.9rem; text-decoration: underline;
  margin-top: 5px; cursor: pointer; display: inline-block;
}

/* 3. SECCIÓN DE ABAJO (Botón) */
.section-footer {
  flex: 1; /* NUEVO: Ocupa espacio para despegarse del fondo */
  display: flex;
  justify-content: center; /* CAMBIO: Centrado horizontalmente (antes era flex-end) */
  align-items: center;     /* Centrado verticalmente en su área */
  padding-top: 0;          /* Quitamos padding innecesario */
}

.btn-login {
  background-color: #B0C4DE; 
  color: #003B5C;
  font-weight: bold; font-size: 1.1rem;
  padding: 12px 60px;
  border: none; border-radius: 10px;
  cursor: pointer; transition: transform 0.2s;
}

.btn-login:hover { transform: scale(1.05); background-color: white; }
.error-msg { color: #ff6b6b; margin-top: 10px; }
</style>