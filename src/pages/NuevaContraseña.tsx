import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NuevaContraseña: React.FC = () => {
  const { token } = useParams(); // Extraer el token de la URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verificando token..."); // Estado para el mensaje

  // Verificar el token al cargar el componente
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('https://api-celeste.onrender.com/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }), // Enviar el token al backend
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Token válido. Puedes restablecer tu contraseña."); // Mensaje de éxito
        } else {
          setMessage(data.message || "Token inválido o expirado."); // Mensaje de error
          setTimeout(() => {
            navigate("/"); // Redirigir al login si el token no es válido
          }, 3000);
        }
      } catch (error) {
        setMessage("Error al verificar el token. Inténtalo de nuevo."); // Mensaje de error
        setTimeout(() => {
          navigate("/"); // Redirigir al login si hay un error
        }, 3000);
      }
    };

    verifyToken(); // Llamar a la función para verificar el token
  }, [token, navigate]);

  return (
    <div>
      <h1>{message}</h1> {/* Mostrar el mensaje en un <h1> */}
    </div>
  );
};

export default NuevaContraseña;