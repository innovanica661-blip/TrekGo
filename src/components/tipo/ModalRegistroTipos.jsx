import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroTipos = ({
  showModal,
  setShowModal,
  nuevoTipo,
  handleInputChange,
  handleAddTipo,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Tipo de Ave</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevoTipo.nombre}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddTipo}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroTipos;