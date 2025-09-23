import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroAves = ({
  showModal,
  setShowModal,
  nuevaAve,
  handleInputChange,
  handleImageChange,
  handleAddAve,
  tipos, // Cambia "tipo" a "tipos" para que coincida con la prop pasada
  reservas
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Ave</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Común</Form.Label>
            <Form.Control
              type="text"
              name="nombre_comun"
              value={nuevaAve.nombre_comun}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Científico</Form.Label>
            <Form.Control
              type="text"
              name="nombre_cientifico"
              value={nuevaAve.nombre_cientifico}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={nuevaAve.descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={nuevaAve.tipo}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un Tipo</option>
              {tipos && tipos.map((tip) => ( // Verificación condicional
                <option key={tip.id} value={tip.nombre}>
                  {tip.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reserva Natural</Form.Label>
            <Form.Select
              name="reserva"
              value={nuevaAve.reserva}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una Reserva</option>
              {reservas && reservas.map((res) => ( // Verificación condicional
                <option key={res.id} value={res.nombreReserva}>
                  {res.nombreReserva}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddAve}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroAves;