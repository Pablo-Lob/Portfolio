# Auditoría portfolio — 2026-11-23

Decisiones del usuario: implementar directamente en código (sin Figma), orden 1→4, nada de push/deploy sin confirmación.

## Datos de contenido
- Nombre a usar: **Pablo Lobato González**. Rol: Estudiante de 4.º de Ingeniería Informática (UAX, 2023–2027 prev.) · Madrid.
- Experiencia actual: **Prácticas en Repsol — Infraestructura, grupo I&OaaS, septiembre 2026 – febrero 2027** (EN: Infrastructure Intern, I&OaaS team, Sep 2026 – Feb 2027).
- Experiencia previa: Profesor de Robótica y Programación — Ajedrezbyn, Madrid, abr 2025 – jun 2026. Curso de programación por bloques y robótica para +12 alumnos (8–14 años).
- Logros: Ganador Hackathon Avanade: Reto UNICEF 2026 (equipo de 5, +15 grupos, +100 participantes). Ganador Proyecto SENER 2026: visión por computador con YOLOv8, Hugging Face Transformers y Python para diagnóstico de césped deportivo.
- Proyectos del CV: MesaConnect (SaaS de reservas de restaurante vía WhatsApp y email con IA y recordatorios automáticos, proyecto personal); 2 Landing Pages con CMS propio (clientes reales, JWT, editor de temas en tiempo real, en producción — MIVS Global e ITS Stones/WebJA).
- Skills (fuente única): Backend: Java 17, Spring Boot, REST API, Multiservicios, PostgreSQL, MySQL, Maven, JUnit, Jakarta Mail, WhatsApp Business API. Frontend: React 19, Vite, JavaScript, CSS3, PHP, GSAP, Bootstrap, JWT. IA/ML: Python, Hugging Face, Keras, OpenAI API. Redes: Cisco Packet Tracer, TCP/IP, Routing, Switching, Subnetting. DevOps & Sistemas: Docker, Git, Ubuntu Server (Nginx, DNS, VPS), Windows Server, Scrum, Agile.
- Contacto: pablolobatodev@outlook.com · juanpablolobato.com · github.com/Pablo-Lob · linkedin.com/in/pablo-lobato-gonzalez
- Idiomas: Español nativo, Inglés B1 (1 año de inmersión en Irlanda).
- CV_ES.pdf ya actualizado (no incluye Repsol). CV_EN.pdf es el antiguo.

## Fase 1 — Arreglos rápidos
- XSS Terminal: entrada de usuario en `dangerouslySetInnerHTML` (Terminal.jsx echo/cat/ping/not found). Escapar o renderizar como componentes.
- Menú de apagado fuera de pantalla: Desktop.css:287 `bottom: calc(100% + 6px)` → `top: calc(100% + 6px)`.
- Projects corta botón GitHub: Projects.css grid → `grid-auto-rows: min-content; align-content: start;`, quitar overflow hidden de la tarjeta.
- Lint: Window.jsx:61,75 `prev` sin usar; :96 deps del useEffect. Migrar drag/resize a Pointer Events + setPointerCapture.
- Reloj re-renderiza todo el Desktop cada segundo: extraer `<Clock/>`.
- window.open sin noopener (Desktop.jsx:86); `rel="noopener noreferrer"` en target=_blank.
- Accesibilidad: div/img clicables → `<button>` con aria-label; Enter abre iconos; Esc cierra menús/ventanas; `role="dialog"` en Window; `:focus-visible`; `prefers-reduced-motion`.
- DesktopIcon: doble clic dispara dos veces (onClick detail===2 + onDoubleClick).
- Boot: saltable con clic/Enter/Esc, sessionStorage para no repetir; Cancel/Login sin función.
- Ventana maximizada siempre z-index 100; z-order de solo 2 niveles; ventanas no se re-ajustan al resize del navegador.
- Terminal: cases 'ls -la', 'rm -rf /', 'uname -a' nunca coinciden; Tab vacío → help; clear duplicado.
- Limpieza repo: `git rm -r Certificados FotoCV.JPG`; mover captura a docs/screenshot; quitar comentario basura index.css:1; OSContext vacío; SkillsMonitor no usado (conectar o borrar); Trash muestra "TrashBin".
- Imágenes: fondo.png es JPEG 4K de 956KB → WebP/AVIF ≤200KB (1920 y 3840); foto 256px WebP; extensiones correctas.
- Code-splitting con React.lazy para apps.
- SEO: og:image 1200×630 + summary_large_image, JSON-LD Person (worksFor Repsol), noscript con resumen, theme-color, apple-touch-icon, sitemap lastmod.

