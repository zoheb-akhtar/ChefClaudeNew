import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(request => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      const isAuthRoute = originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/register");

      if (isAuthRoute) {
        return Promise.reject(error);
      }
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const res = await fetch("http://localhost:8080/auth/refresh_token", {
            method: 'POST',
            credentials: 'include'
          });
  
          if (!res.ok) {
            throw new Error("Error refreshing access token");
          }
  
          const data = await res.json();

          const newAccessToken = data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
  
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
          return api(originalRequest);
          
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          window.location.href = "/login";
          localStorage.removeItem("accessToken");
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api;