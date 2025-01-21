import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Ensures cookies are sent with cross-origin requests
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network Error or Server Unreachable:", error);
      return Promise.reject(
        new Error("Unexpected Error: Server doesn't respond")
      );
    }

    const { status } = error.response;

    if (status === 401) {
      console.warn("Unauthorized: Redirecting to login...");
      toast.info(
        error.response?.message || "Unauthorized: Redirecting to login..."
      );
      // Optionally redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else if (status === 403) {
      console.warn(
        "Forbidden: You don't have permission to access this resource."
      );
    } else if (status >= 500) {
      console.error("Server Error: Please try again later.");
    }

    return Promise.reject(error);
  }
);

export { apiClient };
