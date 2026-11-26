import axios from "axios";

// .env.local mein (/api ke saath):
// NEXT_PUBLIC_API_URL=http://localhost:5000/api
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // cookie bhejne/save karne ke liye zaroori
});

export const userService = {
  // POST /api/users -> signup
  create: async ({ name, email, password }) => {
    const response = await apiClient.post("/users", { name, email, password });
    return response.data.data;
  },

  // POST /api/users/login -> token cookie mein set hota hai, body mein sirf user aata hai
  login: async ({ email, password }) => {
    const response = await apiClient.post("/users/login", { email, password });
    return response.data.data;
  },

  // POST /api/users/logout -> cookie clear
  logout: async () => {
    const response = await apiClient.post("/users/logout");
    return response.data;
  },

  // GET /api/users/me -> page refresh pe check ki user logged in hai ya nahi
  me: async () => {
    const response = await apiClient.get("/users/me");
    return response.data.data;
  },
};