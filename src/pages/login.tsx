import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fondoImage from "../../assets/Fondo.jpg";

// Función para realizar el login
const loginUser = async (phone: string, password: string, rememberMe: boolean) => {
  try {
    const response = await fetch('https://api-celeste.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password, rememberMe }), // Enviar rememberMe al backend
    });

    if (!response.ok) {
      throw new Error("Error al verificar el teléfono y la contraseña.");
    }

    const data = await response.json();
    return data; // Retornar todos los datos, incluyendo el token y el token permanente
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox "Recordar contraseña"

  // Función para manejar cambios en el campo de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Validar que solo se ingresen números y limitar a 10 dígitos
    if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
      setPhoneNumber(inputValue);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el número de teléfono tenga exactamente 10 dígitos
    if (phoneNumber.length !== 10) {
      toast.error("El número de teléfono debe tener exactamente 10 dígitos.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      // Llamar a la función loginUser que verifica el número y la contraseña en el backend
      const { token, permanentToken, userData } = await loginUser(phoneNumber, password, rememberMe);

      console.log("Datos recibidos de la API:", userData);

      // Guardar los datos del usuario y el token en localStorage
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("userProfile", userData.role);
      localStorage.setItem("userDepartment", userData.department);
      localStorage.setItem("token", token); // Guardar el token temporal en localStorage

      // Si el usuario seleccionó "Recordar contraseña", guardar el token permanente
      if (rememberMe && permanentToken) {
        localStorage.setItem("permanentToken", permanentToken);
      }

      // Alerta de éxito: el usuario se autenticó correctamente
      toast.success("Autenticación exitosa. Redirigiendo...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirigir al dashboard según el perfil
      setTimeout(() => {
        if (userData.role === "Administrador") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoImage})` }}
    >
      <div
        className="p-8 rounded-lg shadow-lg w-[450px] min-h-[500px] flex flex-col justify-center"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 51, 102, 0.8))",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2 className="text-5xl font-semibold text-center mb-6 text-black">Inicio de sesión</h2>
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.208 0 4-1.791 4-4s-1.792-4-4-4-4 1.791-4 4 1.792 4 4 4zm0 2c-2.673 0-8 1.341-8 4v2h16v-2c0-2.659-5.327-4-8-4z" />
            </svg>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Ingresa tu número de teléfono"
              className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              onChange={handlePhoneChange} // Usar la función personalizada
              value={phoneNumber}
              maxLength={10} // Limitar a 10 caracteres
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-sm text-white">
              Recordar contraseña
            </label>
          </div>
          <p className="text-sm text-white">
            Ingresa tu número de teléfono y contraseña para iniciar sesión.
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black hover:text-white py-2 px-8 rounded-3xl font-medium shadow-md transition-all"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>

      {/* Aquí es donde se renderizan las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Login;