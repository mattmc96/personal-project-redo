import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./Context/Auth-Context";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);

reportWebVitals();
