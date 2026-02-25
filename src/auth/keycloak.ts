import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.URL_KEYCLOAK!,
  realm: import.meta.env.REALM!,
  clientId: import.meta.env.CLIENT_ID!,
});

export default keycloak;
