import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-50 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo a la izquierda */}
        <div className="flex items-center">
            <Link to="/">
            <img src="/src/assets/logo.png" alt="Logo" className="w-25 h-25" />
            </Link>
        </div>

        {/* Botones de Login y Register a la derecha */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
