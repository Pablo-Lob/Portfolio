import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Window.css';
import { FaTimes, FaMinus, FaExpand } from "react-icons/fa";

const Window = ({ file, onClose, onMinimize }) => {
    // 1. ESTADO PARA LA POSICIÓN (X, Y)
    const [position, setPosition] = useState({ x: 100, y: 50 });
    const [isDragging, setIsDragging] = useState(false);

    // Referencia para guardar la distancia entre el click y la esquina
    const dragOffset = useRef({ x: 0, y: 0 });

    // 2. INICIO DEL ARRASTRE (Al hacer click en la barra)
    const handleMouseDown = (e) => {
        // Solo arrastramos si es botón izquierdo
        if (e.button !== 0) return;

        setIsDragging(true);
        // Calculamos dónde hemos pinchado relativo a la ventana
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        e.stopPropagation(); // Evitar líos con otros eventos
    };

    // 3. EFECTO PARA MOVER Y SOLTAR (Eventos globales)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            // Nueva posición = Ratón actual - Distancia inicial
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        // Si estamos arrastrando, escuchamos el movimiento en TODA la ventana
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            // Limpieza vital al soltar o desmontar
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // Si está minimizada no renderizamos nada
    if (file.isMinimised) return null;

    return (
        <div
            className="window-container"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute', // Vital para que se mueva
                zIndex: isDragging ? 1000 : 10, // Traer al frente al mover
            }}
        >
            {/* BARRA DE TÍTULO (Aquí ponemos el evento de mouse down) */}
            <div
                className="window-header"
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className="window-title">
                    <img src={file.icon} alt="icon" className="window-icon-small" draggable="false" />
                    <span>{file.name}</span>
                </div>

                <div className="window-controls" onMouseDown={(e) => e.stopPropagation()}>
                    <div className="control-btn minimize" onClick={() => onMinimize(file.id)}>
                        <FaMinus size={10} />
                    </div>
                    <div className="control-btn maximize">
                        <FaExpand size={10} />
                    </div>
                    <div className="control-btn close" onClick={() => onClose(file.id)}>
                        <FaTimes size={12} />
                    </div>
                </div>
            </div>

            {/* CONTENIDO DEL ARCHIVO */}
            <div className="window-body">
                <div className="temp-content">
                    {file.type === 'file' && file.content.endsWith('.pdf') ? (
                        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <p>Visualizador PDF</p>
                            <a href={file.content} target="_blank" rel="noopener noreferrer" style={{color: '#3b8eea'}}>
                                Abrir {file.name} en pestaña nueva
                            </a>
                        </div>
                    ) : (
                        <>
                            <h3>{file.name}</h3>
                            <p>{file.content}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Window;