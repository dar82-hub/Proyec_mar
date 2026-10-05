/* ==========================================================================
   LÓGICA DE LA EXPERIENCIA INTERACTIVA - PREMIUM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // REGISTRO DE PLUGINS DE GSAP
    gsap.registerPlugin(ScrollTrigger);

    // ELEMENTOS DOM PRINCIPALES
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    const musicText = document.getElementById('music-text');
    
    let isMusicPlaying = false;
    let typedLetterInstance = null;
    let autoScrollInterval = null;

    // 1. INICIALIZAR CONFIGURACIÓN GENERAL
    document.getElementById('footer-author').textContent = autor;
    bgMusic.src = musica;

    // Cargar textos dinámicos desde config.js si existen
    if (typeof textos !== 'undefined') {
        if (textos.tituloIntro) document.getElementById('intro-main-title').textContent = textos.tituloIntro;
        if (textos.botonIntro) document.getElementById('btn-comenzar').textContent = textos.botonIntro;
        
        if (textos.preguntaConfirmacion) document.getElementById('confirm-title').textContent = textos.preguntaConfirmacion;
        if (textos.botonConfirmacion1) document.getElementById('btn-si-1').textContent = textos.botonConfirmacion1;
        if (textos.botonConfirmacion2) document.getElementById('btn-si-2').textContent = textos.botonConfirmacion2;
        
        if (textos.instruccionScroll) document.getElementById('scroll-instruction-text').textContent = textos.instruccionScroll;
        
        if (textos.tituloGaleria) document.getElementById('gallery-title').textContent = textos.tituloGaleria;
        if (textos.subtituloGaleria) document.getElementById('gallery-subtitle').textContent = textos.subtituloGaleria;
        
        if (textos.tituloTimeline) document.getElementById('timeline-title').textContent = textos.tituloTimeline;
        if (textos.subtituloTimeline) document.getElementById('timeline-subtitle').textContent = textos.subtituloTimeline;
        
        if (textos.tituloCarta) document.getElementById('letter-title').textContent = textos.tituloCarta;
        if (textos.subtituloCarta) document.getElementById('letter-subtitle').textContent = textos.subtituloCarta;
        
        if (textos.instruccionSobre) document.getElementById('envelope-tip').textContent = textos.instruccionSobre;
        
        if (textos.tituloDedicatoria) document.getElementById('dedication-subtitle').textContent = textos.tituloDedicatoria;
        if (textos.textoDedicatoria) document.getElementById('dynamic-dedication').textContent = textos.textoDedicatoria;
        
        if (textos.piePagina) {
            document.getElementById('footer-text-content').innerHTML = textos.piePagina;
        }
    }

    // 2. CONFIGURAR CURSOR PERSONALIZADO Y ESTELA DE ESTRELLAS
    let lastStarX = 0;
    let lastStarY = 0;
    const starMinDistance = 25; // Distancia mínima en px entre estrellas

    document.addEventListener('mousemove', (e) => {
        // Mover cursor principal y su brillo
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, opacity: 1 });
        gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.2, opacity: 1 });

        // Crear estrella de estela si el ratón se mueve lo suficiente
        const distance = Math.hypot(e.clientX - lastStarX, e.clientY - lastStarY);
        if (distance > starMinDistance) {
            createStarTrail(e.clientX, e.clientY);
            lastStarX = e.clientX;
            lastStarY = e.clientY;
        }
    });

    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0 });
        gsap.to(cursorGlow, { opacity: 0 });
    });

    // Función para crear partículas de estrellas
    function createStarTrail(x, y) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        
        // Posición inicial
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Rotación y tamaño aleatorios
        const size = Math.random() * 8 + 8; // 8px a 16px
        const rotate = Math.random() * 360;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
        
        document.body.appendChild(star);
        
        // Eliminar del DOM después de que termine la animación
        setTimeout(() => {
            star.remove();
        }, 1000);
    }

    // Agrandar cursor al pasar por elementos interactivos
    const interactives = document.querySelectorAll('button, a, .gallery-item, .envelope-wrapper');
    interactives.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.8, background: '#FFD700', duration: 0.2 });
            gsap.to(cursorGlow, { scale: 1.4, borderColor: '#FFD700', duration: 0.2 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, background: '#FFD700', duration: 0.2 });
            gsap.to(cursorGlow, { scale: 1, borderColor: '#C8A96A', duration: 0.2 });
        });
    });

    // 2.1 ANIMACIÓN AL HACER CLIC EN CUALQUIER PARTE (Onda + Pétalos + Destellos)
    document.addEventListener('pointerdown', (e) => {
        createClickAnimation(e.clientX, e.clientY);
    });

    function createClickAnimation(x, y) {
        // 1. Onda expansiva dorada
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);

        // 2. Estallido radial de mini pétalos y destellos sutiles
        const count = 8;
        const colors = [
            'linear-gradient(135deg, rgba(255, 192, 203, 0.9), rgba(255, 182, 193, 0.5))',
            'linear-gradient(135deg, rgba(255, 218, 185, 0.9), rgba(255, 228, 225, 0.5))',
            'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(200, 169, 106, 0.6))',
            'linear-gradient(135deg, rgba(255, 240, 245, 0.9), rgba(255, 192, 203, 0.6))'
        ];

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * (Math.PI * 2) + (Math.random() * 0.4 - 0.2);
            const distance = Math.random() * 35 + 30; // 30px a 65px
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const rot = Math.random() * 360;

            if (i % 2 === 0) {
                // Mini Pétalo floral
                const petal = document.createElement('div');
                petal.classList.add('click-petal');
                petal.style.left = `${x}px`;
                petal.style.top = `${y}px`;
                petal.style.width = `${Math.random() * 6 + 8}px`;
                petal.style.height = `${Math.random() * 6 + 10}px`;
                petal.style.background = colors[i % colors.length];
                petal.style.setProperty('--dx', `${dx}px`);
                petal.style.setProperty('--dy', `${dy}px`);
                petal.style.setProperty('--rot', `${rot}deg`);
                document.body.appendChild(petal);
                setTimeout(() => petal.remove(), 850);
            } else {
                // Mini Destello Dorado
                const sparkle = document.createElement('div');
                sparkle.classList.add('click-sparkle');
                sparkle.style.left = `${x}px`;
                sparkle.style.top = `${y}px`;
                const sSize = Math.random() * 5 + 6;
                sparkle.style.width = `${sSize}px`;
                sparkle.style.height = `${sSize}px`;
                sparkle.style.setProperty('--dx', `${dx}px`);
                sparkle.style.setProperty('--dy', `${dy}px`);
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 750);
            }
        }
    }

    // 2.2 ANIMACIÓN DE PÉTALOS DE FLORES FLOTANTES (SUTIL Y ELEGANTE)
    const petalsContainer = document.getElementById('floating-petals-container');
    const petalColors = [
        'linear-gradient(135deg, rgba(255, 182, 193, 0.45), rgba(255, 192, 203, 0.2))',
        'linear-gradient(135deg, rgba(255, 228, 225, 0.45), rgba(255, 218, 185, 0.2))',
        'linear-gradient(135deg, rgba(229, 196, 131, 0.35), rgba(200, 169, 106, 0.15))',
        'linear-gradient(135deg, rgba(255, 240, 245, 0.4), rgba(255, 182, 193, 0.25))'
    ];
    let activePetals = 0;
    const maxPetals = 16; // Mantener sutil y elegante sin sobrecargar

    function spawnPetal() {
        if (!petalsContainer || activePetals >= maxPetals) return;
        activePetals++;

        const petal = document.createElement('div');
        petal.classList.add('falling-petal');

        const startX = Math.random() * window.innerWidth;
        const driftX = (Math.random() - 0.5) * 160;
        const duration = Math.random() * 6 + 8; // 8s a 14s (caída suave y lenta)
        const sizeW = Math.random() * 8 + 10; // 10px a 18px
        const sizeH = sizeW * 1.3;
        const rotation = Math.random() * 720 - 360;
        const opacity = Math.random() * 0.25 + 0.3; // 0.3 a 0.55 (sutil)

        petal.style.left = `${startX}px`;
        petal.style.width = `${sizeW}px`;
        petal.style.height = `${sizeH}px`;
        petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.animationDuration = `${duration}s`;
        petal.style.setProperty('--drift-x', `${driftX}px`);
        petal.style.setProperty('--rot', `${rotation}deg`);
        petal.style.setProperty('--petal-opacity', opacity);

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
            activePetals--;
        }, duration * 1000);
    }

    // Iniciar caída suave de pétalos continuos
    setInterval(spawnPetal, 1300);
    for (let i = 0; i < 4; i++) {
        setTimeout(spawnPetal, i * 500);
    }

    // 3. FONDO DE PARTÍCULAS (tsParticles)
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: {
                    value: ["#C8A96A", "#FFD700", "#FFFFFF"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: { min: 0.1, max: 0.6 },
                    random: true,
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: { min: 1, max: 3.5 },
                    random: true
                },
                move: {
                    enable: true,
                    speed: 0.6,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                }
            },
            detectRetina: true
        });
    }

    // 4. CONTROL DE AUDIO (REPRODUCTOR FLOTANTE)
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicText.textContent = "Reproducir música";
            isMusicPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                musicText.textContent = "Música activa";
                isMusicPlaying = true;
            }).catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        }
    });

    // Intentar pre-cargar el audio
    bgMusic.load();

    // 5. FLUJO INTERACTIVO DE PANTALLAS (INTRO -> CONFIRMACIÓN -> NOMBRE)
    const btnComenzar = document.getElementById('btn-comenzar');
    const btnConfirm1 = document.getElementById('btn-si-1');
    const btnConfirm2 = document.getElementById('btn-si-2');

    // Clic en Comenzar (Intro -> Confirmar)
    btnComenzar.addEventListener('click', () => {
        gsap.to('#intro-screen .intro-content', { 
            opacity: 0, 
            y: -40, 
            duration: 0.8, 
            ease: 'power2.inOut',
            onComplete: () => {
                document.getElementById('intro-screen').classList.remove('active');
                
                const confirmScreen = document.getElementById('confirm-screen');
                confirmScreen.classList.add('active');
                
                // Animación de entrada de la tarjeta
                gsap.fromTo('#confirm-screen .confirm-card', 
                    { opacity: 0, scale: 0.85, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
                );
            }
        });
    });

    // Clic en Confirmar (Confirmar -> Nombre Reveal)
    const handleConfirmation = () => {
        // Reproducir música si no ha iniciado aún (buena oportunidad por click de usuario)
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                musicText.textContent = "Música activa";
                isMusicPlaying = true;
            }).catch(e => console.log("Audio auto-play bloqueado aún:", e));
        }

        gsap.to('#confirm-screen .confirm-card', {
            opacity: 0,
            scale: 0.85,
            y: -30,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                document.getElementById('confirm-screen').classList.remove('active');
                
                const nameScreen = document.getElementById('name-screen');
                nameScreen.classList.add('active');
                
                // Iniciar Typed en pantalla del nombre
                setTimeout(() => {
                    new Typed('#typed-name', {
                        strings: [nombre],
                        typeSpeed: 120,
                        showCursor: false,
                        onComplete: () => {
                            // Brillo dorado final en el nombre
                            gsap.to('#typed-name', {
                                textShadow: '0 0 30px #FFD700, 0 0 60px #C8A96A',
                                duration: 1
                            });
                            
                            // Retardo antes de cargar el contenido principal
                            setTimeout(() => {
                                gsap.to('#name-screen', {
                                    opacity: 0,
                                    duration: 1.2,
                                    onComplete: () => {
                                        document.getElementById('name-screen').classList.remove('active');
                                        
                                        // Cargar el viaje principal
                                        const mainContent = document.getElementById('main-content');
                                        mainContent.classList.add('active');
                                        
                                        // Animación fluida de aparición
                                        gsap.to(mainContent, { opacity: 1, duration: 1.5 });
                                        
                                        // Cargar dinámicamente secciones y activar animaciones
                                        renderDynamicContent();
                                    }
                                });
                            }, 1800);
                        }
                    });
                }, 500);
            }
        });
    };

    btnConfirm1.addEventListener('click', handleConfirmation);
    btnConfirm2.addEventListener('click', handleConfirmation);

    // 6. RENDERIZACIÓN DE CONTENIDO DINÁMICO E INTEGRACIONES DE SCROLL
    function renderDynamicContent() {
        // A) RENDERIZAR FRASES DE SCROLL
        const phrasesContainer = document.getElementById('dynamic-phrases-container');
        phrasesContainer.innerHTML = ''; // Limpiar

        frases.forEach((phraseText) => {
            const block = document.createElement('div');
            block.classList.add('phrase-block');
            
            const card = document.createElement('div');
            card.classList.add('phrase-card');
            
            const text = document.createElement('p');
            text.classList.add('phrase-text');
            text.textContent = phraseText;
            
            card.appendChild(text);
            block.appendChild(card);
            phrasesContainer.appendChild(block);

            // Efecto GSAP ScrollTrigger para cada frase (Fade + Slide + Blur)
            gsap.fromTo(card, 
                { opacity: 0, filter: 'blur(12px)', y: 60 },
                { 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    y: 0, 
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 80%',
                        end: 'top 30%',
                        toggleActions: 'play reverse play reverse',
                        once: false
                    }
                }
            );
        });

        // Ocultar el prompt de scroll inicial una vez que baje
        gsap.to('#scroll-prompt', {
            opacity: 0,
            scrollTrigger: {
                trigger: '#phrases-section',
                start: 'top -20px',
                end: 'top -200px',
                scrub: true
            }
        });

        // B) RENDERIZAR GALERÍA MASONRY
        const galleryGrid = document.getElementById('masonry-grid-container');
        galleryGrid.innerHTML = '';

        galeria.forEach((item) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.setAttribute('data-aos', 'fade-up');

            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.titulo;
            img.loading = 'lazy';

            const overlay = document.createElement('div');
            overlay.classList.add('gallery-overlay');

            const title = document.createElement('h3');
            title.classList.add('gallery-title');
            title.textContent = item.titulo;

            const desc = document.createElement('p');
            desc.classList.add('gallery-desc');
            desc.textContent = item.desc;

            overlay.appendChild(title);
            overlay.appendChild(desc);
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            galleryGrid.appendChild(galleryItem);

            // Evento Click para abrir Lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(item.url, item.titulo, item.desc);
            });
        });

        // C) RENDERIZAR LÍNEA DEL TIEMPO (TIMELINE)
        const timelineHolder = document.getElementById('dynamic-timeline-container');
        timelineHolder.innerHTML = '';

        timeline.forEach((item, index) => {
            const tlItem = document.createElement('div');
            tlItem.classList.add('timeline-item');
            
            // Alternar animaciones AOS según lado
            const aosAnimation = index % 2 === 0 ? 'fade-right' : 'fade-left';
            tlItem.setAttribute('data-aos', aosAnimation);

            const dot = document.createElement('div');
            dot.classList.add('timeline-dot');

            const card = document.createElement('div');
            card.classList.add('timeline-card');

            const dateSpan = document.createElement('span');
            dateSpan.classList.add('timeline-date');
            dateSpan.textContent = item.fecha;

            const title = document.createElement('h3');
            title.classList.add('timeline-card-title');
            title.textContent = item.titulo;

            const desc = document.createElement('p');
            desc.classList.add('timeline-desc');
            desc.textContent = item.desc;

            card.appendChild(dateSpan);
            card.appendChild(title);
            card.appendChild(desc);
            
            tlItem.appendChild(dot);
            tlItem.appendChild(card);
            
            timelineHolder.appendChild(tlItem);
        });

        // INICIALIZAR AOS DESPUÉS DE RENDERIZAR TODO EL CONTENIDO DINÁMICO
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom'
        });

        // Refrescar GSAP ScrollTrigger para mapear correctamente las nuevas alturas
        ScrollTrigger.refresh();
    }

    // 7. MECÁNICA DEL SOBRE 3D Y CARTA (TYPEWRITER)
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelopeTip = document.getElementById('envelope-tip');
    const letterPaper = document.querySelector('.letter-paper');
    const btnRewind = document.getElementById('btn-rewind');
    let isEnvelopeOpen = false;

    // Función para estallido de pétalos y destellos al abrir el sobre
    function burstEnvelopePetals(rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.35;
        for (let i = 0; i < 16; i++) {
            const angle = Math.PI + (i / 15) * Math.PI + (Math.random() * 0.3 - 0.15);
            const distance = Math.random() * 80 + 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            const petal = document.createElement('div');
            petal.classList.add('click-petal');
            petal.style.left = `${centerX}px`;
            petal.style.top = `${centerY}px`;
            petal.style.width = `${Math.random() * 6 + 10}px`;
            petal.style.height = `${Math.random() * 6 + 13}px`;
            petal.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 182, 193, 0.8))';
            petal.style.setProperty('--dx', `${dx}px`);
            petal.style.setProperty('--dy', `${dy}px`);
            petal.style.setProperty('--rot', `${Math.random() * 360}deg`);
            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 950);
        }
    }

    envelopeWrapper.addEventListener('click', (e) => {
        // Prevenir abrir/cerrar si se hace clic en botones dentro de la carta
        if (e.target.closest('.btn-rewind') || e.target.closest('.letter-paper')) {
            return;
        }

        if (!isEnvelopeOpen) {
            // Abrir sobre
            envelopeWrapper.classList.add('open');
            isEnvelopeOpen = true;
            envelopeTip.textContent = (typeof textos !== 'undefined' && textos.instruccionSobreAbierto) ? textos.instruccionSobreAbierto : "Desliza para leer la carta completa";
            
            // Animación de destellos y pétalos saliendo del sobre
            burstEnvelopePetals(envelopeWrapper.getBoundingClientRect());

            // Iniciar máquina de escribir después de que se deslice la carta (800ms)
            setTimeout(() => {
                startTypingLetter();
            }, 900);
        } else {
            // Cerrar sobre
            envelopeWrapper.classList.remove('open');
            isEnvelopeOpen = false;
            envelopeTip.textContent = (typeof textos !== 'undefined' && textos.instruccionSobre) ? textos.instruccionSobre : "Haz clic en el sobre para abrirlo";
            
            // Detener y resetear escritura de carta
            if (typedLetterInstance) {
                typedLetterInstance.destroy();
                typedLetterInstance = null;
            }
            clearInterval(autoScrollInterval);
            document.getElementById('letter-content').innerHTML = '';
            btnRewind.style.display = 'none';
        }
    });

    // Función para escribir la carta
    function startTypingLetter() {
        if (typedLetterInstance) {
            typedLetterInstance.destroy();
        }
        
        document.getElementById('letter-content').innerHTML = '';
        btnRewind.style.display = 'none';
        
        // Auto scroll suave mientras se escribe
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            letterPaper.scrollTop = letterPaper.scrollHeight;
        }, 150);

        typedLetterInstance = new Typed('#letter-content', {
            strings: [carta],
            typeSpeed: 35,
            showCursor: true,
            cursorChar: '🖋️',
            onComplete: () => {
                clearInterval(autoScrollInterval);
                letterPaper.scrollTop = letterPaper.scrollHeight;
                btnRewind.style.display = 'flex';
            }
        });
    }

    // Botón Rebobinar dentro de la carta
    btnRewind.addEventListener('click', (e) => {
        e.stopPropagation();
        startTypingLetter();
    });

    // 8. LIGHTBOX MODAL (VISUALIZACIÓN DE FOTOS)
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(url, title, desc) {
        lightboxImg.src = url;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br>${desc}`;
        lightboxModal.classList.add('active');
        // Desactivar scroll en el body mientras se visualiza la imagen
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.innerHTML = '';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
});
