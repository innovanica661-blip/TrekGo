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
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} allowedRoles={['admin', 'user']} />} />
            <Route path="/aves" element={<Aves />} allowedRoles={['admin', 'user']}  />
            <Route path="/guias" element={<Guias />} allowedRoles={['admin', 'user']}  />
            <Route path="/reserva" element={<Reservas />} allowedRoles={['admin']}  />
            <Route path="/catalogo" element={<Catalogo />} allowedRoles={['admin', 'user']}  />
            <Route path="/tipos" element={<Tipos />} allowedRoles={['admin']}  />
            <Route path="/usuarios" element={<Usuarios />} allowedRoles={['admin']}  />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;