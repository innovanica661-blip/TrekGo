import { Card, Col, Button, Modal, Row, Badge } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";

const TarjetaReservas = ({ reserva }) => {
  return (
    <Col lg={4} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: '0 0 300px', overflow: 'hidden' }}>
            {reserva.imagen && (
              <Card.Img
                variant="top"
                src={reserva.imagen}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          <Card.Body style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px' }}>
            <div style={{ flex: '1 0 auto' }}>
              <Card.Title style={{ whiteSpace: 'normal', fontSize: '1.3em', marginBottom: '5px' }}>
                {reserva.nombreReserva || 'No especificado'}
              </Card.Title>
              <Card.Text style={{ margin: '0', fontSize: '1.1em', marginBottom: '5px' }}>
                <strong>Descripción:</strong> {reserva.descripcion || 'No especificado'}
              </Card.Text>
              <Card.Text style={{ margin: '0', fontSize: '1.1em', marginBottom: '5px' }}>
                <strong>Ubicación:</strong> {reserva.ubicacion || 'No especificado'}
              </Card.Text>
              <Card.Text style={{ margin: '0', fontSize: '1.1em' }}>
                <strong>Distancia:</strong> {reserva.distancia || 'No disponible'}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default TarjetaReservas;