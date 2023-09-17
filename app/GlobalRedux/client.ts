import axios from 'axios';

const client = axios.create({
  baseURL: "https://cc0c-178-91-253-88.ngrok-free.app/",
  timeout: 5000, // Increased timeout
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

// Request interceptor
client.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    // For example, set authentication tokens
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    // Do something with the error
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status code outside the range of 2xx causes this function to trigger
    if (error.response && error.response.status === 401) {
      // Handle 401 errors globally, for example, redirect to login
    }
    return Promise.reject(error);
  }
);

export default client;
