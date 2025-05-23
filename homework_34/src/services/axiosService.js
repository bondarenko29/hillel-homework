import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Unknown error';

    toast.error(`Error ${status || ''}: ${message}`);

    return Promise.reject(error);
  },
);

export default api;
