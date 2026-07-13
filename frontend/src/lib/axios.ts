import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api/' : '/api/', // Replace with your backend API URL
    withCredentials: true, // Include cookies in requests
});

export default api;