import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || "https://localhost:5000/api",
  withCredentials: true,
});

export default axiosInstance;