import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        translation: {
          menu: {
            inicio: "Home",
            Aves: "Aves",
            productos: "Products",
            calendario: "Calendary",
            cerrarSesion: "Logout",
            iniciarSesion: "Login",
            idioma: "Language",
            español: "Spanish",
            ingles: "English",
          },
          inicio : {
            titulo: "Home",
            descripcion: "This is the home component.",
          },
        }
      },
      es: {
        translation: {
          menu: {
            inicio: "Inicio",
            tipo: "Tipo",
            aves: "Aves",
            guia: "Guias",
            reserva: "Reserva Natural",
            calendario: "Calendario",
            cerrarSesion: "Cerrar Sesión",
            iniciarSesion: "Iniciar Sesión",
            idioma: "Idioma",
            español: "Español",
            ingles: "Inglés",
          },
          inicio : {
            titulo: "Inicio",
            descripcion: "Este es el componente de inicio.",
          },
        }
      }
    },
  });

export default i18n;
