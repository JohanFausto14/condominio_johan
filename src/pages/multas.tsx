import React from "react";
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
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const Multas: React.FC = () => {
  const navigate = useNavigate();

  const fines = [
    { id: 1, name: "Ari Johan Alvarado Fausto", role: "Administrador", tower: "Del Rey", department: 506, fine: "$0" },
    { id: 2, name: "Vania Abril Alvarado Fausto", role: "Inquilino", tower: "Alta", department: 518, fine: "$0" },
    { id: 3, name: "Valeria Gómez Torres", role: "Dueño", tower: "Baja", department: 507, fine: "$750" },
    { id: 4, name: "Diego Ramírez Pérez", role: "Inquilino", tower: "Fina", department: 514, fine: "$0" },
    { id: 5, name: "Lucas Martínez Rivera", role: "Inquilino", tower: "Country", department: 501, fine: "$1700" },
    { id: 6, name: "Clara Fernández Ruiz", role: "Dueño", tower: "Del Castillo", department: 516, fine: "$1250" },
    { id: 7, name: "Camila Rodríguez Ortega", role: "Inquilino", tower: "Gemela", department: 524, fine: "$0" },
  ];

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
            <button onClick={() => navigate("/pagos")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
              <span className="text-sm font-medium">Pagos</span>
            </button>
            <button className="flex items-center px-6 py-3 bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button onClick={() => navigate("/permisos")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
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
        <h1 className="text-center text-2xl font-bold mb-6">Multas</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscador de usuarios"
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        {/* Fines Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#2F68A1] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre completo</th>
                <th className="px-4 py-2">Rol del usuario</th>
                <th className="px-4 py-2">Torre</th>
                <th className="px-4 py-2">Departamento</th>
                <th className="px-4 py-2">Multas</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{fine.id}</td>
                  <td className="border px-4 py-2">{fine.name}</td>
                  <td className="border px-4 py-2">{fine.role}</td>
                  <td className="border px-4 py-2">{fine.tower}</td>
                  <td className="border px-4 py-2">{fine.department}</td>
                  <td className="border px-4 py-2">{fine.fine}</td>
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

        {/* Add Fine Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-100">
            Añadir multa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multas;
