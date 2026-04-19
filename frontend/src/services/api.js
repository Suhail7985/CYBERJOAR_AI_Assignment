import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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

export default api;
