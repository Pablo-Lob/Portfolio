import {useState, useEffect} from 'react';
import '../../styles/Desktop.css';
import logo from '../../assets/images/kali_logo.png';
import {fileSystem} from "../../data/fileSystem.js";
import DesktopIcon from "./DesktopIcon.jsx";

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

    const [openWindows, setOpenWindows] = useState([]);

    const openWindow = (fileId) => {
        const file = fileSystem.find(f => f.id === fileId);

        if (openWindows.find(w => w.id === fileId)) return;

        if (file.type === 'link') {
            window.open(file.url, '_blank');
            return;
        }

        setOpenWindows([...openWindows, {...file, isMinimised: false}]);
    };

    const closeWindow = (id) => {
        setOpenWindows(openWindows.filter(window => window.id !== id));
    };

    const minimizeWindow = (id) => {
        setOpenWindows(openWindows.map(window =>
            window.id === id ? { ...window, isMinimised: true } : window
        ));
    };

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
                        onMinimize={minimizeWindow}
                    />
                ))}
            </div>
        </div>
    );

}

export default Desktop;