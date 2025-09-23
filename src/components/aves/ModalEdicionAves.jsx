import React from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";

const ModalEdicionAve = ({
  showEditModal,
  setShowEditModal,
  aveEditado,
  handleEditInputChange,
  handleEditImageChange,
  handleEditAve,
  tipos,
  reservas
}) => {
  if (!aveEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Ave</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Común</Form.Label>
            <Form.Control
              type="text"
              name="nombre_comun"
              value={aveEditado.nombre_comun}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre Científico</Form.Label>
            <Form.Control
              type="text"
              name="nombre_cientifico"
              value={aveEditado.nombre_cientifico}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={aveEditado.descripcion}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={aveEditado.tipo}
              onChange={handleEditInputChange}
            >
              <option value="">Seleccione un Tipo</option>
              {tipos.map((tip) => (
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
              value={aveEditado.reserva}
              onChange={handleEditInputChange}
            >
              <option value="">Seleccione una Reserva</option>
              {reservas.map((res) => (
                <option key={res.id} value={res.nombreReserva}>
                  {res.nombreReserva}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen Actual</Form.Label>
            {aveEditado.imagen && (
              <Image src={aveEditado.imagen} width="100" className="mb-2" />
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditAve}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionAve;