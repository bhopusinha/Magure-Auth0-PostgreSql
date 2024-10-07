import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import HttpMethodProvider from "./context/HttpMethodProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <HttpMethodProvider>
        <Auth0Provider
          domain="dev-l0d3bx70mmaei5k3.us.auth0.com"
          clientId="cq8u5ArYKXmh19MTfKxioFeu1n93iuBM"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </HttpMethodProvider>
    </Router>
  </StrictMode>
);
