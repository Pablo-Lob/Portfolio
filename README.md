Porfolio
-----
This is my personal portfolio showcasing my projects and skills.

-----
### Arquitectura del proyecto
````text
src/
│
├── assets/              # Aquí van tus imágenes estáticas
│   ├── images/          # (Wallpapers de Kali)
│   ├── icons/           # (Iconos del escritorio: carpeta, terminal, chrome...)
│   └── sounds/          # (Opcional: sonido de login si te vienes arriba)
│
├── components/          # TUS PIEZAS DE LEGO
│   ├── os/              # COMPONENTES DEL SISTEMA (La "Cáscara")
│   │   ├── BootScreen.jsx   # Lo que vas a hacer hoy (Pantalla de carga)
│   │   ├── Desktop.jsx      # El contenedor del fondo y los iconos
│   │   ├── Taskbar.jsx      # La barra superior/inferior
│   │   └── Window.jsx       # El marco genérico (con la X de cerrar)
│   │
│   └── apps/            # LAS APLICACIONES (El contenido real)
│       ├── Terminal.jsx     # Tu "Sobre mí" en modo comando
│       ├── Browser.jsx      # Para mostrar webs externas
│       └── PDFViewer.jsx    # Para tu CV
│
├── context/             # (Lo usaremos mañana)
│   └── OSContext.jsx    # Para saber qué ventanas están abiertas globalmente
│
├── hooks/               # (Lógica reutilizable)
│   └── useWindow.js     # Hook para abrir/cerrar ventanas
│
├── styles/              # Si decides usar módulos CSS o SCSS
│   └── boot.css         # Estilos específicos del arranque
│
├── App.jsx              # El "Kernel": decide si muestra BootScreen o Desktop
└── main.jsx             # Punto de entrada 
````