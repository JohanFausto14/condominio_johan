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
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Sesion from "../../components/sesion";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string | null>(null);

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

  return (
    <div className="flex h-screen">
            <Sesion />

      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          {/* Navigation */}
          <nav className="mt-10 space-y-4">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
            </button>
            <button
              onClick={() => navigate("/usuarios")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl mr-4" />
              <span className="text-sm font-medium">Usuarios</span>
            </button>
            <button
              onClick={() => navigate("/Admin/pagos_ad")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faDollarSign} className="text-xl mr-4" />
              <span className="text-sm font-medium">Pagos</span>
            </button>
            <button
              onClick={() => navigate("/Admin/multas_ad")}
              className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left"
            >
              <FontAwesomeIcon icon={faGavel} className="text-xl mr-4" />
              <span className="text-sm font-medium">Multas</span>
            </button>
            <button
              onClick={() => navigate("/Admin/permisos_ad")}
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
        {/* User Image in Top-Right */}
        <div className="absolute top-4 right-4">
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

        {/* Header */}
        <h1 className="text-center text-2xl font-bold mb-12">
          ¡Haz iniciado sesión como administrador!
        </h1>

        <h1 className="text-center text-2xl font-bold mb-2">Datos del usuario</h1>
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
            <span className="block text-black font-bold mb-1">Teléfono:</span>
            <span className="bg-gray-100 px-24 py-2 rounded-3xl shadow-sm text-gray-800">
              3320131621
            </span>
          </div>

          {/* Departamento */}
          <div>
            <span className="block text-black font-bold mb-1">Departamento:</span>
            <span className="bg-gray-100 px-32 py-2 rounded-3xl shadow-sm text-gray-800">
              1
            </span>
          </div>

          {/* Torre */}
          <div>
            <span className="block text-black font-bold mb-1">Torre:</span>
            <span className="bg-gray-100 px-28 py-2 rounded-3xl shadow-sm text-gray-800">
              A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;