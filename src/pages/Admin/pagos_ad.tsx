import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faHome,
  faUser,
  faDollarSign,
  faGavel,
  faDoorOpen,
  faSignOutAlt,
  faSearch,
  faPen,
  faTrash,
  faFileAlt, // Historial de pagos
} from "@fortawesome/free-solid-svg-icons";

const Pagos: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const payments = [
    { id: 1, name: "Ari Johan Alvarado Fausto", role: "Administrador", tower: "Del Rey", department: 506, paid: true },
    { id: 2, name: "Vania Abril Alvarado Fausto", role: "Inquilino", tower: "Alta", department: 518, paid: true },
    { id: 3, name: "Valeria Gómez Torres", role: "Dueño", tower: "Baja", department: 507, paid: false },
    { id: 4, name: "Diego Ramírez Pérez", role: "Inquilino", tower: "Fina", department: 514, paid: true },
    { id: 5, name: "Lucas Martínez Rivera", role: "Inquilino", tower: "Country", department: 501, paid: false },
    { id: 6, name: "Clara Fernández Ruiz", role: "Dueño", tower: "Del Castillo", department: 516, paid: false },
    { id: 7, name: "Camila Rodríguez Ortega", role: "Inquilino", tower: "Gemela", department: 524, paid: true },
  ];

  // Filtrar los pagos según el término de búsqueda
  const filteredPayments = payments.filter((payment) => {
    const lowerSearchTerm = searchTerm.toLowerCase(); // Normalizar el término de búsqueda

    // Coincidencias parciales para "paga" y "no "
    const isPaidMatch = lowerSearchTerm.includes("paga") && payment.paid; // Buscar "paga" para pagos
    const isNotPaidMatch = lowerSearchTerm.includes("no ") && !payment.paid; // Buscar "no " para no pagos

    return (
      payment.id.toString().includes(searchTerm) || // Filtrar por ID
      payment.name.toLowerCase().includes(lowerSearchTerm) || // Filtrar por Nombre
      isPaidMatch || // Coincidencia con "paga"
      isNotPaidMatch // Coincidencia con "no "
    );
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          {/* Navigation */}
          <nav className="mt-10 space-y-4">
            <button onClick={() => navigate("/admin")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button onClick={() => navigate("/usuarios")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-4" />
              <span className="text-sm font-medium">Usuarios</span>
            </button>
            <button onClick={() => navigate("/Admin/pagos_ad")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
                         <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
                         <span className="text-sm font-medium">Pagos</span>
                       </button>
            <button onClick={() => navigate("/Admin/multas_ad")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button onClick={() => navigate("/Admin/permisos_ad")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
              <span className="text-sm font-medium">Permisos portones</span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button onClick={() => navigate("/")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left mb-8">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-4" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-300 relative p-10">
        {/* User Image in Top-Right */}
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-center text-2xl font-bold mb-6">Pagos</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por ID, nombre o estado (Pagado / No pagado )"
            value={searchTerm} // Conectar el estado
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        {/* Payments Table */}
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
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{payment.id}</td>
                  <td className="border px-4 py-2">{payment.name}</td>
                  <td className="border px-4 py-2">{payment.role}</td>
                  <td className="border px-4 py-2">{payment.tower}</td>
                  <td className="border px-4 py-2">{payment.department}</td>
                  <td className="border px-4 py-2 text-center">
                    {payment.paid ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Pagado
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        No Pagado
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="text-red-500 mr-2 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Payment Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-100">
            Añadir pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagos;
