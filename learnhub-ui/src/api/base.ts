import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true // NOTE: Phải thêm cái này vào server mới nhận được cookie
});

API.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let count = 0;
API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && count < 1) {
            count++;
            try {
                const resp = await API.get("/auth/refresh-token");
                if (resp.status === 200) {
                    const token = resp.data.access_token;
                    if (token) {
                        localStorage.setItem("access_token", token);
                        return API(originalRequest);
                    } else {
                        throw new Error("No access_token return by server.");
                    }
                } else {
                    throw new Error("Refresh token failed.");
                }
            } catch (err) {
                localStorage.removeItem("access_token");
                count = 0;
                console.error((err as Error).message);
            }
        } else if (count >= 1) {
            count = 0;
        }
        return Promise.reject(error);
    }
);
export default API;
