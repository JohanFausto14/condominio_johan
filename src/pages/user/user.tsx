import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDollarSign,
  faGavel,
  faDoorOpen,
  faSignOutAlt,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sesion from "../../components/sesion";

interface Notification {
  _id: string;
  usuario: string;
  departamento: string;
  multa: string;
  descripcion: string;
  fecha: string;
}

const User: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false); // Estado para mostrar/ocultar el menú de usuario
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); // Estado para mostrar/ocultar el modal de cambio de contraseña
  const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la nueva contraseña
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  const userName = localStorage.getItem("userName") || "Usuario";
  const userDepartment = localStorage.getItem("userDepartment") || "Departamento";

  // Obtener notificaciones
  const fetchNotifications = useCallback(async () => {
    try {
      const department = localStorage.getItem("userDepartment");
      if (!department || !token) {
        throw new Error("Faltan datos necesarios (departamento o token)");
      }

      const response = await fetch(
        `https://api-celeste.onrender.com/api/notificaciones?department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener notificaciones");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
      toast.error("Error al obtener las notificaciones.");
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Actualizar notificaciones cada 10 segundos
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Eliminar notificación
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(
        `https://api-celeste.onrender.com/api/notificaciones/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notificationId)
      );
      toast.success("Notificación eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
      toast.error("Error al eliminar la notificación.");
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    try {
      // Validar que las contraseñas coincidan
      if (newPassword !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }

      // Preguntar al usuario si está seguro de cambiar la contraseña
      const isConfirmed = window.confirm("¿Estás seguro de cambiar la contraseña?");
      if (!isConfirmed) {
        return;
      }

      // Enviar la solicitud para cambiar la contraseña
      const response = await fetch("https://api-celeste.onrender.com/api/cambiar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar la contraseña");
      }

      // Mostrar alerta de "Cerrando sesión en todos los dispositivos"
      window.alert("Cerrando sesión en todos los dispositivos...");

      // Eliminar el token permanente de la base de datos
      await fetch("https://api-celeste.onrender.com/api/eliminar-token-permanente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        localStorage.clear(); // Limpiar el localStorage
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      toast.error("Error al cambiar la contraseña.");
    }
  };






  

  return (
    <div className="flex h-screen">
      <Sesion />
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          <nav className="mt-10 space-y-4">
            <button
              onClick={() => navigate("/user")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button
              onClick={() => navigate("/pagos")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
              <span className="text-sm font-medium">Pagos</span>
            </button>
            <button
              onClick={() => navigate("/multas")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button
              onClick={() => navigate("/permisos")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
              <span className="text-sm font-medium">Permisos portones</span>
            </button>
          </nav>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left mb-8"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-4" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-300 relative p-28">
        {/* Notificaciones */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBell} className="text-2xl" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-md rounded-lg p-4 z-10">
                <h2 className="text-lg font-bold mb-2">Notificaciones</h2>
                {notifications.length === 0 ? (
                  <p className="text-gray-500">No tienes notificaciones.</p>
                ) : (
                  <ul className="space-y-2">
                    {notifications.map((notif, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-3 rounded-lg shadow flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm">
                            <strong>Usuario:</strong> {notif.usuario}
                          </p>
                          <p className="text-sm">
                            <strong>Departamento:</strong> {notif.departamento}
                          </p>
                          <p className="text-sm">
                            <strong>Multa:</strong> {notif.multa}
                          </p>
                          <p className="text-sm">
                            <strong>Descripción:</strong> {notif.descripcion}
                          </p>
                          <p className="text-sm">
                            <strong>Fecha:</strong>{" "}
                            {new Date(notif.fecha).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          className="text-red-600 hover:text-red-800 font-semibold"
                          onClick={() => handleDeleteNotification(notif._id)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-10">
                <h2 className="text-lg font-bold mb-2">Datos del usuario</h2>
                <p className="text-sm">
                  <strong>Nombre:</strong> {userName}
                </p>
                <p className="text-sm">
                  <strong>Departamento:</strong> {userDepartment}
                </p>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Cambiar contraseña
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal para cambiar contraseña */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de bienvenida */}
        <h1 className="text-center text-2xl font-bold mb-12">
          ¡Bienvenid@, {userName} (Departamento {userDepartment})!
        </h1>
      </div>
    </div>
  );
};

export default User;