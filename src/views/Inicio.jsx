import React, { useState, useEffect } from "react"; // 👈 AGREGA ESTO
import { Container, Button, Carousel, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Para redirección
import Aves1 from '../Imagenes/Aves1.jpg';
import Aves2 from '../Imagenes/Aves2.jpg';
import Aves3 from '../Imagenes/Aves3.jpg';
import Aves4 from '../Imagenes/Aves4.jpg';

const Inicio = () => {
  const [solicitudInstalacion, setSolicitudInstalacion] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook para navegar

  // Manejar evento beforeinstallprompt
  useEffect(() => {
    const manejarSolicitudInstalacion = (evento) => {
      evento.preventDefault();
      setSolicitudInstalacion(evento);
      setMostrarBotonInstalacion(true);
    };
    window.addEventListener("beforeinstallprompt", manejarSolicitudInstalacion);
    return () => {
      window.removeEventListener("beforeinstallprompt", manejarSolicitudInstalacion);
    };
  }, []);

  const instalacion = async () => {
    if (!solicitudInstalacion) return;
    try {
      await solicitudInstalacion.prompt();
      const { outcome } = await solicitudInstalacion.userChoice;
      console.log(outcome === "accepted" ? "Instalación aceptada" : "Instalación rechazada");
    } catch (error) {
      console.error("Error al intentar instalar la PWA:", error);
    } finally {
      setSolicitudInstalacion(null);
      setMostrarBotonInstalacion(false);
    }
  };

  const abrirModalInstrucciones = () => setMostrarModalInstrucciones(true);
  const cerrarModalInstrucciones = () => setMostrarModalInstrucciones(false);

  // Función para redirigir a registro
  const redirigirARegistro = () => {
    navigate('/registro'); // Redirige a la página de registro
  };

  // Nuevas funciones para redirecciones
  const redirigirAGuias = () => navigate('/guias');
  const redirigirAAves = () => navigate('/aves');
  const redirigirACatalogo = () => navigate('/catalogo');

  return (
    <>
      <div style={{ position: 'relative', minHeight: '80vh', objectFit: 'cover' }}>
        <Carousel fade interval={1000} style={{ height: '100vh' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Aves1}
              alt="Aves 1"
              style={{ objectFit: 'cover', width: '100%', height: '85vh' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h1>¡Bienvenido a TrekGo!</h1>
              <p>Explora los mejores tours de avistamiento de aves en Chontales. ¿Quieres saber más? Da un recorrido rápido.</p>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '35%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            >
              <Button variant="success" size="lg" onClick={redirigirARegistro}>
                ¡Regístrate ahora!
              </Button>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Aves2}
              alt="Aves 2"
              style={{ objectFit: 'cover', width: '100%', height: '85vh' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h1>¡Bienvenido a TrekGo!</h1>
              <p>Explora los mejores tours de avistamiento de aves en Chontales. ¿Quieres saber más? Da un recorrido rápido.</p>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '35%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            >
              <Button variant="success" size="lg" onClick={redirigirARegistro}>
                ¡Regístrate ahora!
              </Button>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Aves3}
              alt="Aves 3"
              style={{ objectFit: 'cover', width: '100%', height: '85vh' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h1>¡Bienvenido a TrekGo!</h1>
              <p>Explora los mejores tours de avistamiento de aves en Chontales. ¿Quieres saber más? Da un recorrido rápido.</p>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '35%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            >
              <Button variant="success" size="lg" onClick={redirigirARegistro}>
                ¡Regístrate ahora!
              </Button>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Aves4}
              alt="Aves 4"
              style={{ objectFit: 'cover', width: '100%', height: '85vh' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              <h1>¡Bienvenido a TrekGo!</h1>
              <p>Explora los mejores tours de avistamiento de aves en Chontales. ¿Quieres saber más? Da un recorrido rápido.</p>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '35%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            >
              <Button variant="success" size="lg" onClick={redirigirARegistro}>
                ¡Regístrate ahora!
              </Button>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Sección de tarjetas informativas */}
      <Container className="py-5">
        <Row className="justify-content-center g-4">
          <Col md={4}>
            <Card
              className="h-100 text-center animate__animated animate__fadeInUp"
              style={{ border: 'none', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Img variant="top" src={Aves1} alt="Guías" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Explora nuestros guías</Card.Title>
                <Card.Text>Conoce a nuestros expertos guías para tus tours de avistamiento.</Card.Text>
                <Button variant="success" onClick={redirigirAGuias}>Ver Guías</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="h-100 text-center animate__animated animate__fadeInUp"
              style={{ border: 'none', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Img variant="top" src={Aves2} alt="Aves" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Explora nuestras aves</Card.Title>
                <Card.Text>Descubre la diversidad de aves en Chontales.</Card.Text>
                <Button variant="success" onClick={redirigirAAves}>Ver Aves</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="h-100 text-center animate__animated animate__fadeInUp"
              style={{ border: 'none', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Img variant="top" src={Aves3} alt="Catálogo" style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>Descubre nuestro calendario de actividades</Card.Title>
                <Card.Text>Revisa nuestro catálogo de tours y reservas.</Card.Text>
                <Button variant="success" onClick={redirigirACatalogo}>Ver Catálogo</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <Row>
            <Col md={6} className="text-start mb-3 mb-md-0">
              <h5>Sobre Nosotros</h5>
              <p>Somos TrekGo - Apasionados por el turismo y la conservación de aves en Chontales.</p>
              <p>Contacto: trekgoinfo@gmail.com</p>
              <p>Teléfono: 89562310</p>
            </Col>
            <Col md={6} className="text-start">
              <h5>Síguenos en nuestras redes sociales</h5>
              <p>
                <a href="https://www.facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center mb-2">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/tu-cuenta" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                  </svg>
                </a>
              </p>
            </Col>
          </Row>
          <div className="mt-3 text-center">
            <p>&copy; {new Date().getFullYear()} Plataforma de Turismo en Chontales. Todos los derechos reservados.</p>
          </div>
        </Container>
      </footer>
    </> 
  );
};

export default Inicio;