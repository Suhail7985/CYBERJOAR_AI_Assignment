import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const intelligenceApi = {
  getAll: (params) => api.get('/intelligence', { params }),
  create: (data) => api.post('/intelligence', data),
  getSummary: (id) => api.get(`/intelligence/${id}/summary`),
  bulkCreate: (data) => api.post('/intelligence/bulk', data),
  uploadImage: (formData) => api.post('/intelligence/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
