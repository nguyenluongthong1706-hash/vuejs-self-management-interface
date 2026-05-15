import axios from "axios";
import type { AxiosInstance} from "axios";
import { useUserStore } from "@stores/useUserStore";

const api: AxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL 
})

api.interceptors.request.use(
    function(config){
        const userStore = useUserStore()
        const token = userStore.token
        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config
    }
);

export default api;