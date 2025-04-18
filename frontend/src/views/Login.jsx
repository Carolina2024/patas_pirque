
import { useState } from "react";
import { loginUser } from "../api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [errors, setErrors] = useState({});
  const [bienvenida, setBienvenida] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await loginUser({ email, password });

     
      localStorage.setItem("token", data.token);

      console.log("Usuario logueado:", data);
      
    } catch (err) {
      setError(err.message);
      console.error("Error al iniciar sesión:", err);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setBienvenida(false);
    } else {
      setErrors({});
      setBienvenida(true);
      console.log("Email:", email);
      console.log("Password:", password);

      setEmail("");
      setPassword("");

      setTimeout(() => setBienvenida(false), 5000);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ingresar
          </button>

          {bienvenida && (
            <div className="mt-4 text-green-600 text-center font-medium">
              ¡Bienvenido/a! 🎉
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

