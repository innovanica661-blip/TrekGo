// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/authcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './views/Login';
import Encabezado from "./components/Encabezado";
import Inicio from "./views/Inicio";
import Aves from "./views/Aves";
import Tipos from "./views/Tipos";
import Guias from "./views/Guias";
import Reservas from "./views/Reserva";
import Catalogo from "./views/Catalogo";
import Usuarios from "./views/Usuarios";
import Registro from "./views/Registro";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Encabezado />
        <main className="margen-superior-main">
          <Routes>
            {/* Publicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/guias" element={<Guias />} />
            <Route path="/reserva" element={<Reservas />} />
            <Route path="/aves" element={<Aves />} />

            {/* Login & Registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Protegidas por rol */}
            <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} allowedRoles={['admin','user']} />} />
            <Route path="/tipos" element={<ProtectedRoute element={<Tipos />} allowedRoles={['admin']} />} />
            <Route path="/usuarios" element={<ProtectedRoute element={<Usuarios />} allowedRoles={['admin']} />} />

            {/* Inicio admin/user protegido (opcional) */}
            <Route path="/inicio-protected" element={<ProtectedRoute element={<Inicio />} allowedRoles={['admin','user']} />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
