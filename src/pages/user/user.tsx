import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faHome,
  faDollarSign,
  faGavel,
  faDoorOpen,
  faSignOutAlt,
  faPen,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

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
  const [userImage, setUserImage] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Obtener el nombre y el departamento del usuario desde el localStorage
  const userName = localStorage.getItem("userName") || "Usuario";
  const userDepartment = localStorage.getItem("userDepartment") || "Departamento";

  // Función para obtener notificaciones desde el backend
  const fetchNotifications = async () => {
    try {
      const department = localStorage.getItem("userDepartment");

      if (!department) {
        throw new Error("No se encontró el departamento");
      }

      const response = await fetch(
        `https://api-celeste.onrender.com/api/notificaciones?department=${department}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener notificaciones");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 1000); // Consultar cada 10 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para eliminar una notificación
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(
        `https://api-celeste.onrender.com/api/notificaciones/${notificationId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      // Eliminar la notificación del estado local
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          {/* Navigation */}
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

        {/* Logout */}
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
        {/* Notifications Icon */}
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

                        {/* Eliminar Notificación */}
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

          {/* User Image */}
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img
                src={userImage || "https://via.placeholder.com/150"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="fileInput"
              className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
            >
              <FontAwesomeIcon icon={faPen} className="text-black w-3 h-3" />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Mensaje de bienvenida personalizado */}
        <h1 className="text-center text-2xl font-bold mb-12">
          ¡Bienvenid@, {userName} (Departamento {userDepartment})!
        </h1>
      </div>
    </div>
  );
};

export default User;