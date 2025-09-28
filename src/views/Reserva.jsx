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
    descripcion: "",
    ubicacion: "",
    actividad: "",
    fecha: "",
    precioCosto: "",
    guia: "",
    distancia: "",
    dificultad: "",
    cupo: "",
    imagen: "",
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

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
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
      setReservas(fetchedReservas);
      setReservasFiltradas(fetchedReservas);
    }, (error) => console.error("Error al escuchar reservas:", error));

    const unsubscribeGuias = onSnapshot(guiasCollection, (snapshot) => {
      const fetchedGuias = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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
        reserva.descripcion.toLowerCase().includes(text) ||
        reserva.ubicacion.toLowerCase().includes(text) ||
        reserva.actividad.toLowerCase().includes(text) ||
        reserva.fecha.toLowerCase().includes(text) ||
        reserva.precioCosto.toString().toLowerCase().includes(text) ||
        reserva.distancia.toLowerCase().includes(text) ||
        reserva.dificultad.toLowerCase().includes(text) ||
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevaReserva((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReservaEditada((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // Función para agregar una nueva reserva (CREATE)
  const handleAddReserva = async () => {
    if (
      !nuevaReserva.nombreReserva ||
      !nuevaReserva.descripcion ||
      !nuevaReserva.ubicacion ||
      !nuevaReserva.actividad ||
      !nuevaReserva.fecha ||
      !nuevaReserva.precioCosto ||
      !nuevaReserva.guia ||
      !nuevaReserva.distancia ||
      !nuevaReserva.dificultad ||
      !nuevaReserva.cupo ||
      !nuevaReserva.imagen
    ) {
      alert("Por favor, completa todos los campos, incluyendo la descripción y la imagen.");
      return;
    }

    setShowModal(false);

    const tempId = `temp_${Date.now()}`;
    const reservaConId = { ...nuevaReserva, id: tempId };

    try {
      setReservas((prev) => [...prev, reservaConId]);
      setReservasFiltradas((prev) => [...prev, reservaConId]);

      await addDoc(reservasCollection, {
        nombreReserva: nuevaReserva.nombreReserva,
        descripcion: nuevaReserva.descripcion,
        ubicacion: nuevaReserva.ubicacion,
        actividad: nuevaReserva.actividad,
        fecha: nuevaReserva.fecha,
        precioCosto: nuevaReserva.precioCosto,
        guia: nuevaReserva.guia,
        distancia: nuevaReserva.distancia,
        dificultad: nuevaReserva.dificultad,
        cupo: nuevaReserva.cupo,
        imagen: nuevaReserva.imagen,
      });

      setNuevaReserva({
        nombreReserva: "",
        descripcion: "",
        ubicacion: "",
        actividad: "",
        fecha: "",
        precioCosto: "",
        guia: "",
        distancia: "",
        dificultad: "",
        cupo: "",
        imagen: "",
      });
    } catch (error) {
      console.error("Error al agregar la reserva:", error);
      setReservas((prev) => prev.filter((reserva) => reserva.id !== tempId));
      setReservasFiltradas((prev) => prev.filter((reserva) => reserva.id !== tempId));
      alert("Error al agregar la reserva: " + error.message);
    }
  };

  // Función para actualizar una reserva existente (UPDATE)
  const handleEditReserva = async () => {
    if (
      !reservaEditada.nombreReserva ||
      !reservaEditada.descripcion ||
      !reservaEditada.ubicacion ||
      !reservaEditada.actividad ||
      !reservaEditada.fecha ||
      !reservaEditada.precioCosto ||
      !reservaEditada.guia ||
      !reservaEditada.distancia ||
      !reservaEditada.dificultad ||
      !reservaEditada.cupo ||
      !reservaEditada.imagen
    ) {
      alert("Por favor, completa todos los campos, incluyendo la descripción y la imagen.");
      return;
    }

    setShowEditModal(false);

    const reservaRef = doc(db, "reservas", reservaEditada.id);

    try {
      setReservas((prev) => prev.map((reserva) => (reserva.id === reservaEditada.id ? { ...reservaEditada } : reserva)));
      setReservasFiltradas((prev) => prev.map((reserva) => (reserva.id === reservaEditada.id ? { ...reservaEditada } : reserva)));
      await updateDoc(reservaRef, {
        nombreReserva: reservaEditada.nombreReserva,
        descripcion: reservaEditada.descripcion,
        ubicacion: reservaEditada.ubicacion,
        actividad: reservaEditada.actividad,
        fecha: reservaEditada.fecha,
        precioCosto: reservaEditada.precioCosto,
        guia: reservaEditada.guia,
        distancia: reservaEditada.distancia,
        dificultad: reservaEditada.dificultad,
        cupo: reservaEditada.cupo,
        imagen: reservaEditada.imagen,
      });
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      setReservas((prev) => prev.map((reserva) => (reserva.id === reservaEditada.id ? { ...reserva } : reserva)));
      setReservasFiltradas((prev) => prev.map((reserva) => (reserva.id === reservaEditada.id ? { ...reserva } : reserva)));
      alert("Error al actualizar la reserva: " + error.message);
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
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      setReservas((prev) => [...prev, reservaAEliminar]);
      setReservasFiltradas((prev) => [...prev, reservaAEliminar]);
      alert("Error al eliminar la reserva: " + error.message);
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

  const handleCopy = (reserva) => {
    const rowData = `Nombre Reserva: ${reserva.nombreReserva}\nDescripción: ${reserva.descripcion}\nUbicación: ${reserva.ubicacion}\nActividad: ${reserva.actividad}\nFecha: ${reserva.fecha}\nPrecio Costo: ${reserva.precioCosto}\nGuía: ${reserva.guia}\nDistancia: ${reserva.distancia}\nDificultad: ${reserva.dificultad}\nCupo: ${reserva.cupo}`;
    navigator.clipboard.writeText(rowData).then(() => console.log("Datos copiados")).catch((err) => console.error(err));
  };

  // Funciones para generar reportes
  const generarPDFReservas = () => {
    const doc = new jsPDF();
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de Reservas", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });
    const columnas = ["#", "Nombre Reserva", "Descripción", "Ubicación", "Actividad", "Fecha", "Precio Costo", "Guía", "Distancia", "Dificultad", "Cupo"];
    const filas = reservasFiltradas.map((reserva, index) => [
      index + 1,
      reserva.nombreReserva,
      reserva.descripcion,
      reserva.ubicacion,
      reserva.actividad,
      reserva.fecha,
      reserva.precioCosto,
      reserva.guia || "Sin guía",
      reserva.distancia,
      reserva.dificultad,
      reserva.cupo,
    ]);
    autoTable(doc, { head: [columnas], body: filas, startY: 40 });
    doc.save("reservas.pdf");
  };

  const exportarExcelReservas = () => {
    const datos = reservasFiltradas.map((reserva, index) => ({
      "#": index + 1,
      Nombre_Reserva: reserva.nombreReserva,
      Descripcion: reserva.descripcion,
      Ubicacion: reserva.ubicacion,
      Actividad: reserva.actividad,
      Fecha: reserva.fecha,
      Precio_Costo: reserva.precioCosto,
      Guia: reserva.guia || "Sin guía",
      Distancia: reserva.distancia,
      Dificultad: reserva.dificultad,
      Cupo: reserva.cupo,
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reservas");
    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "reservas.xlsx");
  };

  const generarPDFDetalleReservas = (reserva) => {
    const pdf = new jsPDF();
    pdf.setFillColor(28, 41, 51);
    pdf.rect(0, 0, 220, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text(reserva.nombreReserva, pdf.internal.pageSize.getWidth() / 2, 18, { align: "center" });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text(`Descripción: ${reserva.descripcion}`, 105, 40, { align: "center" });
    pdf.text(`Ubicación: ${reserva.ubicacion}`, 105, 50, { align: "center" });
    pdf.text(`Actividad: ${reserva.actividad}`, 105, 60, { align: "center" });
    pdf.text(`Fecha: ${reserva.fecha}`, 105, 70, { align: "center" });
    pdf.text(`Precio Costo: ${reserva.precioCosto}`, 105, 80, { align: "center" });
    pdf.text(`Guía: ${reserva.guia}`, 105, 90, { align: "center" });
    pdf.text(`Distancia: ${reserva.distancia}`, 105, 100, { align: "center" });
    pdf.text(`Dificultad: ${reserva.dificultad}`, 105, 110, { align: "center" });
    pdf.text(`Cupo: ${reserva.cupo}`, 105, 120, { align: "center" });
    pdf.save(`${reserva.nombreReserva}.pdf`);
  };

  return (
    <Container className="mt-5">
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

      <TablaReservas
        reservas={paginatedReservas}
        totalItems={reservasFiltradas.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        handleCopy={handleCopy}
        generarPDFDetalleReserva={generarPDFDetalleReservas}
      />

      <ModalRegistroReserva
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaReserva={nuevaReserva}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddReserva={handleAddReserva}
        guias={guias}
      />
      <ModalEdicionReserva
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        reservaEditada={reservaEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditReserva={handleEditReserva}
        guias={guias}
      />
      <ModalEliminacionReserva
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteReserva={handleDeleteReserva}
      />
    </Container>
  );
};

export default Reservas;