import { useEffect, useRef } from 'react';
import '../../styles/AppScreen.css';
import AppContent from '../apps/AppContent.jsx';
import { FaChevronLeft } from 'react-icons/fa';

const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5;

function AppScreen({ file, origin, leaving, onBack, onLeaveEnd, onOpenApp }) {
    const screenRef = useRef(null);
    const gesture = useRef(null);

    useEffect(() => {
        const viewport = window.visualViewport;
        const screen = screenRef.current;
        if (!viewport || !screen) return;
        const sync = () => {
            screen.style.setProperty('--vvh', `${viewport.height}px`);
            screen.style.setProperty('--vvt', `${viewport.offsetTop}px`);
        };
        sync();
        viewport.addEventListener('resize', sync);
        viewport.addEventListener('scroll', sync);
        return () => {
            viewport.removeEventListener('resize', sync);
            viewport.removeEventListener('scroll', sync);
        };
    }, []);

    const onPointerDown = (e) => {
        if (leaving || e.button !== 0 || e.target.closest('button')) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        gesture.current = { startY: e.clientY, last: { t: e.timeStamp, y: e.clientY }, velocity: 0 };
    };

    const onPointerMove = (e) => {
        const g = gesture.current;
        if (!g) return;
        const dy = Math.max(0, e.clientY - g.startY);
        const dt = e.timeStamp - g.last.t;
        if (dt > 0) g.velocity = (e.clientY - g.last.y) / dt;
        g.last = { t: e.timeStamp, y: e.clientY };
        const screen = screenRef.current;
        screen.classList.add('app-screen-dragging');
        screen.style.transform = `translateY(${dy}px)`;
    };

    const onPointerUp = (e) => {
        const g = gesture.current;
        if (!g) return;
        gesture.current = null;
        const screen = screenRef.current;
        const dy = Math.max(0, e.clientY - g.startY);
        screen.classList.remove('app-screen-dragging');

        if (dy > DISMISS_DISTANCE || g.velocity > DISMISS_VELOCITY) {
            screen.style.setProperty('--drag-y', `${dy}px`);
            screen.dataset.drag = 'true';
            onBack();
            return;
        }
        screen.style.transform = '';
    };

    return (
        <div
            ref={screenRef}
            className={`app-screen${leaving ? ' app-screen-leaving' : ''}`}
            style={{ '--ox': `${origin.x}px`, '--oy': `${origin.y}px` }}
            role="dialog"
            aria-label={file.name}
            onAnimationEnd={(e) => { if (leaving && e.target === e.currentTarget) onLeaveEnd(); }}
        >
            <header
                className="app-screen-header"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <button type="button" className="app-screen-back" onClick={onBack} aria-label="Back">
                    <FaChevronLeft size={16} />
                </button>
                <img src={file.icon} alt="" className="app-screen-icon" draggable="false" />
                <h1 className="app-screen-title">{file.name}</h1>
            </header>
            <div className="app-screen-body">
                <AppContent file={file} onOpenApp={onOpenApp} />
            </div>
        </div>
    );
}

export default AppScreen;
