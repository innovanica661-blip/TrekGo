import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import TablaAves from "../components/aves/TablaAves";
import ModalRegistroAves from "../components/aves/ModalRegistroAves";
import ModalEdicionAve from "../components/aves/ModalEdicionAves";
import ModalEliminacionAves from "../components/aves/ModalEliminacionAves";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Aves = () => {
  const [aves, setAves] = useState([]);
  const [tipos, setTipos] = useState([]); // Inicializado como arreglo vacío
  const [reservas, setReserva] = useState([]); // Inicializado como arreglo vacío
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaAve, setNuevaAve] = useState({
    nombre_comun: "",
    nombre_cientifico: "",
    descripcion: "",
    tipo: "",
    reserva: "",
    imagen: "",
  });
  const [aveEditado, setAveEditado] = useState(null);
  const [aveAEliminar, setAveAEliminar] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [avesFiltrados, setAvesFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const avesCollection = collection(db, "aves");
  const tiposCollection = collection(db, "tipos");
  const reservasCollection = collection(db, "reservas");

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

  const fetchData = () => {
    const unsubscribeAves = onSnapshot(avesCollection, (snapshot) => {
      const fetchedAves = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAves(fetchedAves);
      setAvesFiltrados(fetchedAves);
    }, (error) => console.error("Error al escuchar aves:", error));

    const unsubscribeTipos = onSnapshot(tiposCollection, (snapshot) => {
      const fetchedTipos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTipos(fetchedTipos); // Asegúrate de que los datos se carguen aquí
    }, (error) => console.error("Error al escuchar tipos:", error));


    const unsubscribeReserva = onSnapshot(reservasCollection, (snapshot) => {
      const fetchedReserva = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReserva(fetchedReserva); // Asegúrate de que los datos se carguen aquí
    }, (error) => console.error("Error al escuchar reserva:", error));

    return () => {
      unsubscribeAves();
      unsubscribeTipos();
      unsubscribeReserva();
    };
  };

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaAve((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setAveEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevaAve((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAveEditado((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddAve = async () => {
    if (!nuevaAve.nombre_comun || !nuevaAve.nombre_cientifico || !nuevaAve.descripcion || !nuevaAve.tipo || !nuevaAve.reserva || !nuevaAve.imagen) {
      alert("Por favor, completa todos los campos, incluyendo la imagen.");
      return;
    }

    setShowModal(false);
    const tempId = `temp_${Date.now()}`;
    const aveConId = { ...nuevaAve, id: tempId };

    try {
      setAves((prev) => [...prev, aveConId]);
      setAvesFiltrados((prev) => [...prev, aveConId]);
      await addDoc(avesCollection, {
        nombre_comun: nuevaAve.nombre_comun,
        nombre_cientifico: nuevaAve.nombre_cientifico,
        descripcion: nuevaAve.descripcion,
        tipo: nuevaAve.tipo,
        reserva: nuevaAve.reserva,
        imagen: nuevaAve.imagen,
      });
      setNuevaAve({ nombre_comun: "", nombre_cientifico: "", descripcion: "", tipo: "", reserva: "", imagen: "" });
    } catch (error) {
      console.error("Error al agregar el ave:", error);
      setAves((prev) => prev.filter((ave) => ave.id !== tempId));
      setAvesFiltrados((prev) => prev.filter((ave) => ave.id !== tempId));
      alert("Error al agregar el ave: " + error.message);
    }
  };

  const handleEditAve = async () => {
    if (!aveEditado.nombre_comun || !aveEditado.nombre_cientifico || !aveEditado.descripcion || !aveEditado.tipo || !aveEditado.reserva || !aveEditado.imagen) {
      alert("Por favor, completa todos los campos, incluyendo la imagen.");
      return;
    }

    setShowEditModal(false);
    const aveRef = doc(db, "aves", aveEditado.id);

    try {
      setAves((prev) => prev.map((ave) => (ave.id === aveEditado.id ? { ...aveEditado } : ave)));
      setAvesFiltrados((prev) => prev.map((ave) => (ave.id === aveEditado.id ? { ...aveEditado } : ave)));
      await updateDoc(aveRef, {
        nombre_comun: aveEditado.nombre_comun,
        nombre_cientifico: aveEditado.nombre_cientifico,
        descripcion: aveEditado.descripcion,
        tipo: aveEditado.tipo,
        reserva: aveEditado.reserva,
        imagen: aveEditado.imagen,
      });
    } catch (error) {
      console.error("Error al actualizar el ave:", error);
      setAves((prev) => prev.map((ave) => (ave.id === aveEditado.id ? { ...ave } : ave)));
      setAvesFiltrados((prev) => prev.map((ave) => (ave.id === aveEditado.id ? { ...ave } : ave)));
      alert("Error al actualizar el ave: " + error.message);
    }
  };

  const handleDeleteAve = async () => {
    if (!aveAEliminar) return;

    setShowDeleteModal(false);

    try {
      setAves((prev) => prev.filter((ave) => ave.id !== aveAEliminar.id));
      setAvesFiltrados((prev) => prev.filter((ave) => ave.id !== aveAEliminar.id));
      const aveRef = doc(db, "aves", aveAEliminar.id);
      await deleteDoc(aveRef);
    } catch (error) {
      console.error("Error al eliminar el ave:", error);
      setAves((prev) => [...prev, aveAEliminar]);
      setAvesFiltrados((prev) => [...prev, aveAEliminar]);
      alert("Error al eliminar el ave: " + error.message);
    }
  };

  const openEditModal = (ave) => {
    setAveEditado({ ...ave });
    setShowEditModal(true);
  };

  const openDeleteModal = (ave) => {
    setAveAEliminar(ave);
    setShowDeleteModal(true);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = aves.filter((ave) =>
      ave.nombre_comun.toLowerCase().includes(text)
    );
    setAvesFiltrados(filtrados);
  };

  const paginatedAves = avesFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = (ave) => {
    const rowData = `Nombre Común: ${ave.nombre_comun}\nNombre Científico: ${ave.nombre_cientifico}\nDescripción: ${ave.descripcion}\nTipo: ${ave.tipo}`;
    navigator.clipboard.writeText(rowData).then(() => console.log("Datos copiados")).catch((err) => console.error(err));
  };

  const generarPDFAves = () => {
    const doc = new jsPDF();
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de Aves", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });
    const columnas = ["#", "Nombre Común", "Nombre Científico", "Descripción", "Tipo", "Reserva"];
    const filas = avesFiltrados.map((ave, index) => [index + 1, ave.nombre_comun, ave.nombre_cientifico, ave.descripcion, ave.tipo, ave.reserva]);
    autoTable(doc, { head: [columnas], body: filas, startY: 40 });
    doc.save("aves.pdf");
  };

  const exportarExcelAves = () => {
    const datos = avesFiltrados.map((ave, index) => ({
      "#": index + 1,
      Nombre_Comun: ave.nombre_comun,
      Nombre_Cientifico: ave.nombre_cientifico,
      Descripcion: ave.descripcion,
      Tipo: ave.tipo,
      Reserva: ave.reserva,
    }));
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Aves");
    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "aves.xlsx");
  };

  const generarPDFDetalleAves = (ave) => {
    const pdf = new jsPDF();
    pdf.setFillColor(28, 41, 51);
    pdf.rect(0, 0, 220, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text(ave.nombre_comun, pdf.internal.pageSize.getWidth() / 2, 18, { align: "center" });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text(`Nombre Científico: ${ave.nombre_cientifico}`, 105, 40, { align: "center" });
    pdf.text(`Descripción: ${ave.descripcion}`, 105, 50, { align: "center" });
    pdf.text(`Tipo: ${ave.tipo}`, 105, 60, { align: "center" });
    pdf.text(`Reserva: ${ave.reserva}`, 105, 60, { align: "center" });
    pdf.save(`${ave.nombre_comun}.pdf`);
  };

  return (
    <Container className="mt-5">
      <h4>Gestión de Aves</h4>
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button className="mb-3" onClick={() => setShowModal(true)} style={{ width: "100%" }}>
            Agregar Aves
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button className="mb-3" onClick={generarPDFAves} variant="secondary" style={{ width: "100%" }}>
            Generar reporte PDF
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button className="mb-3" onClick={exportarExcelAves} variant="secondary" style={{ width: "100%" }}>
            Generar Excel
          </Button>
        </Col>
        <Col lg={3} md={8} sm={8} xs={7}>
          <CuadroBusquedas searchText={searchText} handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <TablaAves
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        aves={paginatedAves}
        totalItems={avesFiltrados.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleCopy={handleCopy}
        generarPDFDetalleAve={generarPDFDetalleAves}
      />
      <ModalRegistroAves
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaAve={nuevaAve}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddAve={handleAddAve}
        tipos={tipos} // Prop correcta
        reservas={reservas} // Prop correcta
      />
      <ModalEdicionAve
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        aveEditado={aveEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditAve={handleEditAve}
        tipos={tipos}
        reservas={reservas}
      />
      <ModalEliminacionAves
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteAve={handleDeleteAve}
      />
    </Container>
  );
};

export default Aves;