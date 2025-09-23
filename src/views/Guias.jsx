import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import TablaGuias from "../components/guias/TablaGuias";
import ModalRegistroGuia from "../components/guias/ModalRegistroGuias";
import ModalEdicionGuia from "../components/guias/ModalEdicionGuias";
import ModalEliminacionGuia from "../components/guias/ModalEliminacionGuias";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroReserva from "../components/reservas/ModalRegistroReserva";

const Guias = () => {
  const [guias, setGuias] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaGuia, setNuevaGuia] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    certificacion: "",
    telefono: "",
  });
  const [guiaEditada, setGuiaEditada] = useState(null);
  const [guiaAEliminar, setGuiaAEliminar] = useState(null);
  const [guiasFiltradas, setGuiasFiltradas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const guiasCollection = collection(db, "guias");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [showChatModal, setShowChatModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({
    nombreReserva: "",
    ubicacion: "",
    actividad: "",
    fecha: "",
    precioCosto: "",
    cupo: "",
    guia: "",
    distancia: "",
    dificultad: "",
  });

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

  const fetchGuias = () => {
    const stopListening = onSnapshot(guiasCollection, (snapshot) => {
      const fetchedGuias = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Datos cargados de Firestore:", fetchedGuias);
      if (fetchedGuias.length > 0) {
        console.log("Primer registro:", fetchedGuias[0]);
      } else {
        console.log("No se encontraron registros en Firestore.");
      }
      setGuias(fetchedGuias);
      setGuiasFiltradas(fetchedGuias);
      setIsLoading(false); // Datos cargados, termina la carga
    }, (error) => {
      console.error("Error al escuchar guías:", error);
      setIsLoading(false); // Manejo de error, termina la carga
    });
    return stopListening;
  };

  useEffect(() => {
    const cleanupListener = fetchGuias();
    return () => cleanupListener();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filtradas = guias.filter(
      (guia) =>
        guia.nombre.toLowerCase().includes(text) ||
        guia.apellido.toLowerCase().includes(text) ||
        guia.cedula.toLowerCase().includes(text) ||
        guia.certificacion.toLowerCase().includes(text) ||
        guia.telefono.toLowerCase().includes(text)
    );
    setGuiasFiltradas(filtradas);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaGuia((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setGuiaEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReservaInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaReserva((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGuia = async () => {
    if (
      !nuevaGuia.nombre ||
      !nuevaGuia.apellido ||
      !nuevaGuia.cedula ||
      !nuevaGuia.certificacion ||
      !nuevaGuia.telefono
    ) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    setShowModal(false);

    const tempId = `temp_${Date.now()}`;
    const guiaConId = { ...nuevaGuia, id: tempId };

    try {
      setGuias((prev) => [...prev, guiaConId]);
      setGuiasFiltradas((prev) => [...prev, guiaConId]);

      setNuevaGuia({
        nombre: "",
        apellido: "",
        cedula: "",
        certificacion: "",
        telefono: "",
      });

      await addDoc(guiasCollection, nuevaGuia);

      if (isOffline) {
        console.log("Guía agregada localmente (sin conexión).");
      } else {
        console.log("Guía agregada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al agregar la guía:", error);

      if (isOffline) {
        console.log("Offline: Guía almacenada localmente.");
      } else {
        setGuias((prev) => prev.filter((guia) => guia.id !== tempId));
        setGuiasFiltradas((prev) => prev.filter((guia) => guia.id !== tempId));
        alert("Error al agregar la guía: " + error.message);
      }
    }
  };

  const handleEditGuia = async () => {
    if (
      !guiaEditada?.nombre ||
      !guiaEditada?.apellido ||
      !guiaEditada?.cedula ||
      !guiaEditada?.certificacion ||
      !guiaEditada?.telefono
    ) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }

    setShowEditModal(false);

    const guiaRef = doc(db, "guias", guiaEditada.id);

    try {
      await updateDoc(guiaRef, {
        nombre: guiaEditada.nombre,
        apellido: guiaEditada.apellido,
        cedula: guiaEditada.cedula,
        certificacion: guiaEditada.certificacion,
        telefono: guiaEditada.telefono,
      });

      if (isOffline) {
        setGuias((prev) =>
          prev.map((guia) =>
            guia.id === guiaEditada.id ? { ...guiaEditada } : guia
          )
        );
        setGuiasFiltradas((prev) =>
          prev.map((guia) =>
            guia.id === guiaEditada.id ? { ...guiaEditada } : guia
          )
        );
        console.log("Guía actualizada localmente (sin conexión).");
      } else {
        console.log("Guía actualizada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al actualizar la guía:", error);
      setGuias((prev) =>
        prev.map((guia) =>
          guia.id === guiaEditada.id ? { ...guiaEditada } : guia
        )
      );
      setGuiasFiltradas((prev) =>
        prev.map((guia) =>
          guia.id === guiaEditada.id ? { ...guiaEditada } : guia
        )
      );
      alert("Ocurrió un error al actualizar la guía: " + error.message);
    }
  };

  const handleDeleteGuia = async () => {
    if (!guiaAEliminar) return;

    setShowDeleteModal(false);

    try {
      setGuias((prev) => prev.filter((guia) => guia.id !== guiaAEliminar.id));
      setGuiasFiltradas((prev) =>
        prev.filter((guia) => guia.id !== guiaAEliminar.id)
      );

      const guiaRef = doc(db, "guias", guiaAEliminar.id);
      await deleteDoc(guiaRef);

      if (isOffline) {
        console.log("Guía eliminada localmente (sin conexión).");
      } else {
        console.log("Guía eliminada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al eliminar la guía:", error);

      if (isOffline) {
        console.log("Offline: Eliminación almacenada localmente.");
      } else {
        setGuias((prev) => [...prev, guiaAEliminar]);
        setGuiasFiltradas((prev) => [...prev, guiaAEliminar]);
        alert("Error al eliminar la guía: " + error.message);
      }
    }
  };

  const openEditModal = (guia) => {
    setGuiaEditada({ ...guia });
    setShowEditModal(true);
  };

  const openDeleteModal = (guia) => {
    setGuiaAEliminar(guia);
    setShowDeleteModal(true);
  };

  const openReservaModal = () => {
    setShowReservaModal(true);
  };

  const handleAddReserva = () => {
    console.log("Nueva reserva:", nuevaReserva);
    setShowReservaModal(false);
    setNuevaReserva({
      nombreReserva: "",
      ubicacion: "",
      actividad: "",
      fecha: "",
      precioCosto: "",
      cupo: "",
      guia: "",
      distancia: "",
      dificultad: "",
    });
  };

  const paginatedGuias = guiasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("Guias:", guias);

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Guías</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={() => setShowModal(true)}
            style={{ width: "100%" }}
          >
            Agregar guía
          </Button>
        </Col>
      
      
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Col>
      </Row>

      {guiasFiltradas.length === 0 ? (
        <p>No hay guías disponibles. Agrega una nueva guía para comenzar.</p>
      ) : (
        <>
          <p>Depuración: Renderizando {guiasFiltradas.length} guías.</p>
          <TablaGuias
            guias={paginatedGuias}
            totalItems={guiasFiltradas.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
          />
        </>
      )}

      <ModalRegistroGuia
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaGuia={nuevaGuia}
        handleInputChange={handleInputChange}
        handleAddGuia={handleAddGuia}
        guias={guias}
      />
      <ModalEdicionGuia
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        guiaEditada={guiaEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditGuia={handleEditGuia}
        guias={guias}
      />
      <ModalEliminacionGuia
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteGuia={handleDeleteGuia}
        guiaAEliminar={guiaAEliminar}
      />
      <ModalRegistroReserva
        showModal={showReservaModal}
        setShowModal={setShowReservaModal}
        nuevaReserva={nuevaReserva}
        handleInputChange={handleReservaInputChange}
        handleAddReserva={handleAddReserva}
        guias={guias}
      />
    </Container>
  );
};

export default Guias;