import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
    path: "/password",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

export default router;