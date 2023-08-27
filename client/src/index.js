import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

// check if path is appended as query args (from Github pages 404 redirect)
((loc) => {
  if (loc.search[1] === "/") {
    // if so, put back into the path before we render below
    window.history.replaceState(
      null,
      null,
      loc.pathname.slice(0, -1) + loc.search.slice(1)
    );
  }
})(window.location);

function Router() {
  return (
    <BrowserRouter basename="/have-a-ball">
      <App />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Router />);
