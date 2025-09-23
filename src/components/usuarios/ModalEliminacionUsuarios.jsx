import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionUsuarios = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteUsuario,
  usuarioAEliminar, // Nueva prop para mostrar el nombre del usuario
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar al usuario{" "}
        {usuarioAEliminar ? `${usuarioAEliminar.nombre} ${usuarioAEliminar.apellido}` : ""}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteUsuario}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionUsuarios;