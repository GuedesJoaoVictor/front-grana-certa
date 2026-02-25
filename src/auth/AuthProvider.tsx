import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import keycloak from "./keycloak"

type AuthContextType = {
    keycloak: typeof keycloak;
    authenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const [authenticated, setAuthenticated] = useState(false);
    const initialized = useRef(false);

  function handleTokenRefreshError() {
    console.log("Failed to refresh token, logging out");
    keycloak.logout({ redirectUri: globalThis.location.origin });
  }

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

              const interval = setInterval(() => {
                keycloak.updateToken(30).catch(handleTokenRefreshError);
              }, 1000 * 60 * 4);

              return () => clearInterval(interval);
          });
  }, []);

  const contextValue = useMemo(() => ({ keycloak, authenticated }), [authenticated]);

  if (!authenticated) {
    return <div>Loading...</div>;
  } else if (authenticated && keycloak.token) {
    localStorage.setItem("token", keycloak.token);
    localStorage.setItem("refresh_token", keycloak.refreshToken ? keycloak.refreshToken : "");
    localStorage.setItem("user_token", JSON.stringify(keycloak.tokenParsed));
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