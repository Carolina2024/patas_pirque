import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Mostrando el spinner de carga
      Swal.fire({
        title: "Iniciando sesión...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Timeout simulado para mostrar el spinner
      setTimeout(async () => {
        const data = await loginUser({ email, password });

        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        console.log("Usuario logueado:", data);

        setErrors({});
        setEmail("");
        setPassword("");

        Swal.close(); // Cerrar spinner

        //Alerta de inicio de sesión exitoso
        Swal.fire({
          title: "¡Inicio de sesión exitoso!",
          text: "Bienvenido/a a Patas Pirque",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#FAAB75",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          }
        });
      }, 2000);
    } catch (err) {
      Swal.close(); // cerrar spinner si hay error
      setError(err.message);
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="m-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-tertiary">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
          )}

          {/* Email */}
          <div>
            <label className="block text-tertiary font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-tertiary font-semibold mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-tertiary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary transition-colors cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
