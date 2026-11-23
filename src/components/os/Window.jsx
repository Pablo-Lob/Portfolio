import { useState, useEffect, useRef } from 'react';
import '../../styles/Window.css';
import AppContent from '../apps/AppContent.jsx';
import { FaTimes, FaMinus, FaExpand } from "react-icons/fa";

const TASKBAR_HEIGHT = 40;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;
const BASE_Z = 10;

function clampFrame({ x, y, width, height }) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(width, vw);
    const h = Math.min(height, vh - TASKBAR_HEIGHT);
    return {
        width: w,
        height: h,
        x: Math.max(0, Math.min(x, vw - w)),
        y: Math.max(TASKBAR_HEIGHT, Math.min(y, vh - h)),
    };
}

function initialFrame(file) {
    const width = file.defaultWidth || 600;
    const height = file.defaultHeight || 400;
    return clampFrame({
        width,
        height,
        x: file.defaultX != null ? file.defaultX : Math.round((window.innerWidth - width) / 2),
        y: file.defaultY != null ? file.defaultY : Math.round((window.innerHeight - height) / 2),
    });
}

const Window = ({ file, onClose, onMinimize, onMaximize, onOpenWindow, onFocus, isActive, order }) => {
    const [frame, setFrame] = useState(() => initialFrame(file));
    const [interaction, setInteraction] = useState(null);
    const gesture = useRef(null);

    useEffect(() => {
        const refit = () => setFrame(prev => clampFrame(prev));
        window.addEventListener('resize', refit);
        return () => window.removeEventListener('resize', refit);
    }, []);

    const beginGesture = (mode) => (e) => {
        if (file.isMaximized || e.button !== 0) return;
        e.stopPropagation();
        onFocus?.(file.id);
        e.currentTarget.setPointerCapture(e.pointerId);
        gesture.current = { mode, startX: e.clientX, startY: e.clientY, origin: frame };
        setInteraction(mode);
    };

    const moveGesture = (e) => {
        const g = gesture.current;
        if (!g) return;
        const dx = e.clientX - g.startX;
        const dy = e.clientY - g.startY;
        if (g.mode === 'drag') {
            setFrame(clampFrame({ ...g.origin, x: g.origin.x + dx, y: g.origin.y + dy }));
        } else {
            const maxWidth = window.innerWidth - g.origin.x;
            const maxHeight = window.innerHeight - g.origin.y;
            setFrame({
                ...g.origin,
                width: Math.max(MIN_WIDTH, Math.min(g.origin.width + dx, maxWidth)),
                height: Math.max(MIN_HEIGHT, Math.min(g.origin.height + dy, maxHeight)),
            });
        }
    };

    const endGesture = () => {
        gesture.current = null;
        setInteraction(null);
    };

    const handleKeyDown = (e) => {
        if (e.key !== 'Escape') return;
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        onClose(file.id);
    };

    const currentStyle = file.isMaximized
        ? { zIndex: BASE_Z + order }
        : {
            left: `${frame.x}px`,
            top: `${frame.y}px`,
            width: `${frame.width}px`,
            height: `${frame.height}px`,
            position: 'absolute',
            zIndex: BASE_Z + order,
        };

    const containerClass = `window-container${file.isMaximized ? ' maximized' : ''}${isActive ? ' active' : ''}${file.isMinimised ? ' minimised' : ''}`;

    return (
        <div
            className={containerClass}
            style={currentStyle}
            role="dialog"
            aria-hidden={file.isMinimised || undefined}
            aria-label={file.name}
            tabIndex={-1}
            onPointerDown={() => onFocus?.(file.id)}
            onKeyDown={handleKeyDown}
        >
            <div
                className="window-header"
                onPointerDown={beginGesture('drag')}
                onPointerMove={moveGesture}
                onPointerUp={endGesture}
                onPointerCancel={endGesture}
                style={{ cursor: file.isMaximized ? 'default' : (interaction === 'drag' ? 'grabbing' : 'grab') }}
            >
                <div className="window-title">
                    <img src={file.icon} alt="" className="window-icon-small" draggable="false" />
                    <span>{file.name}</span>
                </div>

                <div className="window-controls" onPointerDown={(e) => e.stopPropagation()}>
                    <button type="button" className="control-btn minimize" aria-label={`Minimize ${file.name}`} onClick={() => onMinimize(file.id)}><FaMinus size={10} /></button>
                    <button type="button" className="control-btn maximize" aria-label={`Maximize ${file.name}`} onClick={() => onMaximize(file.id)}><FaExpand size={10} /></button>
                    <button type="button" className="control-btn close" aria-label={`Close ${file.name}`} onClick={() => onClose(file.id)}><FaTimes size={12} /></button>
                </div>
            </div>

            <div className="window-body" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                <AppContent file={file} onOpenApp={onOpenWindow} />

                {!file.isMaximized && (
                    <div
                        className="resize-handle"
                        onPointerDown={beginGesture('resize')}
                        onPointerMove={moveGesture}
                        onPointerUp={endGesture}
                        onPointerCancel={endGesture}
                    />
                )}
            </div>
        </div>
    );
};

export default Window;
