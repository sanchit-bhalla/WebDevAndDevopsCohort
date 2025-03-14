import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { useAuth } from "../hooks/useAuth";
import ProgressBar from "./ProgressBar/ProgressBar";
import { BrainProvider } from "../context/BrainContext";
import { NotificationProvider } from "../context/NotificationContext";
import PublicBrain from "./PublicBrain";
import NotFound from "./NotFound";

function Navigation() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <ProgressBar />;
  return (
    <BrowserRouter>
      <BrainProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="register"
                element={
                  !isAuthenticated ? <Register /> : <Navigate replace to="/" />
                }
              />
              <Route
                path="login"
                element={
                  !isAuthenticated ? <Login /> : <Navigate replace to="/" />
                }
              />
              <Route
                index
                element={
                  isAuthenticated ? <Home /> : <Navigate replace to="login" />
                }
              />
            </Route>
            <Route path="/brain/:hash" element={<PublicBrain />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </BrainProvider>
    </BrowserRouter>
  );
}

export default Navigation;
