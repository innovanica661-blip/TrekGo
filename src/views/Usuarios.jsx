import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db } from "../database/firebaseconfig"; // Ajusta esta ruta si es necesario
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import ModalRegistroUsuarios from "../components/usuarios/ModalRegistroUsuarios";
import ModalEdicionUsuarios from "../components/usuarios/ModalEdicionUsuarios";
import ModalEliminacionUsuarios from "../components/usuarios/ModalEliminacionUsuarios";

const Usuarios = () => {
  // Estados para manejo de datos
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
  });
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de usuarios por página

  // Referencia a la colección de usuarios en Firestore
  const usuariosCollection = collection(db, "usuarios");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Función para obtener todos los usuarios de Firestore
  const fetchUsuarios = () => {
    const stopListening = onSnapshot(usuariosCollection, (snapshot) => {
      const fetchedUsuarios = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsuarios(fetchedUsuarios);
      setUsuariosFiltrados(fetchedUsuarios);
      console.log("Usuarios cargados desde Firestore:", fetchedUsuarios);
      if (isOffline) console.log("Offline: Mostrando datos desde la caché local.");
    }, (error) => {
      console.error("Error al escuchar usuarios:", error);
      if (isOffline) console.log("Offline: Mostrando datos desde la caché local.");
      else alert("Error al cargar los usuarios: " + error.message);
    });
    return stopListening;
  };

  useEffect(() => {
    const cleanupListener = fetchUsuarios();
    return () => cleanupListener();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(text) ||
      usuario.apellido.toLowerCase().includes(text) ||
      usuario.cedula.toLowerCase().includes(text) ||
      usuario.telefono.toLowerCase().includes(text)
    );
    setUsuariosFiltrados(filtrados);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellido || !nuevoUsuario.cedula || !nuevoUsuario.telefono) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    setShowModal(false);
    const tempId = `temp_${Date.now()}`;
    const usuarioConId = { ...nuevoUsuario, id: tempId };
    try {
      setUsuarios((prev) => [...prev, usuarioConId]);
      setUsuariosFiltrados((prev) => [...prev, usuarioConId]);
      setNuevoUsuario({ nombre: "", apellido: "", cedula: "", telefono: "" });
      await addDoc(usuariosCollection, nuevoUsuario);
      if (isOffline) console.log("Usuario agregado localmente (sin conexión).");
      else console.log("Usuario agregado exitosamente en la nube.");
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      if (isOffline) console.log("Offline: Usuario almacenado localmente.");
      else {
        setUsuarios((prev) => prev.filter((usr) => usr.id !== tempId));
        setUsuariosFiltrados((prev) => prev.filter((usr) => usr.id !== tempId));
        alert("Error al agregar el usuario: " + error.message);
      }
    }
  };

  const handleEditUsuario = async () => {
    if (!usuarioEditado?.nombre || !usuarioEditado?.apellido || !usuarioEditado?.cedula || !usuarioEditado?.telefono) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    setShowEditModal(false);
    const usuarioRef = doc(db, "usuarios", usuarioEditado.id);
    try {
      await updateDoc(usuarioRef, {
        nombre: usuarioEditado.nombre,
        apellido: usuarioEditado.apellido,
        cedula: usuarioEditado.cedula,
        telefono: usuarioEditado.telefono,
      });
      if (isOffline) {
        setUsuarios((prev) =>
          prev.map((usr) => (usr.id === usuarioEditado.id ? { ...usuarioEditado } : usr))
        );
        setUsuariosFiltrados((prev) =>
          prev.map((usr) => (usr.id === usuarioEditado.id ? { ...usuarioEditado } : usr))
        );
        console.log("Usuario actualizado localmente (sin conexión).");
      } else console.log("Usuario actualizado exitosamente en la nube.");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setUsuarios((prev) =>
        prev.map((usr) => (usr.id === usuarioEditado.id ? { ...usuarioEditado } : usr))
      );
      setUsuariosFiltrados((prev) =>
        prev.map((usr) => (usr.id === usuarioEditado.id ? { ...usuarioEditado } : usr))
      );
      alert("Ocurrió un error al actualizar el usuario: " + error.message);
    }
  };

  const handleDeleteUsuario = async () => {
    if (!usuarioAEliminar) return;
    setShowDeleteModal(false);
    try {
      setUsuarios((prev) => prev.filter((usr) => usr.id !== usuarioAEliminar.id));
      setUsuariosFiltrados((prev) => prev.filter((usr) => usr.id !== usuarioAEliminar.id));
      const usuarioRef = doc(db, "usuarios", usuarioAEliminar.id);
      await deleteDoc(usuarioRef);
      if (isOffline) console.log("Usuario eliminado localmente (sin conexión).");
      else console.log("Usuario eliminado exitosamente en la nube.");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      if (isOffline) console.log("Offline: Eliminación almacenada localmente.");
      else {
        setUsuarios((prev) => [...prev, usuarioAEliminar]);
        setUsuariosFiltrados((prev) => [...prev, usuarioAEliminar]);
        alert("Error al eliminar el usuario: " + error.message);
      }
    }
  };

  const openEditModal = (usuario) => {
    setUsuarioEditado({ ...usuario });
    setShowEditModal(true);
  };

  const openDeleteModal = (usuario) => {
    setUsuarioAEliminar(usuario);
    setShowDeleteModal(true);
  };

  const paginatedUsuarios = usuariosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Usuarios</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
            Agregar usuario
          </Button>
        </Col>
      </Row>

      <TablaUsuarios
        usuarios={paginatedUsuarios}
        totalItems={usuariosFiltrados.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      <ModalRegistroUsuarios
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoUsuario={nuevoUsuario}
        handleInputChange={handleInputChange}
        handleAddUsuario={handleAddUsuario}
      />
      <ModalEdicionUsuarios
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        usuarioEditado={usuarioEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditUsuario={handleEditUsuario}
      />
      <ModalEliminacionUsuarios
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteUsuario={handleDeleteUsuario}
        usuarioAEliminar={usuarioAEliminar}
      />
    </Container>
  );
};

export default Usuarios;