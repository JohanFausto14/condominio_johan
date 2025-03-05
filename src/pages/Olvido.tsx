import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fondoImage from "../../assets/Fondo.jpg";

const Olvido: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

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
      // Agregar el código de país +52 al número de teléfono
      const fullPhoneNumber = `+52${phoneNumber}`;

      // Enviar el número de teléfono al backend para enviar el WhatsApp
      const response = await fetch('https://api-celeste.onrender.com/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Agrega el token si es necesario
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error
        throw new Error(errorData.message || "Error al enviar el mensaje de WhatsApp.");
      }

      // Mostrar mensaje de éxito
      toast.success("Se ha enviado un enlace de recuperación a tu teléfono.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirigir al usuario después de 3 segundos
      setTimeout(() => {
        navigate("/"); // Redirigir al login
      }, 3000);
    } catch (error) {
      let errorMessage = "Error al procesar la solicitud. Inténtalo de nuevo.";

      // Verificar si el error es una instancia de Error
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Mostrar el mensaje de error
      toast.error(errorMessage, {
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
        className="p-8 rounded-lg shadow-lg w-[450px] min-h-[400px] flex flex-col justify-center"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 51, 102, 0.8))",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2 className="text-5xl font-semibold text-center mb-6 text-black">Recuperar contraseña</h2>
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
              onChange={handlePhoneChange}
              value={phoneNumber}
              maxLength={10}
              required
            />
          </div>
          <p className="text-sm text-white">
            Ingresa tu número de teléfono para recibir un enlace de recuperación.
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black hover:text-white py-2 px-8 rounded-3xl font-medium shadow-md transition-all"
            >
              Enviar
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-white hover:text-blue-400 underline"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>

      {/* Aquí es donde se renderizan las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Olvido;