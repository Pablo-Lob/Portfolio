import {useState, useEffect} from 'react';
import '../../styles/Desktop.css';
import logo from '../../assets/images/kali_logo.png';
import {fileSystem} from "../../data/fileSystem.js";
import DesktopIcon from "./DesktopIcon.jsx";
import Window from "./Window.jsx";

function Desktop() {
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const formatAmPm = hour >= 12 ? 'PM' : 'AM'; // Formato AM/PM

    const format12 = hour % 12 || 12; // Formato 12 horas

    const timeString = `${format12}:${minutes.toString().padStart(2, '0')} ${formatAmPm}`; // Formato HH:MM AM/PM


    {/*------*/}
    // 1. Inicializamos VACÍO (como si estuviera apagado)
    const [openWindows, setOpenWindows] = useState([]);

    // 2. Efecto de "Boot" (Arranque)
    useEffect(() => {
        const bootDelay = 800; // 0.8 segundos de retraso (ajusta a tu gusto)

        const timer = setTimeout(() => {
            // Buscamos qué ventanas deben abrirse al inicio
            const startupWindows = fileSystem.filter(file => file.isOpen);

            // Las añadimos al estado
            setOpenWindows(prevWindows => {
                // Comprobación de seguridad: Solo añadir si no están ya abiertas
                // (Por si el usuario es flash y hace clic antes de que cargue)
                const newWindows = startupWindows.filter(
                    sw => !prevWindows.find(pw => pw.id === sw.id)
                );
                return [...prevWindows, ...newWindows];
            });
        }, bootDelay);

        return () => clearTimeout(timer);
    }, []);

    // 1. ABRIR VENTANA (Modificada para traer al frente si ya existe)
    const openWindow = (fileId) => {
        const file = fileSystem.find(f => f.id === fileId);
        const existingWindow = openWindows.find(w => w.id === fileId);

        if (existingWindow) {
            if (existingWindow.isMinimised) {
                toggleMinimizeWindow(fileId);
            }
            return;
        }

        if (file.type === 'link') {
            window.open(file.url, '_blank');
            return;
        }

        setOpenWindows([...openWindows, { ...file, isMinimised: false, isMaximized: false }]);
    };

    const closeWindow = (id) => {
        setOpenWindows(openWindows.filter(window => window.id !== id));
    };

    // 2. NUEVA FUNCIÓN: MINIMIZAR / RESTAURAR
    const toggleMinimizeWindow = (id) => {
        setOpenWindows(openWindows.map(window =>
            window.id === id ? { ...window, isMinimised: !window.isMinimised } : window
        ));
    };

    // 3. NUEVA FUNCIÓN: MAXIMIZAR / RESTAURAR TAMAÑO
    const toggleMaximizeWindow = (id) => {
        setOpenWindows(openWindows.map(window =>
            window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
        ));
    };

    {/*------*/}

    return (
        <div className="desktop-container">
            {/* Barra de tareas */}
            <div className="taskbar">

                <div className="taskbar-left">
                    <img className="logo-kali" src={logo} alt="Logo kali"/>

                    <div className="separator"></div>

                    <div className="terminal-icon">
                        <span style={{fontWeight: 'bold', fontSize: '14px'}}>_&gt;</span>
                    </div>

                    <div className="separator"></div>

                    <div className="workspaces">
                        <div className="workspace-btn active">1</div>
                        <div className="workspace-btn">2</div>
                        <div className="workspace-btn">3</div>
                        <div className="workspace-btn">4</div>
                    </div>

                    <div className="separator"></div>

                    <div className="taskbar-windows">
                        {openWindows.map(win => (
                            <div
                                key={win.id}
                                className={`taskbar-item ${win.isMinimised ? '' : 'active'}`}
                                onClick={() => toggleMinimizeWindow(win.id)}
                            >
                                <img src={win.icon} alt="icon" />
                                <span>{win.name}</span>
                            </div>
                        ))}
                    </div>
                </div>



                <div className="taskbar-right">
                    <div className="clock">
                        {timeString}
                    </div>

                    <div className="network-icon">
                        🌐︎
                    </div>

                    <div className="bell-icon">
                        🔔︎
                    </div>

                    <div className="settings-icon">
                        ⚙︎
                    </div>

                    <div className="separator"></div>

                    <div className="padlock-icon">
                        🔒︎
                    </div>

                    <div className="power-icon">
                        ⏻
                    </div>

                </div>

            </div>
            {/* Zona escritorio */}
            <div className="desktop-content">
                {/* Renderizacion de los iconos y elementos del escritorio */}
                {fileSystem.map((file) => (
                    <DesktopIcon
                    key={file.id}
                    file={file}
                    onOpen={openWindow}
                    />
                ))}

                {/* --- AQUI VA LA MAGIA: RENDERIZAR LAS VENTANAS ABIERTAS --- */}
                {openWindows.map((window) => (
                    <Window
                        key={window.id}
                        file={window}
                        onClose={closeWindow}
                        onMinimize={toggleMinimizeWindow}
                        onMaximize={toggleMaximizeWindow}
                    />
                ))}
            </div>
        </div>
    );

}

export default Desktop;