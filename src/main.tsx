import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import ProfilePage from "./routes/Profile.tsx";
import Playground from "./routes/Playground.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/playground/:id',
    element: <Playground />
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/support",
    //element: <Support />
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  </StrictMode>
);
