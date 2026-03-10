import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const compileCode = async (code, input, prompt) => {
    const response = await api.post('/compile', { code, input, prompt });
    return response.data;
};

export const generateCode = async (prompt) => {
    const response = await api.post('/generate-code', { prompt });
    return response.data;
};

export default api;
