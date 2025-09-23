import React, { useState, useEffect } from 'react';
import { Container, Button, Carousel, Row, Col } from "react-bootstrap"; // Añadí Row y Col
import ModalInstalacionIOS from "../components/inicio/ModalInstalacionIOS";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Para redirección
import Aves1 from '../Imagenes/Aves1.jpg';
import Aves2 from '../Imagenes/Aves2.jpg';
import Aves3 from '../Imagenes/Aves3.jpg';
import Aves4 from '../Imagenes/Aves4.jpg';

const Inicio = () => {
  const [solicitudInstalacion, setSolicitudInstalacion] = useState(null);
  const [mostrarBotonInstalacion, setMostrarBotonInstalacion] = useState(false);
  const [esDispositivoIOS, setEsDispositivoIOS] = useState(false);
  const [mostrarModalInstrucciones, setMostrarModalInstrucciones] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook para navegar

  // Detectar dispositivo iOS
  useEffect(() => {
    const esIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setEsDispositivoIOS(esIOS);
  }, []);

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

  return (
    <>
      <div style={{ position: 'relative', minHeight: '80vh', objectFit: 'cover' }}>
        <Carousel fade interval={5000} style={{ height: '100vh' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Aves1}
              alt="Aves 1"
              style={{ objectFit: 'cover', width: '100%', height: '75vh' }}
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
              <h1>LA MEJOR PLATAFORMA DE TURISMO EN CHONTALES</h1>
              <p>Contamos con tours por los destinos para destinos más emblemáticos como las coordilleras de Amerrisque entre muchos más.</p>
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
                ¡Únete a nuestra comunidad de birders!
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
              <h1>LA MEJOR PLATAFORMA DE TURISMO EN CHONTALES</h1>
              <p>Contamos con tours por los destinos para destinos más emblemáticos como las coordilleras de Amerrisque entre muchos más.</p>
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
                ¡Únete a nuestra comunidad de birders!
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
              <h1>LA MEJOR PLATAFORMA DE TURISMO EN CHONTALES</h1>
              <p>Contamos con tours por los destinos para destinos más emblemáticos como las coordilleras de Amerrisque entre muchos más.</p>
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
                ¡Únete a nuestra comunidad de birders!
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
              <h1>LA MEJOR PLATAFORMA DE TURISMO EN CHONTALES</h1>
              <p>Descubre los mejores destinos para avistamiento de aves en Chontales. Ofrecemos guías expertos, reservas fáciles y un catálogo único de especies.</p>
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
                ¡Únete a nuestra comunidad de birders!
              </Button>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Nueva sección para Objetivos, Misión y Visión con íconos y texto */}
      <Container className="mt-1 py-1">
        <Row className="justify-content-center">
          <Col md={4} className="mb-4 text-center">
            <i className="bi-bullseye" style={{ fontSize: '2rem', color: '#a72828ff' }}></i>
            <h3 className="mt-2">{t('Objetivos')}</h3>
            <p>•	Posicionamiento de la marca: lograr que TrekGo sea reconocido como plataforma especializada en aventurismo y reservas naturales en Nicaragua y una de las más innovadoras.
              •	Atracción de turistas: implementar estrategias digitales que destaquen la riqueza de aves y reservas del país, incrementando el interés y las visitas de viajeros.
            •	 Promoción del turismo: difundir la conservación ambiental y el aviturismo responsable como valores diferenciales de la plataforma.
</p>
          </Col>
          <Col md={4} className="mb-4 text-center">
            <i className="bi-flag" style={{ fontSize: '2rem', color: '#3538dcff' }}></i>
            <h3 className="mt-2">{t('Misión')}</h3>
            <p>La principal misión de TrekGo es impulsar el turismo sostenible en nicaragua mediante una plataforma digital innovadora 
              que conecte a turistas, guías y operadoras locales, ofreciendo experiencias únicas en el aviturismo y las visitas a reservas 
              naturales, buscando fortalecer la conservación de la biodiversidad, generar oportunidades económicas para comunidades y posicionar a 
              nicaragua como un destino líder en ecoturismo responsable y de calidad.</p>
          </Col>
          <Col md={4} className="mb-4 text-center">
            <i className="bi-eye" style={{ fontSize: '2rem', color: '#128049ff' }}></i>
            <h3 className="mt-2">{t('Visión')}</h3>
            <p>Como equipo aspiramos a que TrekGo se convierta en la principal plataforma digital de aviturismo en Nicaragua. Visualizamos una aplicación 
              que, al cumplir con todas sus funcionalidades, logre transformar la manera en que turistas nacionales e internacionales exploren la riqueza
              natural del país, potenciando experiencias únicas, seguras y educativas.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inicio;