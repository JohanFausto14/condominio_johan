import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/Admin/admin";
import User from "./pages/user/user";
import Usuarios from "./pages/Admin/usuarios";
import Pagos from "./pages/user/pagos";
import Multas from "./pages/user/multas";
import Permisos from "./pages/user/permisos";
import MultasAd from "./pages/Admin/multas_ad";
import PermisosAd from "./pages/Admin/permisos_ad";
import PagosAd from "./pages/Admin/pagos_ad";
import Olvido from "./pages/Olvido";
import NuevaContraseña from "./pages/NuevaContraseña";
import "./index.css";

// Componente de protección simplificado
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/Olvido" element={<Olvido />} />
          <Route path="/restablecer/:token" element={<NuevaContraseña />} />

          {/* Rutas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagos"
            element={
              <ProtectedRoute>
                <Pagos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/multas"
            element={
              <ProtectedRoute>
                <Multas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permisos"
            element={
              <ProtectedRoute>
                <Permisos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/multas_ad"
            element={
              <ProtectedRoute>
                <MultasAd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/permisos_ad"
            element={
              <ProtectedRoute>
                <PermisosAd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pagos_ad"
            element={
              <ProtectedRoute>
                <PagosAd />
              </ProtectedRoute>
            }
          />

          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento raíz en el DOM.");
}