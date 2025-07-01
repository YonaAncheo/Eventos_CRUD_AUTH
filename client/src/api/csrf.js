import axios from './axios.js';

export const getCsrfToken = () => axios.get('/csrf-token');
