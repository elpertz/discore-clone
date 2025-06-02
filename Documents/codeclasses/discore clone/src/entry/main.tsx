import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../index.css";
import App from "../App";

// Create main app root
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Initialize Stagewise toolbar only in development mode
if (process.env.NODE_ENV === "development") {
  import("@stagewise/toolbar-react")
    .then(({ StagewiseToolbar }) => {
      // Create a separate container for the toolbar
      const toolbarContainer = document.createElement("div");
      toolbarContainer.id = "stagewise-toolbar-root";
      document.body.appendChild(toolbarContainer);

      // Configuration for the stagewise toolbar
      const stagewiseConfig = {
        plugins: [],
      };

      // Create separate root for the toolbar to avoid interfering with main app
      const toolbarRoot = createRoot(toolbarContainer);
      toolbarRoot.render(<StagewiseToolbar config={stagewiseConfig} />);
    })
    .catch((error) => {
      console.warn("Failed to load Stagewise toolbar:", error);
    });
}
