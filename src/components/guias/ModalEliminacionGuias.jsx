import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionGuia = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteGuia,
  guiaAEliminar,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar la guía{" "}
        {guiaAEliminar ? `con ID ${guiaAEliminar.id}` : "esta guía"}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => {
          if (handleDeleteGuia && guiaAEliminar) {
            handleDeleteGuia(guiaAEliminar.id); // Llama a la función con el ID
          }
          setShowDeleteModal(false);
        }}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionGuia;