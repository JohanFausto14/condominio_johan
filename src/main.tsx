import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Verificacion from "./pages/verificacion";
import Admin from "./pages/admin";
import "./index.css"; // Mantén el estilo global

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verificacion" element={<Verificacion />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
