import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

const Verificacion: React.FC = () => {
    const navigate = useNavigate();
  
    const handleConfirm = (e: React.FormEvent) => {
      e.preventDefault(); // Evita que el formulario recargue la página.
      navigate("/admin"); // Redirige a la ruta "/admin".
    };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/src/assets/Fondo.jpg')" }}>
      <div
        className="p-8 rounded-lg shadow-lg w-[450px] min-h-[500px] flex flex-col justify-center"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 51, 102, 0.8))",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2 className="text-5xl font-semibold text-center mb-6 text-black">Verificación</h2>
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-md">
            <FontAwesomeIcon icon={faUserCheck} className="text-white w-12 h-12" />
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleConfirm}>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-white mb-1">
              Código de verificación
            </label>
            <input
              type="text"
              id="code"
              placeholder="Ingresa el código"
              className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <p className="text-sm text-white text-center">
          Por favor, verifica tu número ingresando el código enviado por SMS.
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black hover:text-white py-2 px-8 rounded-3xl font-medium shadow-md transition-all"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verificacion;
