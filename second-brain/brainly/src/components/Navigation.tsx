import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { useAuth } from "../hooks/useAuth";
import ProgressBar from "./ProgressBar/ProgressBar";

function Navigation() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <ProgressBar />;
  return (
    <BrowserRouter>
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
            element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />}
          />
          <Route
            index
            element={
              isAuthenticated ? <Home /> : <Navigate replace to="login" />
            }
          />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
