import axios from "axios";

// Step 1: Base URL of your NEXIS backend (set this in .env.local)
// NEXT_PUBLIC_API_URL=http://localhost:5000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Step 2: Create one axios instance so every user request shares the same settings
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

export const userService = {
  // Step 3: POST /api/users  ->  create a new user (signup)
  // The backend returns { success, message, data }, so we return only "data"
  create: async ({ name, email, password }) => {
    const response = await apiClient.post("/users", { name, email, password });
    return response.data.data;
  },

  // Step 4: POST /api/auth/login  ->  log in
  // The backend returns { success, message, token, data }
  // We return both the token and the user
  login: async ({ email, password }) => {
    const response = await apiClient.post("/users/login", { email, password });
    return { token: response.data.token, user: response.data.data };
  },
};