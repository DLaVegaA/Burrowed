import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importar Pinia
import './style.css'
import App from './App.vue'
import router from './router' // Importar el Router

const app = createApp(App)

// ¡Estas dos líneas son las que faltaban!
app.use(createPinia())
app.use(router)

app.mount('#app')