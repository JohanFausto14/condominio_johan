import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Sesion = () => {
  const navigate = useNavigate();
  const userDepartment = localStorage.getItem("userDepartment"); // O la manera en que obtienes el departamento del usuario
  const token = localStorage.getItem("token"); // O la manera en que obtienes el token del usuario

  const checkTokens = useCallback(async () => {
    try {
      if (!userDepartment || !token) return;

      const response = await fetch(
        `https://api-celeste.onrender.com/api/verificar/${userDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 404 && data.message === "No hay tokens asociados a este departamento") {
        alert("Su sesión ha expirado. Será redirigido a la página de inicio de sesión.");
        
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Error verificando tokens:", error);
    }
  }, [userDepartment, token, navigate]);

  useEffect(() => {
    checkTokens();
    const interval = setInterval(checkTokens, 5000);
    return () => clearInterval(interval);
  }, [checkTokens]);
return null;
};

export default Sesion;
