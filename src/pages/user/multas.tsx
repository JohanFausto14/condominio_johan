import React, { useState, useEffect,useCallback  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faHome,
  faDollarSign,
  faGavel,
  faDoorOpen,
  faSignOutAlt,
  faSearch,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Fine {
  id: number;
  nombreCompleto: string;
  usuario: string;
  torre: string;
  departamento: string;
  multa: string;
  descripcion: string;
  fecha: string;
}

interface Notification {
  _id: string;
  usuario: string;
  departamento: string;
  multa: string;
  descripcion: string;
  fecha: string;
}

const Multas: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [fines, setFines] = useState<Fine[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  // Obtener multas
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/obtener_multas", {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las multas.");
        }
        const data = await response.json();
        setFines(data);
      } catch (error) {
        console.error("Error al obtener las multas:", error);
        toast.error("Error al obtener las multas.");
      }
    };

    fetchFines();
  }, [token]);


  // ... (código anterior)
  
  const fetchNotifications = useCallback(async () => {
    try {
      const department = localStorage.getItem("userDepartment");
      if (!department) {
        throw new Error("No se encontró el departamento.");
      }
  
      const response = await fetch(
        `http://localhost:4000/api/notificaciones?department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener notificaciones.");
      }
  
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
      toast.error("Error al obtener las notificaciones.");
    }
  }, [token]); // Dependencias de `fetchNotifications`
  
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Actualizar notificaciones cada 10 segundos
    return () => clearInterval(interval);
  }, [fetchNotifications]); // `fetchNotifications` como dependencia
  // Eliminar una notificación
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/notificaciones/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación.");
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

  // Filtrar multas
  const filteredFines = fines.filter((fine) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      fine.id.toString().includes(searchTerm) ||
      fine.nombreCompleto.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="flex h-screen">
      {/* ToastContainer para mostrar alertas */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
              className="flex items-center px-6 py-3 bg-blue-600 w-full text-left"
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

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-300 relative p-10">
        {/* Notificaciones */}
        <div className="absolute top-4 right-4">
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
                  {notifications.map((notif) => (
                    <li key={notif._id} className="bg-gray-100 p-3 rounded-lg shadow flex justify-between items-center">
                      <div>
                        <p className="text-sm"><strong>Usuario:</strong> {notif.usuario}</p>
                        <p className="text-sm"><strong>Departamento:</strong> {notif.departamento}</p>
                        <p className="text-sm"><strong>Multa:</strong> {notif.multa}</p>
                        <p className="text-sm"><strong>Descripción:</strong> {notif.descripcion}</p>
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

        <h1 className="text-center text-2xl font-bold mb-6">Multas</h1>

        {/* Barra de búsqueda */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por ID o nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        {/* Tabla de multas */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#2F68A1] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre completo</th>
                <th className="px-4 py-2">Rol usuario</th>
                <th className="px-4 py-2">Torre</th>
                <th className="px-4 py-2">Departamento</th>
                <th className="px-4 py-2">Multas</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{fine.id}</td>
                  <td className="border px-4 py-2">{fine.nombreCompleto}</td>
                  <td className="border px-4 py-2">{fine.usuario}</td>
                  <td className="border px-4 py-2">{fine.torre}</td>
                  <td className="border px-4 py-2">{fine.departamento}</td>
                  <td className="border px-4 py-2">{fine.multa}</td>
                  <td className="border px-4 py-2">{fine.descripcion}</td>
                  <td className="border px-4 py-2">{fine.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Multas;