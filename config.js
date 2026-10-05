// CONFIGURACIÓN DE LA EXPERIENCIA INTERACTIVA - MARUMI
// Personalizado con todo el cariño y respeto.

const nombre = "Marumi";
const autor = "Darwin";
const musica = "assets/audio/song.mp3";

// Textos dinámicos de la interfaz
const textos = {
    tituloIntro: "Hay algo que preparé especialmente para ti.",
    botonIntro: "Comenzar",
    preguntaConfirmacion: "¿Estás segura de que quieres entrar?",
    botonConfirmacion1: "Sí ❤️",
    botonConfirmacion2: "Sí, completamente segura",
    instruccionScroll: "Desliza hacia abajo para comenzar el viaje",
    tituloGaleria: "Momentos en Imágenes",
    subtituloGaleria: "Nuestra Galería",
    tituloTimeline: "Línea del Tiempo",
    subtituloTimeline: "Nuestra Historia",
    tituloCarta: "Una Carta Para Ti",
    subtituloCarta: "Un Mensaje Especial",
    instruccionSobre: "Haz clic en el sobre para abrirlo",
    instruccionSobreAbierto: "Desliza para leer la carta completa",
    tituloDedicatoria: "Con todo mi cariño",
    textoDedicatoria: "Siempre tendrás un lugar especial e imborrable en mi corazón, Marumi.",
    piePagina: "Diseñado con cariño para ti &copy; 2026"
};

// El texto de la carta que aparecerá dentro del sobre.
const carta = `Querida Marumi,

gracias por aver estado en mi vida me cambiastes mucho mi forma de pensar de inicio a fin eres persona que mas feliz me hizo jamas te quitare de mi mente o nunca te olvidare por quedastes en mi corazon hasta que me muera pero quiero q sepas cuando estas igual puedes confiar conmigo en un futuro pienso yo y si no es asi te dije que de alguna forma me lograre contactar contigo o al menos verte o saber como ha sido tu vida... cuidate  mucho se que esto no se ha termino bien y tampoc quiero y espero q se acabo mal lo siento por todo el daño de ahora. mua`;

// Lista de frases que aparecerán mientras se hace scroll por la página
const frases = [
    "Gracias por haber estado en mi vida.",
    "Me cambiaste mucho mi forma de pensar de inicio a fin.",
    "Eres la persona que más feliz me hizo.",
    "Jamás te quitaré de mi mente y nunca te olvidaré.",
    "Quedaste en mi corazón hasta que me muera.",
    "Siempre podrás confiar en mí, Marumi."
];

// Lista de imágenes para la galería desde la carpeta FOTOS
const galeria = [
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM.jpeg", titulo: "Tus Ojos", desc: "La luz sincera en tu mirada que jamás olvidaré." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (1).jpeg", titulo: "Tu Sonrisa", desc: "El instante en que todo se sintió en paz." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (2).jpeg", titulo: "Instante Inolvidable", desc: "Momentos sencillos que se convirtieron en eternos." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (3).jpeg", titulo: "Cómplices", desc: "Risas compartidas que aún guardo en la memoria." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (4).jpeg", titulo: "Tu Esencia", desc: "La persona que cambió mi forma de ver el mundo." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (5).jpeg", titulo: "Cálido Recuerdo", desc: "Cada paso que dimos significó tanto para mí." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (6).jpeg", titulo: "Nuestra Conexión", desc: "Esas charlas sinceras donde el tiempo no existía." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (7).jpeg", titulo: "Tu Luz", desc: "Brillas de una manera que nadie más podrá igualar." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.47 PM (8).jpeg", titulo: "Magia Pura", desc: "Hiciste de los días comunes algo extraordinario." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.48 PM.jpeg", titulo: "Inocencia y Verdad", desc: "La pureza de tus gestos y tu alegría sincera." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.48 PM (1).jpeg", titulo: "Días Compartidos", desc: "Memorias que atesoro con profundo cariño." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.48 PM (2).jpeg", titulo: "Abrazo al Alma", desc: "La tranquilidad que solo tu compañía transmitía." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.48 PM (3).jpeg", titulo: "Mirada Única", desc: "Detalles en ti que siempre me hicieron admirarte." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.49 PM.jpeg", titulo: "Huellas en el Corazón", desc: "Marcaste mi vida para siempre de inicio a fin." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.49 PM (1).jpeg", titulo: "Tiempo Bonito", desc: "Gracias por cada segundo de felicidad que me diste." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.49 PM (2).jpeg", titulo: "Siempre en Mí", desc: "Un rincón de mi corazón siempre llevará tu nombre." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.49 PM (3).jpeg", titulo: "Dulzura Infinita", desc: "Tu calidez humana y tu manera tan especial de ser." },
    { url: "FOTOS/WhatsApp Image 2026-08-08 at 4.44.50 PM.jpeg", titulo: "Para Siempre, Marumi", desc: "El recuerdo más lindo y sincero de mi vida." }
];

// Eventos de la línea del tiempo (Timeline)
const timeline = [
    {
        fecha: "El Inicio",
        titulo: "El primer encuentro",
        desc: "Cuando nuestras vidas coincidieron y comenzó esta etapa que jamás olvidaré."
    },
    {
        fecha: "Instantes",
        titulo: "Conversaciones sinceras",
        desc: "Esas charlas de horas donde el tiempo no importaba y aprendí tanto de ti."
    },
    {
        fecha: "Tu Huella",
        titulo: "Tu sonrisa y tu luz",
        desc: "La alegría que me regalaste y la forma en que transformaste mi manera de pensar."
    },
    {
        fecha: "Hoy y Siempre",
        titulo: "Gratitud eterna",
        desc: "Un rincón creado para agradecerte todo lo vivido y desearte siempre lo mejor."
    }
];
