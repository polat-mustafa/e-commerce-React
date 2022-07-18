import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BasketProvider } from "./context/BasketContext";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthAdminProvider } from "./context/AuthAdmin";
const queryClient = new QueryClient();

const domain = process.env.REACT_APP_AUTH_DOMAIN;
const client = process.env.REACT_APP_AUTH_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={client}
    redirectUri={window.location.origin}
  >
    <AuthAdminProvider>
      <BasketProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </QueryClientProvider>
        </ChakraProvider>
      </BasketProvider>
    </AuthAdminProvider>
  </Auth0Provider>
);
