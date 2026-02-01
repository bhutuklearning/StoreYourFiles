import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// Add request interceptor to inject token
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('fb_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token on 401
            localStorage.removeItem('fb_token');
            // Redirect to login if unauthorized
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default http;
