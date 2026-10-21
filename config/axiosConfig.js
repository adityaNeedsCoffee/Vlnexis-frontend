import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "https://vlnexis-backend.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;