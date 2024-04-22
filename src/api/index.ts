import axios from 'axios';

const apiClient = axios.create({
    // hiding the URL in the .env file
    baseURL: `${import.meta.env.VITE_REACT_URL}`,
    headers: {
        'Content-Type': 'application/json',
      }
});

export default apiClient;