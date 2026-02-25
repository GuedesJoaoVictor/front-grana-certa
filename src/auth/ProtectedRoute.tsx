import type { JSX } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: Readonly<{ children: JSX.Element }>) {

    const { authenticated } = useAuth();

    if (!authenticated) {
        return <Navigate to={"/"} replace />
    }

    return children;
}