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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      // Mostrando el spinner de carga
      Swal.fire({
        title: "Registrando usuario...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Timeout simulado para mostrar el spinner
      setTimeout(async () => {
        const response = await registerUser(formData);
        console.log("Registro exitoso:", response);

        // Almacenando el token en localStorage
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        Swal.close(); // Cerrar spinner

        //Alerta de registro exitoso
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

        // Limpiamos formulario
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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.birthDate) newErrors.birthDate = "La fecha es obligatoria";
    if (!formData.dni.trim()) newErrors.dni = "El documento es obligatorio";
    if (!formData.gender) newErrors.gender = "Seleccione un género";
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    return newErrors;
  };

  return (
    <div className="m-10 flex items-center justify-center bg-secundary">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-tertiary">
          Regístrate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">Apellido:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            {/* Nacimiento */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">Fecha de nacimiento:</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
            </div>

            {/* DNI */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">DNI:</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>

            {/* Género */}
            <div>
              <label className="block text-tertiary font-semibold mb-1">Género:</label>
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
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-tertiary font-semibold mb-1">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-tertiary font-semibold mb-1">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
