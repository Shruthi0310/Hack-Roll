import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { config } from "./config/firebase";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <App />
    </FirebaseAuthProvider>
  </StrictMode>,
  rootElement
);
