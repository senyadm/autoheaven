import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken, saveOriginalUrl, saveToken } from "../utils/auth";

const APIDomains = [
  "https://autoheven-email.vercel.app",
  "https://cars.auto-heaven.com",
  "https://users.auto-heaven.com",
  "https://chat.auto-heaven.com",
];

export const [emailDomain, carsDomain, usersDomain, chatsDomain] = APIDomains;

const [clientEmail, clientCars, clientUsers, clientChats] = APIDomains.map(
  (url) => {
    const client = axios.create({
      baseURL: url,
      timeout: 20000, // Increased timeout
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
          client
            .post("/api/users/token/refresh")
            .then((response) => {
              console.log(response);
              saveToken(response.data.access_type);
            })
            .catch((error) => {
              if (typeof window !== "undefined") {
                saveOriginalUrl(window.location.pathname);
                window.location.replace("/login");
                localStorage.removeItem("token");
              }
            });
        }
        return Promise.reject(error);
      }
    );

    return client;
  }
);

export { clientEmail, clientCars, clientUsers, clientChats };

// sometimes fetch functionality is needed instead of axios due to how next works
// for example fetch requests are cached and can be revalidated every hour
// fetchEmail is unnecessary probably
export const [fetchEmail, fetchCars, fetchUsers, fetchChats] = APIDomains.map(
  (domain) => {
    return (url: string) => fetch(`${domain}${url}`);
  }
);

export const [getCars, getUsers, getChats] = [
  fetchCars,
  fetchUsers,
  fetchChats,
].map((fetchFn) => async (url: string) => {
  const res = await fetchFn(url);
  const data = await res.json();
  return data;
});
