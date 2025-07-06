import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const admin = useSelector((store) => store.auth.admin);
  return admin ? <Outlet /> : <Navigate to="/login" />;
}
