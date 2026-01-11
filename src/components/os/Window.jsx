// src/components/os/Window.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Window.css';
import { FaTimes, FaMinus, FaExpand } from "react-icons/fa";
import { RiDragMove2Fill } from "react-icons/ri";

const Window = ({ file, onClose, onMinimize, onMaximize }) => {
    // 1. ESTADO DE POSICIÓN Y TAMAÑO
    // Inicializamos con los valores del fileSystem o con valores por defecto
    const [position, setPosition] = useState({
        x: file.defaultX || 100,
        y: file.defaultY || 50
    });
    const [size, setSize] = useState({
        width: file.defaultWidth || 600,
        height: file.defaultHeight || 400
    });

    // Estados de control
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    // Referencias para cálculos matemáticos del ratón
    const dragStart = useRef({ x: 0, y: 0 }); // Dónde hice click
    const dimsStart = useRef({ w: 0, h: 0, x: 0, y: 0 }); // Tamaño/Pos al empezar

    // --- LÓGICA DE ARRASTRAR (MOVER VENTANA) ---
    const handleMouseDownDrag = (e) => {
        if (file.isMaximized || e.button !== 0) return;
        e.stopPropagation();
        setIsDragging(true);
        // Guardamos la diferencia entre el ratón y la esquina de la ventana
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    // --- LÓGICA DE REDIMENSIONAR (CAMBIAR TAMAÑO) ---
    const handleMouseDownResize = (e) => {
        if (file.isMaximized || e.button !== 0) return;
        e.stopPropagation();
        setIsResizing(true);
        // Guardamos dónde estaba el ratón y qué tamaño tenía la ventana
        dragStart.current = { x: e.clientX, y: e.clientY };
        dimsStart.current = { w: size.width, h: size.height };
    };

    // --- EFECTO GLOBAL PARA EL MOVIMIENTO DEL RATÓN ---
    useEffect(() => {
        const handleMouseMove = (e) => {
            // CASO 1: MOVIENDO LA VENTANA
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragStart.current.x,
                    y: e.clientY - dragStart.current.y
                });
            }
            // CASO 2: REDIMENSIONANDO LA VENTANA
            if (isResizing) {
                const deltaX = e.clientX - dragStart.current.x;
                const deltaY = e.clientY - dragStart.current.y;

                // Actualizamos tamaño (con un mínimo de seguridad de 300x200)
                setSize({
                    width: Math.max(300, dimsStart.current.w + deltaX),
                    height: Math.max(200, dimsStart.current.h + deltaY)
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    if (file.isMinimised) return null;

    // Calculamos estilos finales
    const currentStyle = file.isMaximized ? {} : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'absolute',
        zIndex: (isDragging || isResizing) ? 1000 : 10
    };

    // Clase CSS condicional
    const containerClass = `window-container ${file.isMaximized ? 'maximized' : ''}`;

    return (
        <div className={containerClass} style={currentStyle}>

            {/* HEADER (Arrastrable) */}
            <div
                className="window-header"
                onMouseDown={handleMouseDownDrag}
                style={{ cursor: file.isMaximized ? 'default' : (isDragging ? 'grabbing' : 'grab') }}
            >
                <div className="window-title">
                    <img src={file.icon} alt="icon" className="window-icon-small" draggable="false" />
                    <span>{file.name}</span>
                </div>

                <div className="window-controls" onMouseDown={(e) => e.stopPropagation()}>
                    <div className="control-btn minimize" onClick={() => onMinimize(file.id)}><FaMinus size={10} /></div>
                    <div className="control-btn maximize" onClick={() => onMaximize(file.id)}><FaExpand size={10} /></div>
                    <div className="control-btn close" onClick={() => onClose(file.id)}><FaTimes size={12} /></div>
                </div>
            </div>

            {/* BODY */}
            <div className="window-body" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {file.content.toString().endsWith('.pdf') ? (
                    <iframe src={file.content} title="Viewer" style={{ width: '100%', height: '100%', border: 'none' }} />
                ) : file.id === 'github' ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#ddd' }}>
                        <h3>GitHub Repositories</h3>
                        <p>Access forbidden via iframe (X-Frame-Options).</p>
                        <a href="https://github.com/Pablo-Lob" target="_blank" rel="noreferrer" className="kali-btn">
                            Open External Link ↗
                        </a>
                    </div>
                ) : (
                    <div className="temp-content" style={{ padding: '20px' }}>
                        <h3>{file.name}</h3>
                        <p>{file.content}</p>
                    </div>
                )}

                {/* --- TIRADOR DE REDIMENSIÓN (Solo si no está maximizada) --- */}
                {!file.isMaximized && (
                    <div
                        className="resize-handle"
                        onMouseDown={handleMouseDownResize}
                    >
                        {/* Pequeño triangulo visual o área invisible */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Window;