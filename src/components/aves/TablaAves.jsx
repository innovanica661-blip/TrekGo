import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Paginacion from "../ordenamiento/Paginacion";

const TablaAves = ({
  aves,
  openEditModal,
  openDeleteModal,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  handleCopy,
  generarPDFDetalleAve
}) => {

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre Común</th>
            <th>Nombre Científico</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aves.map((ave) => (
            <tr key={ave.id}>
              <td>
                {ave.imagen && (
                  <Image src={ave.imagen} width="50" height="50" />
                )}
              </td>
              <td>{ave.nombre_comun}</td>
              <td>{ave.nombre_cientifico}</td>
              <td>{ave.descripcion}</td>
              <td>{ave.tipo}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => generarPDFDetalleAve(ave)}
                >
                  <i className="bi bi-filetype-pdf"></i>
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openEditModal(ave)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => openDeleteModal(ave)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => handleCopy(ave)}
                >
                  <i className="bi bi-clipboard"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TablaAves;