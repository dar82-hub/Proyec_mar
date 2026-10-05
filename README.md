# Experiencia Interactiva Premium para Marumi 🌟

Este proyecto es una página web interactiva, cinematográfica y emocional diseñada especialmente para **Marumi**. Es una experiencia completamente responsiva, optimizada para dispositivos móviles (iOS y Android), tablets y ordenadores, construida con un diseño minimalista de alta gama y detalles premium en negro y oro champagne.

---

## 🎭 Características de la Experiencia

*   **Fondo de Polvo de Estrellas:** Partículas doradas que flotan lentamente e interactúan sutilmente con el fondo (`tsParticles`).
*   **Estela del Cursor:** El cursor deja a su paso pequeños destellos y estrellas doradas que se desvanecen (desactivado en móviles táctiles para mejor rendimiento).
*   **Flujo Cinematográfico:** 
    1.  *Introducción:* Mensaje centrado de invitación con entrada fluida.
    2.  *Confirmación:* Tarjeta glassmorphism moderna con dos respuestas positivas.
    3.  *Revelación:* Nombre "Marumi" escrito letra por letra con destello dorado (`Typed.js`).
    4.  *Scroll Emocional:* Frases del viaje que se revelan con efecto Fade + Slide + Blur sincronizado (`GSAP ScrollTrigger`).
*   **Galería Masonry Premium:** Cuadrícula de fotos responsiva de estilo Awwwards. Muestra tus fotos ubicadas en `assets/fotos/`, con efectos de hover (escala de grises a color, zoom, brillo metálico) y se abren en un Lightbox de pantalla completa al hacer clic.
*   **Línea del Tiempo (Timeline):** Hitos y momentos memorables ordenados cronológicamente que se deslizan a los lados en scroll (`AOS`).
*   **Sobre y Carta Interactiva:** Un sobre 3D realista que se abre al hacer clic, desliza la carta hacia arriba y escribe la carta en tiempo real con efecto máquina de escribir.
*   **Dedicatoria Final:** Sección final elegante de cierre con una dedicatoria personalizada.
*   **Reproductor de Música Flotante:** Botón discreto en la esquina inferior para controlar la música (`assets/musica/musica.mp3`) con un ecualizador visualizador animado.

---

## 📂 Estructura del Proyecto

```text
experiencia-adriana/
├── index.html          # Estructura principal y carga de CDNs
├── style.css           # Estilos generales, layout responsivo y efectos 3D
├── script.js           # Lógica interactiva, GSAP y control de librerías
├── config.js           # Archivo de configuración modular para todo el contenido
├── README.md           # Guía de uso y despliegue (este archivo)
├── LICENSE             # Licencia de distribución
└── assets/
     ├── fotos/         # Fotografías de la galería (foto1.jpg, foto2.jpg...)
     ├── musica/        # Canción de fondo (musica.mp3)
     ├── audio/         # Respaldos o pistas adicionales
     ├── videos/        # Reservado para contenido audiovisual
     ├── icons/         # Favicon e iconos
     └── fonts/         # Fuentes opcionales
```

---

## ⚙️ ¿Cómo Personalizar el Contenido?

Toda la personalización se realiza directamente en el archivo `config.js` sin necesidad de tocar el código principal:

1.  **Datos Básicos (Nombre y Canción):**
    Abre `config.js` y edita las siguientes líneas:
    *   **Nombre:** Cambia `const nombre = "Marumi";`
    *   **Autor:** Cambia `const autor = "Darwin";`
    *   **Música:** Coloca tu archivo de música en la carpeta `assets/musica/` con el nombre `musica.mp3`.

2.  **Textos de Secciones y Botones:**
    Dentro del objeto `textos` en `config.js`, puedes modificar libremente títulos, subtítulos, preguntas de confirmación y textos explicativos de toda la experiencia sin necesidad de tocar el archivo `index.html`.

3.  **La Carta:**
    Edita la variable `carta` en `config.js` con tu mensaje. Utiliza comillas invertidas (\`) para respetar los saltos de línea y escribe con libertad. El texto se escribirá solo cuando ella abra el sobre.

4.  **Las Frases de Scroll:**
    Modifica la lista `frases` en `config.js` agregando o quitando cadenas de texto para el viaje de scroll.

5.  **Fotografías de la Galería:**
    *   Guarda tus fotografías favoritas dentro de la carpeta `assets/fotos/`.
    *   Nómbralas como: `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, `foto4.jpg`, `foto5.jpg`.
    *   Si deseas agregar más fotografías, simplemente colócalas en la carpeta (ej. `foto6.jpg`) y agrégalas al arreglo `galeria` en `config.js` con el formato:
        ```javascript
        { url: "assets/fotos/foto6.jpg", titulo: "Tu Título", desc: "Tu Descripción." }
        ```

6.  **Línea del Tiempo:**
    Personaliza los hitos en la lista `timeline` agregando el año o fecha, el título del hito y la descripción.

7.  **Dedicatoria Final:**
    Modifica la propiedad `textoDedicatoria` dentro del objeto `textos` en `config.js` para cambiar el mensaje de cierre final de la experiencia.

---

## 🚀 Despliegue en 2 Pasos

Este proyecto está estructurado para subirse directamente a **GitHub** y desplegarse en **Vercel** sin necesidad de herramientas de compilación o configuraciones adicionales.

### Paso 1: Subir a GitHub
1. Crea un repositorio vacío en tu cuenta de GitHub (ej: `experiencia-marumi`).
2. Inicializa git localmente en la carpeta del proyecto y haz push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Experiencia Marumi"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Desplegar en Vercel (Gratis)
1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New** > **Project**.
3. Importa tu repositorio recién creado.
4. Deja la configuración predeterminada y haz clic en **Deploy**.
5. ¡Listo! Vercel te dará un enlace público seguro que podrás convertir en un código QR para que Marumi lo escanee desde su celular.
