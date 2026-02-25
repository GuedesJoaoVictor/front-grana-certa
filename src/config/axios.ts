import keycloak from "@/auth/keycloak";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081",
});

api.interceptors.request.use(async config => {
    await keycloak.updateToken(30);

    config.headers.Authorization = `Bearer ${keycloak.token}`;

    return config;
});
