import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OnlyAdminRoute from "./components/OnlyAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  const hideOnRoutes = ["/login", "/admin", "/dashboard"];

  const shouldShow = !hideOnRoutes.includes(location.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        dispatch(checkAuth(payload)); // admin’i tekrar bas
      } catch {
        dispatch(checkAuth(null)); // token bozuksa bile auth check tamam
      }
    } else {
      dispatch(checkAuth(null)); // token yoksa bile auth check tamam
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {shouldShow && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<OnlyAdminRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {shouldShow && <Footer />}
    </>
  );
}

export default App;
