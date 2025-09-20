import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionTipos = ({
  showEditModal,
  setShowEditModal,
  TipoEditada,
  handleEditInputChange,
  handleEditTipo,
}) => {
  if (!TipoEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tipo Ave</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={TipoEditada.nombre}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nombre"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditTipo}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionTipos;