import React, { useState, useEffect } from "react";
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

const Pagos: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Datos simulados de pagos
  const simulatedPayments = [
    { id: 1, nombreCompleto: "Ari Johan Alvarado Fausto", role: "Administrador", tower: "Del Rey", department: 506, pagado: true },
    { id: 2, nombreCompleto: "Vania Abril Alvarado Fausto", role: "Inquilino", tower: "Alta", department: 518, pagado: true },
    { id: 3, nombreCompleto: "Valeria Gómez Torres", role: "Dueño", tower: "Baja", department: 507, pagado: false },
    { id: 4, nombreCompleto: "Diego Ramírez Pérez", role: "Inquilino", tower: "Fina", department: 514, pagado: true },
    { id: 5, nombreCompleto: "Lucas Martínez Rivera", role: "Inquilino", tower: "Country", department: 501, pagado: false },
    { id: 6, nombreCompleto: "Clara Fernández Ruiz", role: "Dueño", tower: "Del Castillo", department: 516, pagado: false },
    { id: 7, nombreCompleto: "Camila Rodríguez Ortega", role: "Inquilino", tower: "Gemela", department: 524, pagado: true },
  ];

  useEffect(() => {
    // Simular la carga de pagos
    setPayments(simulatedPayments);
  }, []);

  // Obtener notificaciones
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
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Eliminar notificación
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(
        `https://api-celeste.onrender.com/api/notificaciones/${notificationId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la notificación");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  // Filtrar pagos según búsqueda
  const filteredPayments = payments.filter((payment) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      payment.id.toString().includes(searchTerm) ||
      payment.nombreCompleto.toLowerCase().includes(lowerSearchTerm) ||
      (lowerSearchTerm.includes("paga") && payment.pagado) ||
      (lowerSearchTerm.includes("no ") && !payment.pagado)
    );
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          <nav className="mt-10 space-y-4">
            <button onClick={() => navigate("/user")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button className="flex items-center px-6 py-3 bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
              <span className="text-sm font-medium">Pagos</span>
            </button>
            <button onClick={() => navigate("/multas")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button onClick={() => navigate("/permisos")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
              <span className="text-sm font-medium">Permisos portones</span>
            </button>
          </nav>
        </div>
        <button onClick={() => navigate("/")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left mb-8">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-4" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      {/* Main Content */}
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
                  {notifications.map((notif, index) => (
                    <li key={index} className="bg-gray-100 p-3 rounded-lg shadow flex justify-between items-center">
                      <div>
                        <p className="text-sm"><strong>Usuario:</strong> {notif.usuario}</p>
                        <p className="text-sm"><strong>Departamento:</strong> {notif.departamento}</p>
                        <p className="text-sm"><strong>Pago:</strong> {notif.pago}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800 font-semibold" onClick={() => handleDeleteNotification(notif._id)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <h1 className="text-center text-2xl font-bold mb-6">Pagos</h1>

        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por ID, nombre o estado (Pagado / No pagado)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#2F68A1] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre completo</th>
                <th className="px-4 py-2">Rol del usuario</th>
                <th className="px-4 py-2">Torre</th>
                <th className="px-4 py-2">Departamento</th>
                <th className="px-4 py-2">Pagado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{payment.id}</td>
                  <td className="border px-4 py-2">{payment.nombreCompleto}</td>
                  <td className="border px-4 py-2">{payment.role}</td>
                  <td className="border px-4 py-2">{payment.tower}</td>
                  <td className="border px-4 py-2">{payment.department}</td>
                  <td className="border px-4 py-2 text-center">
                    {payment.pagado ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Pagado
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        No Pagado
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pagos;