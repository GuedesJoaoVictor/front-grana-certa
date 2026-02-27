import { useAuth } from "@/auth/AuthProvider";
import { api } from "@/config/axios";
import { UserDTO } from "@/core/user.dto";
import { useEffect, useState } from "react";

export function useUser() {
    const { keycloak } = useAuth();
    const [user, setUser] = useState<UserDTO | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/test/private/me");
                console.log("User data:", response);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, [keycloak]);

    return user;
}