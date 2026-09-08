import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import "./styles/index.css";
const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
const path = window.location.pathname.replace(/\/$/, "") || "/";
if (root.hasChildNodes() && root.dataset.route === path) hydrateRoot(root, app);
else createRoot(root).render(app);
