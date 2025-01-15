import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verificacion");
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
        <h2 className="text-5xl font-semibold text-center mb-6 text-black">Inicio de sesión</h2>
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.208 0 4-1.791 4-4s-1.792-4-4-4-4 1.791-4 4 1.792 4 4 4zm0 2c-2.673 0-8 1.341-8 4v2h16v-2c0-2.659-5.327-4-8-4z" />
            </svg>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Número de teléfono
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Ingresa tu número de teléfono"
              className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <p className="text-sm text-white">
            Ingresa tu número de teléfono para recibir un código de verificación por SMS.
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-blue-600 text-black hover:text-white py-2 px-8 rounded-3xl font-medium shadow-md transition-all"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
