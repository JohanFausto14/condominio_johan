import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faDollarSign, faGavel, faDoorOpen, faSignOutAlt, faSearch, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PermisosPortones: React.FC = () => {
  const navigate = useNavigate();

  const permissions = [
    { id: 1, name: "Ari Johan Alvarado Fausto", role: "Administrador", tower: "Del Rey", department: 506, permission: "Autorizado" },
    { id: 2, name: "Vania Abril Alvarado Fausto", role: "Inquilino", tower: "Alta", department: 518, permission: "Autorizado" },
    { id: 3, name: "Valeria Gómez Torres", role: "Dueño", tower: "Baja", department: 507, permission: "No autorizado" },
    { id: 4, name: "Diego Ramírez Pérez", role: "Inquilino", tower: "Fina", department: 514, permission: "Autorizado" },
    { id: 5, name: "Lucas Martínez Rivera", role: "Inquilino", tower: "Country", department: 501, permission: "No autorizado" },
    { id: 6, name: "Clara Fernández Ruiz", role: "Dueño", tower: "Del Castillo", department: 516, permission: "No autorizado" },
    { id: 7, name: "Camila Rodríguez Ortega", role: "Inquilino", tower: "Gemela", department: 524, permission: "Autorizado" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
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
            <button onClick={() => navigate("/multas")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button className="flex items-center px-6 py-3 bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
              <span className="text-sm font-medium">Permiso de portones</span>
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
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <img src="https://via.placeholder.com/150" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold mb-6">Permiso de portones</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscador de usuarios"
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#2F68A1] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre completo</th>
                <th className="px-4 py-2">Rol del usuario</th>
                <th className="px-4 py-2">Torre</th>
                <th className="px-4 py-2">Departamento</th>
                <th className="px-4 py-2">Permiso</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.tower}</td>
                  <td className="border px-4 py-2">{user.department}</td>
                  <td className="border px-4 py-2">{user.permission}</td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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

export default PermisosPortones;
