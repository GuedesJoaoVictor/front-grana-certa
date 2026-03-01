import { useAuth } from "@/auth/AuthProvider";
import { Navigate } from "react-router-dom";

export function AuthRedirect() {
    const { authenticated, keycloak } = useAuth();

    if (!authenticated) {
        keycloak.login();
    }

    const roles = keycloak.tokenParsed?.resource_access?.frontend?.roles;

    if (roles?.includes("ADMIN")) {
        return <Navigate to="/admin" replace />
    }

    return <Navigate to="/app" replace />
}