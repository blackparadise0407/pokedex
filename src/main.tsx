import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.tsx";
import { apolloClient } from "./lib/apollo/apollo.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
