import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="216168406592-64kfuc404f6apspc4l9pjo9ub6b1j9fq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
