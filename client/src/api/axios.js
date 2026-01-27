import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // La URL de tu Backend
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: Poner el Token automáticamente en cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;