import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import keycloak from "./keycloak";

type AuthContextType = {
  keycloak: typeof keycloak;
  authenticated: boolean;
};

function handleTokenRefreshError() {
    console.log("Failed to refresh token, logging out");
    keycloak.logout({ redirectUri: globalThis.location.origin });
  }


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

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
      .then(auth => {
        setAuthenticated(auth);
        setReady(true);

        if (!auth) {
          keycloak.login();
          return;
        }

        const interval = setInterval(() => {
          keycloak.updateToken(30).catch(handleTokenRefreshError);
        }, 1000 * 60 * 4);

        return () => clearInterval(interval);
      });
  }, []);

  useEffect(() => {
    if (!authenticated || !keycloak.token) return;

    localStorage.setItem("token", keycloak.token);
    localStorage.setItem("refresh_token", keycloak.refreshToken ?? "");
    localStorage.setItem("user_token", JSON.stringify(keycloak.tokenParsed));
  }, [authenticated]);

  const contextValue = useMemo(
    () => ({ keycloak, authenticated }),
    [authenticated]
  );

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
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