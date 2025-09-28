import { Card, Col } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";

const TarjetaGuia = ({ guia }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card>
          {guia.imagenes && (
            <Card.Img variant="top" src={guia.imagenes} alt={`${guia.nombre} ${guia.apellido}`} />
          )}
          <Card.Body>
            <Card.Title>{`${guia.nombre} ${guia.apellido}`}</Card.Title>
            <Card.Text>
              Cédula: {guia.cedula || 'No especificada'}
            </Card.Text>
            <Card.Text>
              Certificación: {guia.certificacion || 'No especificada'}
            </Card.Text>
            <Card.Text>
              Teléfono: {guia.telefono || 'No disponible'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default TarjetaGuia;