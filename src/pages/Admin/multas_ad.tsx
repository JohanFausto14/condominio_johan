import React, { useState, useEffect } from "react";
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
  faPlus,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/modal";

interface Fine {
  id: number;
  usuario: string;
  nombreCompleto: string;
  departamento: string;
  torre: string;
  multa: string;
  descripcion: string;
  fecha: string;
}

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
    descripcion: "",
    fecha: "",
  });
  const [fines, setFines] = useState<Fine[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const finesPerPage = 7;
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await fetch("https://api-celeste.onrender.com/api/obtener_multas", {
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
  }, [token]); // Dependencia: token

  const fetchDepartmentData = async (departamento: string) => {
    try {
      const response = await fetch(
        `https://api-celeste.onrender.com/api/obtener_datos_departamento?departamento=${departamento}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos del departamento.");
      }
  
      const data = await response.json();
      if (data) {
        setNewFine((prev) => ({
          ...prev,
          usuario: data.usuario,
          nombreCompleto: data.nombreCompleto,
          torre: data.torre,
        }));
      } else {
        setNewFine((prev) => ({
          ...prev,
          usuario: "",
          nombreCompleto: "",
          torre: "",
        }));
        toast.error("Departamento no encontrado.");
      }
    } catch (error) {
      console.error("Departamento no encontrado:", error);
      toast.error("Departamento no encontrado");
    }
  };

  const handleDepartmentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const departamento = e.target.value;
    setNewFine((prev) => ({ ...prev, departamento }));
    if (departamento) {
      await fetchDepartmentData(departamento);
    } else {
      setNewFine((prev) => ({
        ...prev,
        usuario: "",
        nombreCompleto: "",
        torre: "",
      }));
    }
  };

  const filteredFines = fines.filter((fine) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      fine.id.toString().includes(searchTerm) ||
      fine.nombreCompleto.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const indexOfLastFine = currentPage * finesPerPage;
  const indexOfFirstFine = indexOfLastFine - finesPerPage;
  const currentFines = filteredFines.slice(indexOfFirstFine, indexOfLastFine);

  const handleModalSubmit = async () => {
    if (isSubmitting) return;
  
    if (newFine.departamento === "1") {
      toast.error("No se puede multar al departamento 1 (administrador).");
      return;
    }
  
    if (
      !newFine.departamento ||
      !newFine.nombreCompleto ||
      !newFine.multa ||
      !newFine.descripcion ||
      !newFine.fecha
    ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }
  
    if (isNaN(Number(newFine.multa)) || Number(newFine.multa) <= 0) {
      toast.error("El valor de la multa debe ser un número válido y mayor que 0.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0];
    if (newFine.fecha > today) {
      toast.error("La fecha de la multa no puede ser en el futuro.");
      return;
    }
  
    try {
      setIsSubmitting(true);
      const response = await fetch("https://api-celeste.onrender.com/api/insertar_multas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
        body: JSON.stringify(newFine),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Multa registrada exitosamente.");
  
        // Actualizar la lista de multas
        const fetchFines = async () => {
          try {
            const response = await fetch("https://api-celeste.onrender.com/api/obtener_multas", {
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
              },
            });
            const data = await response.json();
            setFines(data);
          } catch (error) {
            console.error("Error al obtener las multas:", error);
            toast.error("Error al obtener las multas.");
          }
        };
        await fetchFines();
  
        setIsModalOpen(false);
        setNewFine({
          usuario: "",
          nombreCompleto: "",
          departamento: "",
          torre: "",
          multa: "",
          descripcion: "",
          fecha: "",
        });
      } else {
        toast.error(data.message || "Hubo un error al registrar la multa.");
      }
    } catch (error) {
      console.error("Error al registrar la multa:", error);
      toast.error("Error al registrar la multa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen">
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
        <h1 className="text-center text-2xl font-bold mb-6">Multas</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Buscar por ID o nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Añadir multa
          </button>
        </div>

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
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentFines.map((fine) => (
                <tr key={fine.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{fine.id}</td>
                  <td className="border px-4 py-2">{fine.nombreCompleto}</td>
                  <td className="border px-4 py-2">{fine.usuario}</td>
                  <td className="border px-4 py-2">{fine.torre}</td>
                  <td className="border px-4 py-2">{fine.departamento}</td>
                  <td className="border px-4 py-2">{fine.multa}</td>
                  <td className="border px-4 py-2">{fine.descripcion}</td>
                  <td className="border px-4 py-2">{fine.fecha}</td>
                  <td className="border px-4 py-2 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="text-red-500 mr-2 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFines.length > finesPerPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 hover:bg-blue-700"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * finesPerPage >= filteredFines.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Siguiente
            </button>
          </div>
        )}

<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isSubmitting={isSubmitting}>
  <h2 className="text-xl font-bold mb-4">Registrar Multa</h2>
  <input
    type="text"
    placeholder="Departamento"
    value={newFine.departamento}
    onChange={handleDepartmentChange}
    className="w-full p-2 mb-4 border rounded"
  />
  <input
    type="text"
    placeholder="Nombre completo"
    value={newFine.nombreCompleto}
    readOnly
    className="w-full p-2 mb-4 border rounded bg-gray-100"
  />
  <input
    type="text"
    placeholder="Rol del usuario"
    value={newFine.usuario}
    readOnly
    className="w-full p-2 mb-4 border rounded bg-gray-100"
  />
  <input
    type="text"
    placeholder="Torre"
    value={newFine.torre}
    readOnly
    className="w-full p-2 mb-4 border rounded bg-gray-100"
  />
  <input
    type="text"
    placeholder="Multa ($)"
    value={newFine.multa}
    onChange={(e) => setNewFine({ ...newFine, multa: e.target.value })}
    className="w-full p-2 mb-4 border rounded"
  />
  <textarea
    placeholder="Descripción de la multa"
    value={newFine.descripcion}
    onChange={(e) => setNewFine({ ...newFine, descripcion: e.target.value })}
    className="w-full p-2 mb-4 border rounded"
  />
  <input
    type="date"
    placeholder="Fecha de la multa"
    value={newFine.fecha}
    onChange={(e) => setNewFine({ ...newFine, fecha: e.target.value })}
    className="w-full p-2 mb-4 border rounded"
  />
  <div className="flex justify-end space-x-2">
    <button
      onClick={() => setIsModalOpen(false)}
      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
      disabled={isSubmitting}
    >
      Cancelar
    </button>
    <button
      onClick={handleModalSubmit}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          Guardando...
        </>
      ) : (
        "Guardar"
      )}
    </button>
  </div>
</Modal>
      </div>
    </div>
  );
};

export default Multas;