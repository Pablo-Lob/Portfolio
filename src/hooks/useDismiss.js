import { useEffect, useRef } from 'react';

export function useDismiss(open, ref, onClose) {
    const closeRef = useRef(onClose);

    useEffect(() => {
        closeRef.current = onClose;
    });

    useEffect(() => {
        if (!open) return;
        const handlePointerDown = e => { if (!ref.current?.contains(e.target)) closeRef.current(); };
        const handleKeyDown = e => { if (e.key === 'Escape') closeRef.current(); };
        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, ref]);
}
