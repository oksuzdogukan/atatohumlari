import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { admin, isAuthChecked } = useSelector((store) => store.auth);

  if (!isAuthChecked) {
    return <div className="text-center p-10 text-gray-500">Yükleniyor...</div>;
  }
  return admin ? <Outlet /> : <Navigate to="/login" />;
}
