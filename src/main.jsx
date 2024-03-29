import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/authentication/Login.jsx";
import Dashboard from "./components/users/Dashboard.jsx";
import SignUp from "./components/authentication/SignUp.jsx";
import ForgotPassword from "./components/authentication/ForgotPassword.jsx";
import ChangePassword from "./components/authentication/ChangePassword.jsx";
import PrivateRoutes from "./components/authentication/PrivateRoute.jsx";
import { MyContextProvider } from "./context/MyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<ChangePassword />} path="/change-password" />
          </Route>
          <Route element={<App />} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signUp" />
          <Route element={<ForgotPassword />} path="/forgot-password" />
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
  </>
);
