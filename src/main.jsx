import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    <Toaster position="top-right"/>
  </StrictMode>
  </Provider>
  
);
