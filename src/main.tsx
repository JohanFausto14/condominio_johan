import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Verificacion from "./pages/verificacion";
import Admin from "./pages/admin";
import Usuarios from "./pages/usuarios";
import Pagos from "./pages/pagos";
import Multas from "./pages/multas";
import Permisos from "./pages/permisos";



import "./index.css"; // Mantén el estilo global

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verificacion" element={<Verificacion />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/multas" element={<Multas />} />
        <Route path="/permisos" element={<Permisos />} />



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
