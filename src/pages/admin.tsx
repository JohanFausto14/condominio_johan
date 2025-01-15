import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faDollarSign,
  faGavel,
  faDoorOpen,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Admin: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          {/* Navigation */}
          <nav className="mt-10 space-y-4">
            <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-4" />
              <span className="text-sm font-medium">Usuarios</span>
            </button>
            <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
              <span className="text-sm font-medium">Pagos</span>
            </button>
            <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
              <span className="text-sm font-medium">Permisos portones</span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left mb-8">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-4" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-300 relative p-28">
        {/* User Image in Top-Right */}
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-gray-500 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <img
              src="https://via.placeholder.com/150" // Reemplaza con la URL real de la imagen del usuario
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-center text-2xl font-bold mb-12">
          Haz iniciado sesión como administrador!
        </h1>

        <h1 className="text-center text-2xl font-bold mb-2">
          Datos del usuario
        </h1>
        {/* User Info */}
        <div className="space-y-6 text-center">
          {/* Nombre */}
          <div>
            <span className="block text-black font-bold mb-1">Nombre:</span>
            <span className="bg-gray-100 px-12 py-2 rounded-3xl shadow-sm text-gray-800">
              Ari Johan Alvarado Fausto
            </span>
          </div>

          {/* Teléfono */}
          <div>
            <span className="block text-black  font-bold mb-1">Teléfono:</span>
            <span className="bg-gray-100 px-24 py-2 rounded-3xl shadow-sm text-gray-800">
              3386746221
            </span>
          </div>

          {/* Departamento */}
          <div>
            <span className="block text-black  font-bold mb-1">Departamento:</span>
            <span className="bg-gray-100 px-32 py-2 rounded-3xl shadow-sm text-gray-800">
              506
            </span>
          </div>

          {/* Torre */}
          <div>
            <span className="block text-black  font-bold mb-1">Torre:</span>
            <span className="bg-gray-100 px-28 py-2 rounded-3xl shadow-sm text-gray-800">
              Del Rey
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
