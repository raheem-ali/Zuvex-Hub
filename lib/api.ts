import axios from "axios";

export const TOKEN_KEY = "dashboard_token";
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { Accept: "application/json" },
});

// Attach the Bearer token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token expired / is invalid, send the user back to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined" && err.response?.status === 401) {
      const path = window.location.pathname;
      if (path.startsWith("/dashboard") && !path.startsWith("/dashboard/login")) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "/dashboard/login";
      }
    }
    return Promise.reject(err);
  }
);

// Turns Laravel errors (incl. 422 validation) into a readable message
export function getErrorMessage(err: any): string {
  const data = err?.response?.data;
  if (data?.errors) {
    const first = Object.values(data.errors)[0] as string[] | undefined;
    if (first?.[0]) return first[0];
  }
  return data?.message ?? "Something went wrong. Please try again.";
}