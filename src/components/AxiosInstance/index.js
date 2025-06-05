// utils/axiosInstance.js
import axios from 'axios';

const TEN_HOURS_IN_MS = 10 * 60 * 60 * 1000; // 10 hours

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
      const currentTime = Date.now();
      const timePassed = currentTime - parseInt(loginTime, 10);

      if (timePassed > TEN_HOURS_IN_MS) {
        alert('Your session expired after 10 hours. Please log in again.');
        localStorage.clear();

        // 🔁 Redirect to logout path
        window.location.href = '/';

        // Cancel this request
        throw new axios.Cancel('Session expired');
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Unauthorized access — force logout
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/'; // 🔁 or '/logout' — whichever is your logout route
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
