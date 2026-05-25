import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Window.css';
import { FaTimes, FaMinus, FaExpand } from "react-icons/fa";
import Terminal from '../apps/Terminal.jsx';
import CVViewer from '../apps/CVViewer.jsx';
import Certificates from '../apps/Certificates.jsx';
import Projects from '../apps/Projects.jsx';
import FileExplorer from '../apps/FileExplorer.jsx';

const Window = ({ file, onClose, onMinimize, onMaximize, onOpenWindow, onFocus, isActive }) => {
    const [position, setPosition] = useState(() => {
        const w = file.defaultWidth || 600;
        const h = file.defaultHeight || 400;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // Si no hay defaultX/Y, centrar en pantalla
        const rawX = file.defaultX != null ? file.defaultX : Math.round((vw - w) / 2);
        const rawY = file.defaultY != null ? file.defaultY : Math.round((vh - h) / 2);
        return {
            x: Math.max(0, Math.min(rawX, vw - w - 8)),
            y: Math.max(40, Math.min(rawY, vh - h - 8)),
        };
    });
    const [size, setSize] = useState({
        width: file.defaultWidth || 600,
        height: file.defaultHeight || 400
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const dragStart = useRef({ x: 0, y: 0 });
    const dimsStart = useRef({ w: 0, h: 0 });

    const handleMouseDownDrag = (e) => {
        if (file.isMaximized || e.button !== 0) return;
        e.stopPropagation();
        onFocus?.(file.id);
        setIsDragging(true);
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseDownResize = (e) => {
        if (file.isMaximized || e.button !== 0) return;
        e.stopPropagation();
        setIsResizing(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        dimsStart.current = { w: size.width, h: size.height };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const rawX = e.clientX - dragStart.current.x;
                const rawY = e.clientY - dragStart.current.y;
                setPosition(prev => {
                    const w = size.width;
                    const h = size.height;
                    return {
                        x: Math.max(0, Math.min(rawX, vw - w)),
                        y: Math.max(40, Math.min(rawY, vh - h)),
                    };
                });
            }
            if (isResizing) {
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const deltaX = e.clientX - dragStart.current.x;
                const deltaY = e.clientY - dragStart.current.y;
                setSize(prev => ({
                    width:  Math.max(300, Math.min(dimsStart.current.w + deltaX, vw - position.x)),
                    height: Math.max(200, Math.min(dimsStart.current.h + deltaY, vh - position.y)),
                }));
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

    const currentStyle = file.isMaximized ? {} : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'absolute',
        zIndex: (isDragging || isResizing) ? 1000 : (isActive ? 50 : 10)
    };

    const containerClass = `window-container ${file.isMaximized ? 'maximized' : ''}`;

    const renderContent = () => {
        const { content } = file;

        if (content === 'Terminal') {
            return <Terminal onOpenCV={() => onOpenWindow?.('cv')} />;
        }

        if (content === 'CVViewer') {
            return <CVViewer />;
        }

        if (content === 'Certificates') {
            return <Certificates />;
        }

        if (content === 'Projects') {
            return <Projects />;
        }

        if (content === 'FileExplorer') {
            return <FileExplorer />;
        }

        if (typeof content === 'string' && content.endsWith('.pdf')) {
            return (
                <iframe
                    src={content}
                    title="Viewer"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            );
        }

        if (file.id === 'github') {
            return (
                <div style={{ padding: '20px', textAlign: 'center', color: '#ddd' }}>
                    <h3>GitHub Repositories</h3>
                    <p>Access forbidden via iframe (X-Frame-Options).</p>
                    <a
                        href="https://github.com/Pablo-Lob"
                        target="_blank"
                        rel="noreferrer"
                        className="kali-btn"
                    >
                        Open External Link ↗
                    </a>
                </div>
            );
        }

        return (
            <div className="temp-content" style={{ padding: '20px' }}>
                <h3>{file.name}</h3>
                <p>{content}</p>
            </div>
        );
    };

    return (
        <div className={containerClass} style={currentStyle} onMouseDown={() => onFocus?.(file.id)}>
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

            <div className="window-body" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {renderContent()}

                {!file.isMaximized && (
                    <div className="resize-handle" onMouseDown={handleMouseDownResize} />
                )}
            </div>
        </div>
    );
};

export default Window;
