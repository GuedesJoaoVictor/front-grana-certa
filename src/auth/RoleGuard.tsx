import type { JSX } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export function RoleGuard({ children, role }: Readonly<{ children: JSX.Element, role: string }>) {
    const { keycloak } = useAuth();

    const roles = keycloak.tokenParsed?.resource_access?.frontend?.roles ?? [];

    if (!roles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
}