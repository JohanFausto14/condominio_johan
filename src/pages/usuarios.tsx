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

const Usuarios: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: "Ari Johan Alvarado Fausto", phone: "3386746221", role: "Administrador", tower: "Del Rey", department: 506 },
    { id: 2, name: "Vania Abril Alvarado Fausto", phone: "3346746254", role: "Inquilino", tower: "Alta", department: 518 },
    { id: 3, name: "Valeria Gómez Torres", phone: "3377357935", role: "Dueño", tower: "Baja", department: 507 },
    { id: 4, name: "Diego Ramírez Pérez", phone: "3343321179", role: "Inquilino", tower: "Fina", department: 514 },
    { id: 5, name: "Lucas Martínez Rivera", phone: "3388420225", role: "Inquilino", tower: "Country", department: 501 },
    { id: 6, name: "Clara Fernández Ruiz", phone: "3375460528", role: "Dueño", tower: "Del Castillo", department: 516 },
    { id: 7, name: "Camila Rodríguez Ortega", phone: "3327473379", role: "Inquilino", tower: "Gemela", department: 524 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    middleName: "",
    phone: "",
    department: "",
    tower: "",
    password: "",
    role: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery)
  );

  const handleAddUser = () => {
    const newUserEntry = {
      id: users.length + 1,
      name: `${newUser.name} ${newUser.lastName} ${newUser.middleName}`,
      phone: newUser.phone,
      role: newUser.role,
      tower: newUser.tower,
      department: Number(newUser.department),
    };
    setUsers([...users, newUserEntry]);
    setIsModalOpen(false);
    setNewUser({
      name: "",
      lastName: "",
      middleName: "",
      phone: "",
      department: "",
      tower: "",
      password: "",
      role: "",
    });
  };

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
                  <button onClick={() => navigate("/permisos")} className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
                    <FontAwesomeIcon icon={faDoorOpen} className="text-xl mr-4" />
                    <span className="text-sm font-medium">Permisos portones</span>
                  </button>
                </nav>
        </div>
        <div className="mb-10">
          <button className="flex items-center px-6 py-3 hover:bg-blue-600 w-full text-left">
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
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.id}</td>
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
                  placeholder="Apellido paterno"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Apellido materno"
                  value={newUser.middleName}
                  onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
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
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="Inquilino"
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                    <span>Inquilino</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="Dueño"
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                    <span>Dueño</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="Administrador"
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                    <span>Administrador</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600"
                >
                  Registrar
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
