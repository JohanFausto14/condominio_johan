import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Importar desde react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importar los estilos
import fondoImage from "../../assets/Fondo.jpg"; // Asegúrate de tener esta imagen

// Función que se encargará de verificar el teléfono (al backend)
const loginUser = async (phone: string) => {
  try {
    const response = await fetch('https://api-celeste.onrender.com/api/verificarTelefono', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) {
      throw new Error("Error al verificar el teléfono.");
    }

    const data = await response.json();

    if (data.message === "Usuario es Administrador") {
      // Retornar los datos del usuario si es administrador
      return { name: data.userData.name, profile: "admin", department: data.userData.department };
    } else {
      // Retornar los datos del usuario si no es administrador
      return { name: data.userData.name, profile: "user", department: data.userData.department };
    }

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Llamar a la función loginUser que verifica el número en el backend
      const { name, profile, department } = await loginUser(phoneNumber);

      console.log("Datos recibidos de la API:", { name, profile, department });

      // Guardar los datos del usuario en localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userProfile", profile);
      localStorage.setItem("userDepartment", department);

      // Alerta de éxito: el número se verificó correctamente
      toast.success("Número verificado correctamente. Redirigiendo...", {
        position: "top-center", // Posición de la notificación
        autoClose: 2000, // Duración de la notificación
        hideProgressBar: true, // Ocultar la barra de progreso
        closeOnClick: true, // Cerrar al hacer click
        pauseOnHover: true, // Pausar cuando el mouse pasa sobre ella
        draggable: true, // Hacerla arrastrable
        progress: undefined, // No mostrar el progreso
      });

      // Redirigir al dashboard según el perfil
      setTimeout(() => {
        if (profile === "admin") {
          navigate("/admin"); // Redirigir al admin
        } else {
          navigate("/user"); // Redirigir al usuario normal
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value); // Solo aceptar números
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
              onChange={handleInputChange}
              value={phoneNumber}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <p className="text-sm text-white">
            Ingresa tu número de teléfono para recibir un código de verificación por SMS.
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
