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

import TablaReservas from "../components/reservas/TablaReserva";
import ModalRegistroReserva from "../components/reservas/ModalRegistroReserva";
import ModalEliminacionReserva from "../components/reservas/ModalEliminacionReserva";
import ModalEdicionReserva from "../components/reservas/ModalEdicionReserva";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Reservas = () => {
  // Estados para manejo de datos
  const [reservas, setReservas] = useState([]);
  const [guias, setGuias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({
    nombreReserva: "",
    ubicacion: "",
    actividad: "",
    fecha: "",
    precioCosto: "",
    guia: "",
    distancia: "",
    dificultad: "", // Corrección de typo: 'dificultad' en lugar de 'dificulta'
    cupo: "",
  });
  const [reservaEditada, setReservaEditada] = useState(null);
  const [reservaAEliminar, setReservaAEliminar] = useState(null);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de reservas por página

  // Referencias a las colecciones en Firestore
  const reservasCollection = collection(db, "reservas");
  const guiasCollection = collection(db, "guias");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const [showChatModal, setShowChatModal] = useState(false);

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

  // Función para obtener todas las reservas y guías de Firestore
  const fetchData = () => {
    const unsubscribeReservas = onSnapshot(reservasCollection, (snapshot) => {
      const fetchedReservas = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Datos cargados de Firestore (reservas):", fetchedReservas);
      if (fetchedReservas.length > 0) {
        console.log("Primer registro:", fetchedReservas[0]);
      } else {
        console.log("No se encontraron registros en Firestore.");
      }
      setReservas(fetchedReservas);
      setReservasFiltradas(fetchedReservas);
    }, (error) => console.error("Error al escuchar reservas:", error));

    const unsubscribeGuias = onSnapshot(guiasCollection, (snapshot) => {
      const fetchedGuias = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Datos cargados de Firestore (guías):", fetchedGuias);
      setGuias(fetchedGuias);
    }, (error) => console.error("Error al escuchar guías:", error));

    return () => {
      unsubscribeReservas();
      unsubscribeGuias();
    };
  };

  // Hook useEffect para carga inicial y escucha de datos
  useEffect(() => {
    const cleanup = fetchData();
    return () => cleanup();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filtradas = reservas.filter(
      (reserva) =>
        reserva.nombreReserva.toLowerCase().includes(text) ||
        reserva.ubicacion.toLowerCase().includes(text) ||
        reserva.actividad.toLowerCase().includes(text) ||
        reserva.fecha.toLowerCase().includes(text) ||
        reserva.precioCosto.toString().toLowerCase().includes(text) ||
        reserva.distancia.toLowerCase().includes(text) ||
        reserva.dificultad.toLowerCase().includes(text) || // Corrección de typo
        reserva.cupo.toString().toLowerCase().includes(text) ||
        (reserva.guia && reserva.guia.toLowerCase().includes(text))
    );
    setReservasFiltradas(filtradas);
  };

  // Manejador de cambios en inputs del formulario de nueva reserva
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaReserva((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador de cambios en inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setReservaEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar una nueva reserva (CREATE)
  const handleAddReserva = async () => {
    if (
      !nuevaReserva.nombreReserva ||
      !nuevaReserva.ubicacion ||
      !nuevaReserva.actividad ||
      !nuevaReserva.fecha ||
      !nuevaReserva.precioCosto ||
      !nuevaReserva.guia ||
      !nuevaReserva.distancia ||
      !nuevaReserva.dificultad ||
      !nuevaReserva.cupo
    ) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    setShowModal(false);

    const tempId = `temp_${Date.now()}`;
    const reservaConId = { ...nuevaReserva, id: tempId };

    try {
      setReservas((prev) => [...prev, reservaConId]);
      setReservasFiltradas((prev) => [...prev, reservaConId]);

      setNuevaReserva({
        nombreReserva: "",
        ubicacion: "",
        actividad: "",
        fecha: "",
        precioCosto: "",
        guia: "",
        distancia: "",
        dificultad: "",
        cupo: "",
      });

      await addDoc(reservasCollection, nuevaReserva);

      if (isOffline) {
        console.log("Reserva agregada localmente (sin conexión).");
      } else {
        console.log("Reserva agregada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al agregar la reserva:", error);

      if (isOffline) {
        console.log("Offline: Reserva almacenada localmente.");
      } else {
        setReservas((prev) => prev.filter((reserva) => reserva.id !== tempId));
        setReservasFiltradas((prev) => prev.filter((reserva) => reserva.id !== tempId));
        alert("Error al agregar la reserva: " + error.message);
      }
    }
  };

  // Función para actualizar una reserva existente (UPDATE)
  const handleEditReserva = async () => {
    console.log("Estado de reservaEditada antes de validación:", reservaEditada); // Depuración

    // Verificar si todos los campos están presentes y no son vacíos
    const requiredFields = {
      nombreReserva: reservaEditada?.nombreReserva,
      ubicacion: reservaEditada?.ubicacion,
      actividad: reservaEditada?.actividad,
      fecha: reservaEditada?.fecha,
      precioCosto: reservaEditada?.precioCosto,
      guia: reservaEditada?.guia,
      distancia: reservaEditada?.distancia,
      dificultad: reservaEditada?.dificultad,
      cupo: reservaEditada?.cupo,
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert(`Por favor, completa los siguientes campos: ${emptyFields.join(", ")}`);
      return;
    }

    setShowEditModal(false);

    const reservaRef = doc(db, "reservas", reservaEditada.id);
    console.log("Referencia a documento:", reservaRef.path); // Depuración

    try {
      console.log("Actualizando reserva con ID:", reservaEditada.id);
      console.log("Datos a actualizar:", reservaEditada);

      // Convertir precioCosto y cupo a números si son cadenas
      const updatedData = {
        nombreReserva: reservaEditada.nombreReserva,
        ubicacion: reservaEditada.ubicacion,
        actividad: reservaEditada.actividad,
        fecha: reservaEditada.fecha,
        precioCosto: Number(reservaEditada.precioCosto), // Forzar a número
        guia: reservaEditada.guia,
        distancia: reservaEditada.distancia,
        dificultad: reservaEditada.dificultad,
        cupo: Number(reservaEditada.cupo), // Forzar a número
      };

      await updateDoc(reservaRef, updatedData);

      if (isOffline) {
        setReservas((prev) =>
          prev.map((reserva) =>
            reserva.id === reservaEditada.id ? { ...reservaEditada, ...updatedData } : reserva
          )
        );
        setReservasFiltradas((prev) =>
          prev.map((reserva) =>
            reserva.id === reservaEditada.id ? { ...reservaEditada, ...updatedData } : reserva
          )
        );
        console.log("Reserva actualizada localmente (sin conexión).");
      } else {
        console.log("Reserva actualizada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      setReservas((prev) =>
        prev.map((reserva) =>
          reserva.id === reservaEditada.id ? { ...reservaEditada } : reserva
        )
      );
      setReservasFiltradas((prev) =>
        prev.map((reserva) =>
          reserva.id === reservaEditada.id ? { ...reservaEditada } : reserva
        )
      );
      alert("Ocurrió un error al actualizar la reserva: " + error.message);
    }
  };

  const handleDeleteReserva = async () => {
    if (!reservaAEliminar) return;

    setShowDeleteModal(false);

    try {
      setReservas((prev) => prev.filter((reserva) => reserva.id !== reservaAEliminar.id));
      setReservasFiltradas((prev) =>
        prev.filter((reserva) => reserva.id !== reservaAEliminar.id)
      );

      const reservaRef = doc(db, "reservas", reservaAEliminar.id);
      await deleteDoc(reservaRef);

      if (isOffline) {
        console.log("Reserva eliminada localmente (sin conexión).");
      } else {
        console.log("Reserva eliminada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);

      if (isOffline) {
        console.log("Offline: Eliminación almacenada localmente.");
      } else {
        setReservas((prev) => [...prev, reservaAEliminar]);
        setReservasFiltradas((prev) => [...prev, reservaAEliminar]);
        alert("Error al eliminar la reserva: " + error.message);
      }
    }
  };

  const openEditModal = (reserva) => {
    setReservaEditada({ ...reserva });
    setShowEditModal(true);
  };

  const openDeleteModal = (reserva) => {
    setReservaAEliminar(reserva);
    setShowDeleteModal(true);
  };

  const paginatedReservas = reservasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("PaginatedReservas:", paginatedReservas); // Depuración

  // Funciones para generar reportes
  const generarPDFReservas = () => {
    const doc = new jsPDF();
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de Reservas", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });
    const columnas = ["#", "Nombre Reserva", "Ubicación", "Actividad", "Fecha", "Precio Costo", "Guía"];
    const filas = reservasFiltradas.map((reserva, index) => [
      index + 1,
      reserva.nombreReserva,
      reserva.ubicacion,
      reserva.actividad,
      reserva.fecha,
      reserva.precioCosto,
      reserva.guia || "Sin guía",
    ]);
    autoTable(doc, { head: [columnas], body: filas, startY: 40 });
    doc.save("reservas.pdf");
  };

  const exportarExcelReservas = () => {
    const datos = reservasFiltradas.map((reserva, index) => ({
      "#": index + 1,
      Nombre_Reserva: reserva.nombreReserva,
      Ubicacion: reserva.ubicacion,
      Actividad: reserva.actividad,
      Fecha: reserva.fecha,
      Precio_Costo: reserva.precioCosto,
      Guia: reserva.guia || "Sin guía",
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reservas");
    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "reservas.xlsx");
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Reservas</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={() => setShowModal(true)}
            style={{ width: "100%" }}
          >
            Agregar reserva
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={generarPDFReservas}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar reporte PDF
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={exportarExcelReservas}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar Excel
          </Button>
        </Col>
        <Col lg={3} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Col>
      </Row>

      {reservasFiltradas.length === 0 ? (
        <p>No hay reservas disponibles. Agrega una nueva reserva para comenzar.</p>
      ) : (
        <>
          <p>Depuración: Renderizando {reservasFiltradas.length} reservas.</p>
          <TablaReservas
            reservas={paginatedReservas}
            totalItems={reservasFiltradas.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
          />
        </>
      )}

      <ModalRegistroReserva
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaReserva={nuevaReserva}
        handleInputChange={handleInputChange}
        handleAddReserva={handleAddReserva}
        guias={guias}
      />
      <ModalEdicionReserva
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        reservaEditada={reservaEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditReserva={handleEditReserva}
        guias={guias}
      />
      <ModalEliminacionReserva
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteReserva={handleDeleteReserva}
        reservaAEliminar={reservaAEliminar}
      />
    </Container>
  );
};

export default Reservas;