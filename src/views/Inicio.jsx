import React, { useState, useEffect } from 'react';
import { Container, Button, Carousel } from "react-bootstrap";
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
        </Carousel>
      </div>
      <Container className="mt-5">
        <br />
        <h1>{t('inicio.titulo')}</h1>
        <p>{t('inicio.descripcion')}</p>
        <br />
        {!esDispositivoIOS && mostrarBotonInstalacion && (
          <div className="my-4">
            <Button className="sombra" variant="primary" onClick={instalacion}>
              Instalar app TrekGo <i className="bi-download"></i>
            </Button>
          </div>
        )}
        {esDispositivoIOS && (
          <div className="text-center my-4">
            <Button className="sombra" variant="primary" onClick={abrirModalInstrucciones}>
              Cómo instalar TrekGo en iPhone <i className="bi-phone"></i>
            </Button>
          </div>
        )}
        <ModalInstalacionIOS mostrar={mostrarModalInstrucciones} cerrar={cerrarModalInstrucciones} />
      </Container>
    </>
  );
};

export default Inicio;