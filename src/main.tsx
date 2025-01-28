import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import "./index.css"; // Mantén el estilo global

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/multas" element={<Multas />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/admin/multas_ad" element={<MultasAd />} />
          <Route path="/admin/permisos_ad" element={<PermisosAd />} />
          <Route path="/admin/pagos_ad" element={<PagosAd />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento raíz en el DOM.");
}
