import { useAuth } from "@/auth/AuthProvider";
import { useState } from "react";

export function useUser() {
    const { keycloak } = useAuth();
    const [user, setUser] = useState(null);
}