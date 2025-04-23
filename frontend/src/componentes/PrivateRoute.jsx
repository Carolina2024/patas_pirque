import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  /* if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
 */

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
