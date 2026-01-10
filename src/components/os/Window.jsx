import React from "react";
import '../../styles/Window.css';
import { FaTimes, FaMinus, FaExpand} from 'react-icons/fa';
import Draggable from 'react-draggable';

const Window = ({file, onClose, onMinimize}) => {

    if (file.isMinimised) return null;

    return (
        <Draggable
            handle=".window-header"
            defaultPosition={{x: 100, y: 50}}
            bounds=".desktop-container"
        >
            <div className="window-container">
                {/* 1. BARRA DE TÍTULO (HEADER) */}
                <div className="window-header">
                    <div className="window-title">
                        {/* Icono pequeño y nombre en la barra */}
                        <img src={file.icon} alt="icon" className="window-icon-small" />
                        <span>{file.name}</span>
                    </div>

                    <div className="window-controls">
                        {/* Botón Minimizar */}
                        <div className="control-btn minimize" onClick={() => onMinimize(file.id)}>
                            <FaMinus size={10} />
                        </div>
                        {/* Botón Maximizar (Solo visual por ahora) */}
                        <div className="control-btn maximize">
                            <FaExpand size={10} />
                        </div>
                        {/* Botón Cerrar (Rojo) */}
                        <div className="control-btn close" onClick={() => onClose(file.id)}>
                            <FaTimes size={12} />
                        </div>
                    </div>
                </div>

                {/* 2. CUERPO DE LA VENTANA (CONTENT) */}
                <div className="window-body">
                    {/* AQUÍ IRÁ EL CONTENIDO REAL LUEGO */}
                    <div className="temp-content">
                        <h3>Contenido de {file.name}</h3>
                        <p>Aquí cargaremos el componente: {file.content}</p>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Window;