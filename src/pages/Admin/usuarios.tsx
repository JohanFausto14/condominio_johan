import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Usuarios: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]); // Lista de usuarios obtenida del backend
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    department: "",
    tower: "",
    role: "",
    password: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id?.toString().includes(searchQuery)
  );

  // Obtener usuarios al cargar el componente
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api-celeste.onrender.com/api/obtener_usuarios");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Registrar nuevo usuario
 // Registrar nuevo usuario
const handleAddUser = async () => {
  // Validar campos vacíos
  if (
    !newUser.name ||
    !newUser.phone ||
    !newUser.department ||
    !newUser.tower ||
    !newUser.role ||
    !newUser.password
  ) {
    toast.error("Todos los campos son obligatorios.");
    return;
  }

  // Validar que el celular tenga exactamente 10 dígitos
  if (newUser.phone.length !== 10) {
    toast.error("El número de celular debe tener exactamente 10 dígitos.");
    return;
  }

  // Validar si el número de teléfono ya está registrado
  const phoneExists = users.some((user) => user.phone === newUser.phone);
  if (phoneExists) {
    toast.error("El número de teléfono ya está registrado. Ingrese uno diferente.");
    return;
  }

  // Convertir el nuevo departamento a número
  const newDepartment = Number(newUser.department);

  // Validar si el departamento ya está registrado
  const departmentExists = users.some((user) => user.department === newDepartment);
  if (departmentExists) {
    toast.error("El departamento ya está registrado. Ingrese uno diferente.");
    return;
  }

  const newUserEntry = {
    name: newUser.name,
    phone: newUser.phone,
    department: newDepartment, // Usar el valor convertido a número
    tower: newUser.tower,
    role: newUser.role,
    password: newUser.password,
  };

  try {
    const response = await axios.post("https://api-celeste.onrender.com/api/insertar_usuario", newUserEntry);
    setUsers([...users, response.data.user]); // Actualizar lista de usuarios
    setIsModalOpen(false);
    setNewUser({
      name: "",
      phone: "",
      department: "",
      tower: "",
      role: "",
      password: "",
    });
    toast.success("Usuario registrado exitosamente.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(`Error al registrar el usuario: ${error.response?.data?.message || error.message}`);
    } else {
      toast.error("Error inesperado al registrar el usuario.");
    }
  }
};

  return (
    <div className="flex h-screen">
      {/* ToastContainer para mostrar las alertas */}
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
        <div className="mb-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left mb-8"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-4" />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-300 relative p-10">
        <h1 className="text-center text-2xl font-bold mb-6">Usuarios</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-6">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por ID o nombre"
            className="flex-1 bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#2F68A1] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre completo</th>
                <th className="px-4 py-2">Celular</th>
                <th className="px-4 py-2">Rol del usuario</th>
                <th className="px-4 py-2">Torre</th>
                <th className="px-4 py-2">Departamento</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.tower}</td>
                  <td className="border px-4 py-2">{user.department}</td>
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

        {/* Add User Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-100"
          >
            Añadir usuario
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Registrar Usuario</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <FontAwesomeIcon icon={faTimes} className="text-gray-700" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Campos del formulario */}
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Celular"
                  value={newUser.phone}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Solo números
                    setNewUser({ ...newUser, phone: inputValue });
                  }}
                  className="w-full border rounded-lg px-4 py-2"
                  maxLength={10} // Limitar a 10 dígitos
                />
                <input
                  type="text"
                  placeholder="Departamento"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Torre"
                  value={newUser.tower}
                  onChange={(e) => setNewUser({ ...newUser, tower: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Seleccionar rol</option>
                  <option value="Inquilino">Inquilino</option>
                  <option value="Dueño">Dueño</option>
                  <option value="Administrador">Administrador</option>
                </select>
                {/* Nuevo campo para la contraseña */}
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAddUser}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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

export default Usuarios;