## Fase 2 — Contenido
- `src/data/profile.js`, `skills.js` (fuente única, sin porcentajes de plantilla), `experience.js` ({id, company, role:{es,en}, team, start, end, current, description, tech}).
- Nueva app **Experience** (icono maletín, ventana ~640×520, timeline vertical; Repsol arriba con etiqueta "Actual · sep 2026 – feb 2027").
- Widget escritorio: nombre real + "Prácticas · Repsol I&OaaS" con punto verde estático.
- Terminal: comando `experience`/`work`, actualizar about, neofetch (Status: Intern @ Repsol — Infraestructura), ls, README interno, autocompletado.
- FileExplorer: README virtual + experience.md.
- Projects: añadir MesaConnect y las 2 landings; arreglar links github genéricos (projects.js:7,27/31).
- index.html: title/description/keywords/OG/Twitter. README.md.

## Fase 3 — Sistema visual
Tokens en index.css :root:
```css
--bg-0:#0b0d12; --bg-1:#12151c; --bg-2:#1a1e27; --bg-3:#232834;
--line:rgba(255,255,255,.08); --line-strong:rgba(255,255,255,.14);
--fg-1:#e8eaf0; --fg-2:#a4abb9; --fg-3:#7a8293;
--accent:#367bf0; --accent-soft:rgba(54,123,240,.14);
--ok:#3fb950; --danger:#e5534b;
--r-sm:4px; --r-md:8px; --r-lg:12px;
--ease-out:cubic-bezier(.23,1,.32,1); --ease-in-out:cubic-bezier(.77,0,.175,1); --ease-drawer:cubic-bezier(.32,.72,0,1);
--z-desktop:1; --z-window:10; --z-window-active:50; --z-taskbar:100; --z-popover:200; --z-overlay:300;
```
- Fuentes: Geist (UI) + JetBrains Mono (terminal/labels) — sustituir Courier New/Segoe/Tahoma. Escala 11/12/13/14/16/20/28, mínimo 11px. Títulos ventana 13px/500. tabular-nums en reloj.
- Colapsar los ~54 hex y 4 azules a los tokens; categorías monocromas con accent.
- Contraste ≥4.5:1 (placeholders #555, project-year, etc.).
- Motion: ventana abre opacity+scale(.97→1) 180ms ease-out; minimizar translateY(8px) scale(.96) 160ms; nada de `transition: all`; hover iconos con fondo accent-soft (sin scale 1.2), active scale(.96); menús 150ms translateY(-4px); badge sin pulso infinito; boot con nombre real 28px/600 + rol mono 12px.
- Emojis → react-icons.

## Fase 4 — Versión móvil
- Detección por capacidad: hook `useIsMobile` con useSyncExternalStore y `matchMedia('(max-width:767px), (pointer:coarse) and (max-width:1023px)')`; override `?desktop=1` en localStorage. Tablet 768–1023 con pointer fino: escritorio con ventanas maximizadas.
- App.jsx elige `DesktopShell`/`MobileShell` con lazy(); eliminar MobileOverlay.
- Extraer gestor de apps compartido (openApp/closeApp) y registro de apps `src/components/apps/registry.js` usado por Window y AppScreen.
- MobileShell estilo launcher Kali NetHunter: status bar 28px + safe-area-top; widget perfil (foto 56px, nombre, "Prácticas · Repsol I&OaaS", 3 botones contacto 44px); grid 4 columnas iconos 56px etiqueta 12px; dock inferior 4 apps + safe-area-bottom.
- AppScreen a pantalla completa: header 48px (atrás, título), apertura 280ms ease-drawer desde el icono, back de Android con history.pushState, swipe down en header para volver.
- BottomSheet (contacto, detalle proyecto, certificados): snaps 50%/92%, cierre por velocidad >0.5px/ms, 300ms ease-drawer, overscroll-behavior: contain.
- CV/Certificados en móvil: botones abrir/descargar PDF (iframe PDF no funciona en Android/iOS).
- Terminal móvil: chips de comandos (help, experience, projects, contact), 14px, enterKeyHint="send", sin autoFocus, 100dvh + visualViewport.
- Projects 1 columna; FileExplorer panel único con breadcrumb; container queries en `.window-body`.
- 100dvh, env(safe-area-inset-*), targets ≥44px, viewport-fit=cover, theme-color.
- Probar con Playwright a 390×844 y 820×1180.
