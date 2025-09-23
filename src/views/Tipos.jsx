// Importaciones
import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import TablaTipos from "../components/tipo/TablaTipos";
import ModalRegistroTipos from "../components/tipo/ModalRegistroTipos";
import ModalEdicionTipos from "../components/tipo/ModalEdicionTipos";
import ModalEliminacionTipos from "../components/tipo/ModalEliminacionTipos";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";


const Tipos = () => {
  // Estados para manejo de datos
  const [tipos, setTipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoTipo, setNuevoTipo] = useState({
    nombre: "",
  });
  const [tipoEditado, setTipoEditado] = useState(null);
  const [tipoAEliminar, setTipoAEliminar] = useState(null);
  const [tiposFiltrados, setTiposFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de tipos por página

  // Referencia a la colección de tipos en Firestore
  const tiposCollection = collection(db, "tipos");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [showChatModal, setShowChatModal] = useState(false);

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Función para obtener todos los tipos de Firestore
  const fetchTipos = () => {
    const stopListening = onSnapshot(tiposCollection, (snapshot) => {
      const fetchedTipos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTipos(fetchedTipos);
      setTiposFiltrados(fetchedTipos);
      console.log("Tipos cargados desde Firestore:", fetchedTipos);
      if (isOffline) {
        console.log("Offline: Mostrando datos desde la caché local.");
      }
    }, (error) => {
      console.error("Error al escuchar Tipos:", error);
      if (isOffline) {
        console.log("Offline: Mostrando datos desde la caché local.");
      } else {
        alert("Error al cargar los Tipos: " + error.message);
      }
    });
    return stopListening;
  };

  // Hook useEffect para carga inicial y escucha de datos
  useEffect(() => {
    const cleanupListener = fetchTipos();
    return () => cleanupListener();
  }, []);

  // Función para manejar búsqueda
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filtrados = tipos.filter((tipo) =>
      tipo.nombre.toLowerCase().includes(text)
    );
    setTiposFiltrados(filtrados);
  };

  // Manejador de cambios en inputs del formulario de nuevo tipo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTipo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador de cambios en inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setTipoEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar un nuevo tipo (CREATE)
  const handleAddTipo = async () => {
    // Validar campo requerido
    if (!nuevoTipo.nombre) {
      alert("Por favor, completa el campo nombre antes de guardar.");
      return;
    }

    // Cerrar modal
    setShowModal(false);

    // Crear ID temporal para offline y objeto de tipo
    const tempId = `temp_${Date.now()}`;
    const tipoConId = { ...nuevoTipo, id: tempId };

    try {
      // Actualizar estado local para reflejar el nuevo tipo
      setTipos((prev) => [...prev, tipoConId]);
      setTiposFiltrados((prev) => [...prev, tipoConId]);

      // Limpiar campos del formulario
      setNuevoTipo({ nombre: "" });

      // Intentar guardar en Firestore
      await addDoc(tiposCollection, nuevoTipo);

      // Mensaje según estado de conexión
      if (isOffline) {
        console.log("Tipo agregado localmente (sin conexión).");
      } else {
        console.log("Tipo agregado exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al agregar el tipo:", error);

      // Manejar error según estado de conexión
      if (isOffline) {
        console.log("Offline: tipo almacenado localmente.");
      } else {
        // Revertir cambios locales si falla en la nube
        setTipos((prev) => prev.filter((tipo) => tipo.id !== tempId));
        setTiposFiltrados((prev) => prev.filter((tipo) => tipo.id !== tempId));
        alert("Error al agregar el tipo: " + error.message);
      }
    }
  };

  // Función para actualizar un tipo existente (UPDATE)
  const handleEditTipo = async () => {
    if (!tipoEditado?.nombre) {
      alert("Por favor, completa el campo nombre antes de actualizar.");
      return;
    }

    setShowEditModal(false);

    const tipoRef = doc(db, "tipos", tipoEditado.id);

    try {
      // Intentar actualizar en Firestore
      await updateDoc(tipoRef, {
        nombre: tipoEditado.nombre,
      });

      console.log("Red desconectada:", isOffline);

      if (isOffline) {
        // Actualizar estado local inmediatamente si no hay conexión
        setTipos((prev) =>
          prev.map((tipo) =>
            tipo.id === tipoEditado.id ? { ...tipoEditado } : tipo
          )
        );
        setTiposFiltrados((prev) =>
          prev.map((tipo) =>
            tipo.id === tipoEditado.id ? { ...tipoEditado } : tipo
          )
        );
        console.log("Tipo actualizado localmente (sin conexión).");
      } else {
        // Si hay conexión, confirmar éxito en la nube
        console.log("Tipo actualizado exitosamente en la nube.");
      }
    } catch (error) {
      // Manejar errores inesperados (no relacionados con la red)
      console.error("Error al actualizar el tipo:", error);
      setTipos((prev) =>
        prev.map((tipo) =>
          tipo.id === tipoEditado.id ? { ...tipoEditado } : tipo
        )
      );
      setTiposFiltrados((prev) =>
        prev.map((tipo) =>
          tipo.id === tipoEditado.id ? { ...tipoEditado } : tipo
        )
      );
      alert("Ocurrió un error al actualizar el tipo: " + error.message);
    }
  };

  // Función para eliminar un tipo (DELETE)
  const handleDeleteTipo = async () => {
    if (!tipoAEliminar) return;

    // Cerrar modal
    setShowDeleteModal(false);

    try {
      // Actualizar estado local para reflejar la eliminación
      setTipos((prev) => prev.filter((tipo) => tipo.id !== tipoAEliminar.id));
      setTiposFiltrados((prev) => prev.filter((tipo) => tipo.id !== tipoAEliminar.id));

      // Intentar eliminar en Firestore
      const tipoRef = doc(db, "tipos", tipoAEliminar.id);
      await deleteDoc(tipoRef);

      // Mensaje según estado de conexión
      if (isOffline) {
        console.log("Tipo eliminado localmente (sin conexión).");
      } else {
        console.log("Tipo eliminado exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al eliminar el tipo:", error);

      // Manejar error según estado de conexión
      if (isOffline) {
        console.log("Offline: Eliminación almacenada localmente.");
      } else {
        // Restaurar tipo en estado local si falla en la nube
        setTipos((prev) => [...prev, tipoAEliminar]);
        setTiposFiltrados((prev) => [...prev, tipoAEliminar]);
        alert("Error al eliminar el tipo: " + error.message);
      }
    }
  };

  // Función para abrir el modal de edición con datos prellenados
  const openEditModal = (tipo) => {
    setTipoEditado({ ...tipo });
    setShowEditModal(true);
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (tipo) => {
    setTipoAEliminar(tipo);
    setShowDeleteModal(true);
  };

  // Calcular tipos paginados
  const paginatedTipos = tiposFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Renderizado del componente
  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Tipos</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
            Agregar Tipo
          </Button>
        </Col>
        
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Col>
      </Row>

      <TablaTipos
        tipos={paginatedTipos} // Pasar tipos paginados
        totalItems={tiposFiltrados.length} // Total de tipos filtrados
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />

      <ModalRegistroTipos
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoTipo={nuevoTipo}
        handleInputChange={handleInputChange}
        handleAddTipo={handleAddTipo}
      />
      <ModalEdicionTipos
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        tipoEditado={tipoEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditTipo={handleEditTipo}
      />
      <ModalEliminacionTipos
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteTipo={handleDeleteTipo}
      />
    </Container>
  );
};

export default Tipos;