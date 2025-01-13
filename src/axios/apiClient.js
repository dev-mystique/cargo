import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning":"432"
    }
});

export default axiosInstance;