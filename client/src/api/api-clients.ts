import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("x-auth-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token.slice(1, -1)}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error("Unexpected Error: Server doesn't respond")
      );
    }
    return Promise.reject(error);
  }
);

export { apiClient };
