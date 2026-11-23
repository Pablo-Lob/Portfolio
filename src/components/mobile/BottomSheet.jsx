import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/BottomSheet.css';

const VELOCITY_THRESHOLD = 0.5;
const SAMPLE_WINDOW_MS = 100;
const GRIP_HEIGHT = 64;

function BottomSheet({ title, snaps = [0.5, 0.92], onClose, children }) {
    const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight);
    const sortedSnaps = [...snaps].sort((a, b) => a - b);
    const maxSnap = sortedSnaps[sortedSnaps.length - 1];
    const height = maxSnap * viewportHeight;
    const closedY = height;
    const positionFor = snap => height - snap * viewportHeight;

    const [y, setY] = useState(closedY);
    const [snapPx, setSnapPx] = useState(sortedSnaps[0] * viewportHeight);
    const [dragging, setDragging] = useState(false);
    const closingRef = useRef(false);
    const gesture = useRef(null);

    const closeRef = useRef(onClose);
    useEffect(() => {
        closeRef.current = onClose;
    });

    useEffect(() => {
        const onResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        let second = 0;
        const first = requestAnimationFrame(() => {
            second = requestAnimationFrame(() => setY(height - sortedSnaps[0] * viewportHeight));
        });
        return () => {
            cancelAnimationFrame(first);
            cancelAnimationFrame(second);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const animateClose = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        setDragging(false);
        setY(closedY);
    };

    const requestClose = () => {
        if (window.history.state?.sheet) window.history.back();
        else animateClose();
    };

    useEffect(() => {
        if (!window.history.state?.sheet) {
            window.history.pushState({ ...window.history.state, sheet: true }, '');
        }
        const onPop = () => animateClose();
        const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
        window.addEventListener('popstate', onPop);
        document.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('popstate', onPop);
            document.removeEventListener('keydown', onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
        if (closingRef.current) closeRef.current();
    };

    const onPointerDown = (e) => {
        if (closingRef.current || e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        gesture.current = { startY: e.clientY, startPos: y, samples: [{ t: e.timeStamp, y: e.clientY }] };
        setDragging(true);
    };

    const onPointerMove = (e) => {
        const g = gesture.current;
        if (!g) return;
        g.samples.push({ t: e.timeStamp, y: e.clientY });
        g.samples = g.samples.filter(s => e.timeStamp - s.t <= SAMPLE_WINDOW_MS);
        const next = g.startPos + (e.clientY - g.startY);
        setY(next < 0 ? next * 0.25 : Math.min(next, closedY));
    };

    const onPointerUp = (e) => {
        const g = gesture.current;
        if (!g) return;
        gesture.current = null;
        setDragging(false);

        const first = g.samples[0];
        const elapsed = e.timeStamp - first.t;
        const velocity = elapsed > 0 ? (e.clientY - first.y) / elapsed : 0;
        const current = Math.max(0, g.startPos + (e.clientY - g.startY));
        const targets = [...sortedSnaps.map(positionFor), closedY].sort((a, b) => a - b);

        let target;
        if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
            target = velocity > 0
                ? targets.find(t => t > current + 1) ?? closedY
                : [...targets].reverse().find(t => t < current - 1) ?? targets[0];
        } else {
            target = targets.reduce((best, t) => (Math.abs(t - current) < Math.abs(best - current) ? t : best));
        }

        if (target >= closedY) {
            requestClose();
            return;
        }
        setSnapPx(height - target);
        setY(target);
    };

    const progress = 1 - Math.min(Math.max(y, 0) / closedY, 1);

    return createPortal(
        <div className="sheet-root">
            <div className="sheet-backdrop" style={{ opacity: progress }} onClick={requestClose} />
            <div
                className={`sheet${dragging ? ' sheet-dragging' : ''}`}
                style={{ height, transform: `translateY(${y}px)` }}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onTransitionEnd={handleTransitionEnd}
            >
                <div
                    className="sheet-grip"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <span className="sheet-handle" />
                    <h2 className="sheet-title">{title}</h2>
                </div>
                <div className="sheet-body" style={{ maxHeight: snapPx - GRIP_HEIGHT }}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default BottomSheet;
