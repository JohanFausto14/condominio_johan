import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fondoImage from "../../assets/Fondo.jpg"; // Importa la imagen de fondo

const NuevaContraseña: React.FC = () => {
  const { token } = useParams(); // Extraer el token de la URL
  const navigate = useNavigate(); // Hook para redirigir
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función para verificar el token
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('https://api-celeste.onrender.com/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token inválido o expirado.");
      }

      return data; // Devuelve los datos del token (incluyendo el mensaje de éxito)
    } catch (error) {
      throw new Error("Error al verificar el token.");
    }
  };

  // Función para actualizar la contraseña
  const updatePassword = async (token: string, newPassword: string) => {
    try {
      const response = await fetch('https://api-celeste.onrender.com/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la contraseña.");
      }

      return data; // Devuelve los datos de la respuesta
    } catch (error) {
      throw new Error("Error al actualizar la contraseña.");
    }
  };

  // Verificar el token al cargar el componente
  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      try {
        await verifyToken(token || "");
        setIsValidToken(true);
        setError(null);
        toast.success("Token válido. Puedes restablecer tu contraseña.");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Token inválido o expirado.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token]);

  // Manejar el envío del formulario para cambiar la contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(token || "", newPassword);
      toast.success("Contraseña actualizada correctamente.");

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate("/"); // Redirigir al login
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar la contraseña.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoImage})` }} // Aplica la imagen de fondo
    >
      <div
        className="p-8 rounded-lg shadow-lg w-[450px] min-h-[400px] flex flex-col justify-center"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 51, 102, 0.8))",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h1 className="text-5xl font-semibold text-center mb-6 text-black">Restablecer Contraseña</h1>
        <ToastContainer /> {/* Contenedor para las notificaciones */}
        {isLoading ? (
          <p className="text-center">Cargando...</p>
        ) : isValidToken ? (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Nueva Contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white hover:bg-blue-600 text-black hover:text-white py-2 px-4 rounded-md font-medium shadow-md transition-all"
            >
              Cambiar Contraseña
            </button>
          </form>
        ) : (
          <p className="text-center">Verificando token...</p>
        )}
      </div>
    </div>
  );
};

export default NuevaContraseña;