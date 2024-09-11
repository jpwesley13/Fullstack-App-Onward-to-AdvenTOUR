import React from "react";
// import App from "./App";
import ReactDOM from "react-dom";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <BrowserRouter>
    // <App />
    // </BrowserRouter>
    <RouterProvider router = {router} />
)