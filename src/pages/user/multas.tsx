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
  faPen,
  faTrash,
  faFileAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// Componente Multas
const Multas: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFine, setNewFine] = useState({
    usuario: "",
    nombreCompleto: "",
    departamento: "",
    torre: "",
    multa: "",
  });
  const [fines, setFines] = useState<any[]>([]);

  // Obtener multas del backend
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch("https://api-celeste.onrender.com/api/obtener_multas");
        const data = await response.json();
        setFines(data);
      } catch (error) {
        console.error("Error al obtener las multas:", error);
      }
    };

    fetchFines();
  }, []);

  const filteredFines = fines.filter((fine) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      fine.id.toString().includes(searchTerm) ||
      fine.nombreCompleto.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const handleModalSubmit = async () => {
    try {
      const response = await fetch("https://api-celeste.onrender.com/api/insertar_multas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFine),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Nueva multa registrada:", data);
        
        // Refrescar la lista de multas tras agregar una nueva
        const fetchFines = async () => {
          try {
            const response = await fetch("https://api-celeste.onrender.com/api/obtener_multas");
            const data = await response.json();
            setFines(data); // Actualiza las multas sin necesidad de recargar la página
          } catch (error) {
            console.error("Error al obtener las multas:", error);
          }
        };
        fetchFines();

        setIsModalOpen(false);
        setNewFine({ usuario: "", nombreCompleto: "", departamento: "", torre: "", multa: "" });
      } else {
        alert(data.message || "Hubo un error al registrar la multa");
      }
    } catch (error) {
      console.error("Error al registrar la multa:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#2F68A1] text-white w-64 flex flex-col justify-between">
        <div>
          {/* Navigation */}
          <nav className="mt-10 space-y-4">
            <button onClick={() => navigate("/user")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
              <FontAwesomeIcon icon={faHome} className="text-xl mr-4" />
              <span className="text-sm font-medium">Inicio</span>
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

        <h1 className="text-center text-2xl font-bold mb-6">Multas</h1>

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
              {filteredFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{fine.id}</td>
                  <td className="border px-4 py-2">{fine.nombreCompleto}</td>
                  <td className="border px-4 py-2">{fine.usuario}</td>
                  <td className="border px-4 py-2">{fine.torre}</td>
                  <td className="border px-4 py-2">{fine.departamento}</td>
                  <td className="border px-4 py-2">{fine.multa}</td>
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

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Añadir multa
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Registrar Multa</h2>
              <input
                type="text"
                placeholder="Nombre completo"
                value={newFine.nombreCompleto}
                onChange={(e) => setNewFine({ ...newFine, nombreCompleto: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Rol del usuario"
                value={newFine.usuario}
                onChange={(e) => setNewFine({ ...newFine, usuario: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Torre"
                value={newFine.torre}
                onChange={(e) => setNewFine({ ...newFine, torre: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="number"
                placeholder="Departamento"
                value={newFine.departamento}
                onChange={(e) => setNewFine({ ...newFine, departamento: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Multa ($)"
                value={newFine.multa}
                onChange={(e) => setNewFine({ ...newFine, multa: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleModalSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multas;
