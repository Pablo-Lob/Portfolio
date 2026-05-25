# Portfolio — Kali Linux OS Style

Portfolio personal interactivo que simula un escritorio Kali Linux / GNOME en el navegador. En lugar de una página estática, el visitante interactúa con un sistema operativo ficticio: arranca, inicia sesión y navega por aplicaciones reales que exponen proyectos, habilidades y CV.

---

## Demo

> **Live:** *(pendiente de despliegue — ejecuta `npm run dev` para verlo localmente)*

![Screenshot](Captura%20de%20pantalla%202026-05-24%20192709.png)

---

## Tecnologías

| Capa | Herramienta |
|---|---|
| UI Framework | React 19 |
| Bundler | Vite 7 (rolldown-vite) |
| Iconos | react-icons 5 |
| Estilos | CSS Modules por componente |
| Linting | ESLint 9 |
| Lenguaje | JavaScript (ESM) |

Sin librerías de UI externas — todo el sistema de ventanas, taskbar y terminal están construidos desde cero.

---

## Arquitectura del proyecto

```
Portfolio/
│
├── public/
│   ├── files/
│   │   ├── cv/                  # CV_ES.pdf · CV_EN.pdf
│   │   └── certificates/        # PDFs de certificados
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── assets/
    │   ├── icons/               # SVGs del escritorio (terminal, carpeta, proyectos…)
    │   ├── images/              # Wallpapers, logo Kali, foto de perfil
    │   └── sounds/              # (reservado)
    │
    ├── components/
    │   ├── os/                  # Capa del sistema operativo
    │   │   ├── BootScreen.jsx   # Secuencia de arranque + pantalla de login
    │   │   ├── Desktop.jsx      # Contenedor principal: taskbar, iconos, widgets, ventanas
    │   │   ├── DesktopIcon.jsx  # Icono doble-clic del escritorio
    │   │   ├── Window.jsx       # Marco genérico arrastrable con controles minimize/maximize/close
    │   │   └── MobileOverlay.jsx# Aviso en dispositivos móviles
    │   │
    │   └── apps/                # Aplicaciones que se abren dentro de Window
    │       ├── Terminal.jsx     # Terminal interactiva con ~15 comandos propios
    │       ├── CVViewer.jsx     # Lector de PDF con detección de idioma (ES/EN)
    │       ├── Certificates.jsx # Galería de certificados de Coursera
    │       ├── FileExplorer.jsx # Explorador de archivos estilo Nautilus
    │       ├── Projects.jsx     # Tarjetas de proyectos con tech stack y enlaces
    │       └── SkillsMonitor.jsx# Monitor de rendimiento con barras de habilidades
    │
    ├── context/
    │   └── OSContext.jsx        # Estado global de ventanas abiertas
    │
    ├── hooks/                   # Hooks reutilizables
    │
    ├── data/
    │   ├── projects.js          # Array de proyectos (id, name, tech, github, live…)
    │   ├── certificates.js      # Lista de certificados con rutas a los PDFs
    │   └── fileSystem.js        # Definición del sistema de archivos virtual del escritorio
    │
    ├── styles/                  # CSS por componente
    ├── App.jsx                  # Kernel: BootScreen → Desktop
    └── main.jsx                 # Entry point
```

---

## Flujo de la aplicación

```
[BootScreen]  →  secuencia de arranque animada  →  pantalla de login
     ↓
[Desktop]     →  taskbar GNOME + iconos + widgets de habilidades
     ↓
[Window]      →  contenedor arrastrable/maximizable para cada app
     ├── Terminal     — comandos: about, skills, projects, contact, neofetch, cv, ls, whoami…
     ├── CVViewer     — iframe con CV_ES.pdf o CV_EN.pdf según navigator.language
     ├── Projects     — tarjetas de proyectos con accent color y enlaces a GitHub
     ├── Certificates — visor de PDFs de Coursera
     ├── FileExplorer — explorador de archivos virtual
     └── SkillsMonitor— barras animadas de habilidades técnicas
```

---

## Apps disponibles

### Terminal
Terminal funcional con historial de comandos (↑/↓), autocompletado con Tab y Ctrl+L para limpiar.

| Comando | Descripción |
|---|---|
| `help` | Lista de comandos disponibles |
| `about` | Presentación personal |
| `skills` | Habilidades técnicas |
| `projects` | Listado de proyectos |
| `contact` | Email, GitHub, LinkedIn |
| `cv` | Abre el CVViewer |
| `neofetch` | Info del sistema con foto de perfil |
| `ls` | Lista archivos del directorio virtual |
| `whoami` | Usuario actual |
| `date` | Fecha y hora reales |
| `echo <msg>` | Imprime un mensaje |
| `ping <host>` | Simula ping |
| `uname -a` | Kernel falso estilo Kali |
| `cat README.md` | Muestra este README desde la terminal |
| `clear` / Ctrl+L | Limpia la pantalla |

### CVViewer
Detecta automáticamente el idioma del navegador (`navigator.language`) para servir `CV_ES.pdf` o `CV_EN.pdf`. Si el archivo no existe, muestra las rutas correctas donde colocarlo.

### Projects
Cuatro proyectos con tarjeta visual:
- **Web a medida** — CMS con PHP API + React 19 + 2FA
- **Infraestructura de Red Municipal** — OSPF/BGP/VPN con Cisco Packet Tracer
- **Portfolio OS** — este mismo proyecto
- **HobbiesApp** — prototipo UX/UI en Figma

### SkillsMonitor / Desktop widgets
Barras de progreso animadas agrupadas por categoría: Frontend, Backend, Herramientas, Seguridad.

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```

### Añadir el CV

Coloca los PDFs en las rutas correctas antes de hacer build:

```
public/files/cv/CV_ES.pdf
public/files/cv/CV_EN.pdf
```

### Añadir certificados

```
public/files/certificates/<nombre>.pdf
```

Y registra cada certificado en `src/data/certificates.js`.

---

## Autor

**Juan Pablo Lobato González**
Full-Stack Developer — España

- GitHub: [github.com/Pablo-Lob](https://github.com/Pablo-Lob)
- LinkedIn: [pablo-lobato-gonzález](https://www.linkedin.com/in/pablo-lobato-gonz%C3%A1lez-536b67221)
- Email: juanpablolobato1@gmail.com
