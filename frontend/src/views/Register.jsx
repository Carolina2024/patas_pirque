import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../api/user";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    dni: "",
    gender: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      Swal.fire({
        title: "Registrando usuario...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(async () => {
        const response = await registerUser(formData);
        console.log("Registro exitoso:", response);

        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        Swal.close();

        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Ahora puedes iniciar sesión",
          icon: "success",
          confirmButtonText: "Ir a Iniciar Sesión",
          confirmButtonColor: "#FAAB75",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });

        setFormData({
          name: "",
          lastName: "",
          birthDate: "",
          dni: "",
          gender: "",
          email: "",
          password: "",
        });
      }, 2000);
    } catch (error) {
      Swal.close();
      console.error("Error en el registro:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrarse: " + error.message,
      });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "El nombre es obligatorio";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
          return "Solo se permiten letras";
        return "";
      case "lastName":
        if (!value.trim()) return "El apellido es obligatorio";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
          return "Solo se permiten letras";
        return "";
      case "birthDate":
        return value ? "" : "La fecha es obligatoria";
      case "dni":
        if (!value.trim()) return "El documento es obligatorio";
        if (!/^\d{8}$/.test(value)) return "Debe tener 8 números exactos";
        return "";
      case "gender":
        return value ? "" : "Seleccione un género";
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Correo inválido. Ej: ejemplo@dominio.com";
        return "";
      case "password":
        if (!value.trim()) return "La contraseña es obligatoria";
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/.test(
            value
          )
        ) {
          return "Debe tener mínimo 6 caracteres, letras, números y símbolos. Ej: hola123!";
        }
        return "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    }
    return newErrors;
  };

  return (
    <div className="m-10 flex items-center justify-center bg-secundary">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-tertiary">
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">
                Apellido:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            {/* Nacimiento */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm">{errors.birthDate}</p>
              )}
            </div>

            {/* DNI */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">
                DNI:
              </label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength="8"
              />
              {errors.dni && (
                <p className="text-red-500 text-sm">{errors.dni}</p>
              )}
            </div>

            {/* Género */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">
                Género:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border font-medium text-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            {/* Correo */}
            <div className="md:col-span-2">
              <label className="block text-tertiary font-semibold mb-1">
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="md:col-span-2">
              <label className="block text-tertiary font-semibold mb-1">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-tertiary text-white py-3 px-4 rounded-lg hover:bg-primary transition-colors cursor-pointer"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
