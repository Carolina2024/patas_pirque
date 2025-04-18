import { useState } from "react";

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
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setRegistroExitoso(false);
    } else {
      setErrors({});
      setRegistroExitoso(true);
      console.log("Datos del registro:", formData);

      setFormData({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        documento: "",
        genero: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        setRegistroExitoso(false);
      }, 5000);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha es obligatoria";
    if (!formData.documento.trim()) newErrors.documento = "El documento es obligatorio";
    if (!formData.genero) newErrors.genero = "Seleccione un género";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Regístrate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Fecha de nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.fechaNacimiento && (
                <p className="text-red-500 text-sm">{errors.fechaNacimiento}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Documento:</label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.documento && <p className="text-red-500 text-sm">{errors.documento}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Género:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.genero && <p className="text-red-500 text-sm">{errors.genero}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Registrarse
          </button>

          {registroExitoso && (
            <div className="mt-4 text-green-600 font-medium text-center">
              ¡Registro exitoso! 🎉
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
