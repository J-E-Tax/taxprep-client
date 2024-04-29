import axios from 'axios';

const apiClient = axios.create({
    // hiding the URL in the .env file
    baseURL: `${import.meta.env.VITE_REACT_URL}`,
    headers: {
        'Content-Type': 'application/json',
      }
});

apiClient.defaults.withCredentials = true;

// Currently not using this interceptor
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });


export default apiClient;