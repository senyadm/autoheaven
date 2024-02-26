import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "../../utils/auth";

const [clientEmail, clientCars, clientUsers, clientChats] = [
  "https://autoheven-email.vercel.app",
  "https://autoheven-cars.vercel.app",
  "https://autoheven-users.vercel.app",
  "https://seashell-app-p3opp.ondigitalocean.app",
].map((url) => {
  const client = axios.create({
    baseURL: url,
    timeout: 15000, // Increased timeout
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Do something before the request is sent
      // For example, set authentication tokens
      if (typeof window !== "undefined") {
        config.headers["Authorization"] = "Bearer " + getToken();
      }
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
        window.location.replace("/login");
        localStorage.removeItem("token");
        console.log("401");
      }
      return Promise.reject(error);
    }
  );

  return client;
});

export { clientEmail, clientCars, clientUsers, clientChats };
