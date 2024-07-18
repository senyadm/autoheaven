import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken, saveOriginalUrl, saveToken } from "../utils/auth";

const APIDomains = [
  "https://autoheven-email.vercel.app",
  "https://cars.auto-heaven.com",
  "https://users.auto-heaven.com",
  "https://seashell-app-p3opp.ondigitalocean.app",
  // "https://chat.auto-heaven.com",
];

export const [emailDomain, carsDomain, usersDomain, chatsDomain] = APIDomains;

function getAxiosClient(domain: string, forceAuth: boolean){
    const client = axios.create({
      baseURL: domain,
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
    if(forceAuth){ 
      client.interceptors.response.use(
      (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
      },
      (error) => {
        // Any status code outside the range of 2xx causes this function to trigger
        if (error.response && error.response.status === 401) {
          if (typeof window !== "undefined") {
            client
              .post(`/api/users/token/refresh?refresh_token=${getToken()}`)
              .then((response) => {
                saveToken(response.data.access_type);
              })
              .catch((error) => {
                console.log("🚀 ~ error:", error);
                if (window.location.pathname.includes("/login")) return;
                saveOriginalUrl(window.location.pathname);
                window.location.replace("/login");
                localStorage.removeItem("token");
              });
          }
        }
        return Promise.reject(error);
      }
    );}

    return client;
}

const [clientEmail, clientCars, clientUsers, clientChats] = APIDomains.map(
  (domain) => {
    return getAxiosClient(domain, false);
  }
);

const [_, clientCarsForceAuth, clientUsersForceAuth, clientChatsForceAuth] = APIDomains.map(
  (domain) => {
    return getAxiosClient(domain, true);
  }
);

export { clientEmail, clientCars, clientUsers, clientChats, clientCarsForceAuth, clientUsersForceAuth, clientChatsForceAuth };

// sometimes fetch functionality is needed instead of axios due to how next works
// for example fetch requests are cached and can be revalidated every hour
// fetchEmail is unnecessary probably
export const [fetchEmail, fetchCars, fetchUsers, fetchChats] = APIDomains.map(
  (domain) => {
    return (url: string, options?: RequestInit) =>
      fetch(`${domain}${url}`, options);
  }
);

export const [getCars, getUsers, getChats] = [
  fetchCars,
  fetchUsers,
  fetchChats,
].map((fetchFn) => async (url: string, options?: RequestInit) => {
  const res = await fetchFn(url, options);
  const data = await res.json();
  return data;
});
