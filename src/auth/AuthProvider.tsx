import { createContext, useContext, useEffect, useMemo, useRef, useState, } from "react";
import keycloak from "./keycloak";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type AuthContextType = {
  keycloak: typeof keycloak;
  authenticated: boolean;
};

function handleTokenRefreshError() {
  console.log("Failed to refresh token, logging out");
  keycloak.logout({ redirectUri: globalThis.location.origin });
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, }: Readonly<{ children: React.ReactNode }>) {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((auth) => {
        setAuthenticated(auth);
        setReady(true);

        if (!auth) {
          keycloak.login();
          return;
        }

        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).catch(handleTokenRefreshError);
        };
      });
  }, []);

  useEffect(() => {
    if (!authenticated || !keycloak.token) return;

    localStorage.setItem("token", keycloak.token);
    localStorage.setItem("refresh_token", keycloak.refreshToken ?? "");
    localStorage.setItem("user_token", JSON.stringify(keycloak.tokenParsed));
  }, [authenticated]);

  const contextValue = useMemo( () => ({ keycloak, authenticated }), [authenticated],);

  if (!ready) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Button disabled size="lg" variant="outline">
          <Spinner className="size-6"/>
          <div className="text-black">Loading...</div>
        </Button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useUserEmail() {
  const email = useAuth().keycloak.tokenParsed?.email;
  return email;
}

export function useUserName() {
  const name = useAuth().keycloak.tokenParsed?.name;
  return name;
}

export function useLogout() {
  const { keycloak } = useAuth();

  return () => {
    keycloak.logout({ redirectUri: globalThis.location.origin });
  };
}
