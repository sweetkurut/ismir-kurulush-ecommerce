import axios from "axios";
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "@/utils/auth";

export const urlApi = "https://ismir-kurulush-backend.com.kg/";

const instance = axios.create({
    baseURL: urlApi + "api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

instance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await getRefreshToken();
                if (refreshToken) {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_URL}/users/token/refresh/`,
                        { refresh: refreshToken }
                    );

                    const { access, refresh } = response.data;
                    await saveTokens(access, refresh);

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                await removeTokens();
                // Можно добавить dispatch logout здесь, если есть доступ к store
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
