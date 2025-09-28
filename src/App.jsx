import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/authcontext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from './views/Login'
import Encabezado from "./components/Encabezado";
import Inicio from "./views/Inicio";
import Aves from "./views/Aves";
import Tipos from "./views/Tipos";
import Guias from "./views/Guias";
import Reservas from "./views/Reserva";
import Catalogo from "./views/Catalogo";
import CatalogoGuias from "./views/CatalogoGuias";

import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
          <Encabezado />
          <main className="margen-superior-main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
              <Route path="/aves" element={<ProtectedRoute element={<Aves />} />}/>
              <Route path="/guias" element={<ProtectedRoute element={<Guias />} />}/>
              <Route path="/tipos" element={<ProtectedRoute element={<Tipos />} />}/>
              <Route path="/reserva" element={<ProtectedRoute element={<Reservas />} />}/>
              <Route path="/catalogo" element={<ProtectedRoute element={<Catalogo />} />}/>
              <Route path="/catalogoguias" element={<ProtectedRoute element={<CatalogoGuias />} />}/>
            </Routes>
          </main>
      </Router>
    </AuthProvider>
  )
}

export default App