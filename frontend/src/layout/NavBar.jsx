import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-tertiary">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/assets/logo.png" alt="Logo" className="w-30 h-30" />
          </Link>
        </div>

        {/* Botones de Logueo*/}
        <div className="flex items-center space-x-4">
          {/* Mostrando botones de logueo solo si no estamos en Dashboard */}
          {!isDashboard && (
            <>
              <Link to="/login">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secundary hover:text-tertiary cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-secundary text-tertiary px-4 py-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer">
                  Register
                </button>
              </Link>
            </>
          )}

          {/* Mostrar botón de cerrar sesión si está logueado */}
          {isLoggedIn && isDashboard && (
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secundary hover:text-tertiary cursor-pointer"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
