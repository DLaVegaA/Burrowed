<template>
  <div class="page-container">
    <h1>Nueva Solicitud de Material</h1>
    
    <div class="layout-grid">
      
      <div class="card material-list">
        <h3>1. Selecciona Materiales</h3>
        <input v-model="busqueda" type="text" placeholder="Buscar material..." class="search-input" />
        
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Disp.</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in materialesFiltrados" :key="item.id_material">
                <td>
                  <strong>{{ item.nombre_material }}</strong><br>
                  <small>{{ item.modelo }}</small>
                </td>
                <td>
                  <span :class="item.estado_disponibilidad === 'Disponible' ? 'tag-ok' : 'tag-bad'">
                    {{ item.estado_disponibilidad }}
                  </span>
                </td>
                <td>
                  <button 
                    @click="agregarAlCarrito(item)" 
                    :disabled="item.estado_disponibilidad !== 'Disponible'"
                    class="btn-add"
                  >
                    + Agregar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card resumen-card">
        <h3>2. Detalles del Préstamo</h3>
        
        <div class="form-group">
          <label>Fecha de Uso:</label>
          <input type="datetime-local" v-model="fechaUso" class="form-input" />
        </div>

        <div class="form-group">
          <label>Grupo:</label>
          <select v-model="grupoSeleccionado" class="form-input">
            <option disabled value="">Selecciona un grupo</option>
            <option value="1">3CV1 - Microcontroladores</option>
            <option value="2">1CM4 - Física Clásica</option>
          </select>
        </div>

        <hr />

        <h3>3. Carrito ({{ carrito.length }})</h3>
        <ul class="carrito-list">
          <li v-for="(item, index) in carrito" :key="index">
            <span>{{ item.nombre_material }}</span>
            <button @click="quitarDelCarrito(index)" class="btn-remove">✖</button>
          </li>
          <li v-if="carrito.length === 0" class="empty-msg">No has seleccionado nada.</li>
        </ul>

        <button @click="enviarSolicitud" class="btn-primary" :disabled="carrito.length === 0">
          Confirmar Solicitud
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '../api/axios';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Estados
const materiales = ref([]);
const carrito = ref([]);
const busqueda = ref('');
const fechaUso = ref('');
const grupoSeleccionado = ref('');

// Cargar materiales al iniciar
/* onMounted(async () => {
  try {
    const { data } = await axios.get('/materiales');
    materiales.value = data;
  } catch (error) {
    console.error("Error cargando materiales", error);
  }
}); */

onMounted(async () => {
  try {
    // 1. Cargar Materiales (Esto SÍ déjalo real para ver tu inventario)
    const resMateriales = await axios.get('/materiales');
    materiales.value = resMateriales.data;

    // 2. DATOS FALSOS PARA PROBAR VISUALMENTE
    // (Borra esto cuando ya tengas el backend de grupos listo)
    listaGrupos.value = [
      { id_grupo: 1, codigo_grupo: '3CV1', Materium: { nombre_materia: 'Microcontroladores' } },
      { id_grupo: 2, codigo_grupo: '1CM12', Materium: { nombre_materia: 'Física Clásica' } },
      { id_grupo: 3, codigo_grupo: '2TV4', Materium: { nombre_materia: 'Circuitos' } }
    ];
    
  } catch (error) {
    console.error("Error cargando datos", error);
  }
});

// Filtrado de búsqueda
const materialesFiltrados = computed(() => {
  return materiales.value.filter(m => 
    m.nombre_material.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// Lógica del Carrito
const agregarAlCarrito = (item) => {
  // Evitar duplicados si es un activo único (opcional)
  if (!carrito.value.find(i => i.id_material === item.id_material)) {
    carrito.value.push(item);
  } else {
    alert("Este material ya está en la lista");
  }
};

const quitarDelCarrito = (index) => {
  carrito.value.splice(index, 1);
};

// Enviar al Backend
const enviarSolicitud = async () => {
  if (!fechaUso.value || !grupoSeleccionado.value) {
    alert("Por favor completa la fecha y el grupo");
    return;
  }

  try {
    await axios.post('/solicitudes', {
      id_profesor: authStore.usuario.id,
      id_grupo: grupoSeleccionado.value,
      fecha_uso: fechaUso.value,
      materiales: carrito.value.map(i => i.id_material) // Enviamos solo IDs
    });
    
    alert("¡Solicitud enviada con éxito!");
    router.push('/dashboard'); // Volver al inicio

  } catch (error) {
    console.error(error);
    alert("Error al enviar la solicitud");
  }
};
</script>

<style scoped>
.page-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
h1 { color: #0A4275; margin-bottom: 2rem; }

.layout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Izquierda ancha, Derecha angosta */
  gap: 20px;
}

.card {
  background: white; padding: 20px; border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* Estilos inputs */
.search-input, .form-input {
  width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 10px;
}

/* Tabla */
.table-wrapper { max-height: 500px; overflow-y: auto; }
table { width: 100%; border-collapse: collapse; }
td { padding: 10px; border-bottom: 1px solid #eee; }
.btn-add { background: #e3f2fd; color: #0066cc; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
.btn-add:disabled { opacity: 0.5; cursor: not-allowed; }

/* Tags Disponibilidad */
.tag-ok { color: green; font-size: 0.8rem; font-weight: bold; }
.tag-bad { color: red; font-size: 0.8rem; }

/* Carrito */
.carrito-list { list-style: none; padding: 0; margin: 10px 0 20px 0; }
.carrito-list li { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #eee; }
.btn-remove { background: none; border: none; color: red; cursor: pointer; }

.btn-primary {
  width: 100%; background: #0A4275; color: white; padding: 12px; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;
}
.btn-primary:disabled { background: #ccc; }
</style>