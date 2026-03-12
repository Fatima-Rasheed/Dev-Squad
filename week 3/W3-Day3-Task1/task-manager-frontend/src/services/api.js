import axios from 'axios';

const api = axios.create({
  // Add '/api' here so all requests automatically go to https://w3-day2-task1.vercel.app/api/...
  baseURL: 'https://w3-day2-task1.vercel.app/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;