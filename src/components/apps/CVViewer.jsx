import { useMemo, useState, useEffect } from 'react';
import { isSpanishSpeaker } from '../../utils/lang.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import '../../styles/CVViewer.css';
import { FaExclamationTriangle, FaFilePdf, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

function CVViewer() {
    const isMobile = useIsMobile();
    const cvPath = useMemo(() => {
        return isSpanishSpeaker()
            ? '/files/cv/CV_ES.pdf'
            : '/files/cv/CV_EN.pdf';
    }, []);

    const [ready, setReady] = useState(null); // null=checking, true=ok, false=missing

    useEffect(() => {
        fetch(cvPath, { method: 'HEAD' })
            .then(res => {
                const ct = res.headers.get('content-type') || '';
                setReady(res.ok && ct.includes('pdf'));
            })
            .catch(() => setReady(false));
    }, [cvPath]);

    if (ready === null) {
        return (
            <div style={styles.center}>
                <span style={styles.loading}>Loading CV...</span>
            </div>
        );
    }

    if (ready === false) {
        const lang = isSpanishSpeaker() ? 'ES' : 'EN';
        return (
            <div style={styles.center}>
                <div style={styles.box}>
                    <p style={styles.warn}>
                        <FaExclamationTriangle size={13} /> CV_{lang}.pdf not found
                    </p>
                    <p style={styles.hint}>
                        Place your PDF at:
                    </p>
                    <code style={styles.code}>public/files/cv/CV_ES.pdf</code>
                    <code style={styles.code}>public/files/cv/CV_EN.pdf</code>
                    <p style={{ ...styles.hint, marginTop: 16 }}>
                        Spanish-speaking visitors → CV_ES · Others → CV_EN
                    </p>
                </div>
            </div>
        );
    }

    if (isMobile) {
        const spanish = isSpanishSpeaker();
        const otherPath = spanish ? '/files/cv/CV_EN.pdf' : '/files/cv/CV_ES.pdf';
        return (
            <div className="cv-mobile">
                <FaFilePdf size={56} className="cv-mobile-icon" />
                <h2 className="cv-mobile-title">{spanish ? 'Currículum Vitae' : 'Curriculum Vitae'}</h2>
                <p className="cv-mobile-meta">{spanish ? 'PDF · Español' : 'PDF · English'}</p>
                <a className="cv-mobile-btn cv-mobile-btn-primary" href={cvPath} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt size={14} /> {spanish ? 'Abrir PDF' : 'Open PDF'}
                </a>
                <a className="cv-mobile-btn" href={cvPath} download>
                    <FaDownload size={14} /> {spanish ? 'Descargar PDF' : 'Download PDF'}
                </a>
                <a className="cv-mobile-link" href={otherPath} target="_blank" rel="noopener noreferrer">
                    {spanish ? 'También disponible en inglés' : 'Also available in Spanish'}
                </a>
            </div>
        );
    }

    return (
        <iframe
            src={cvPath}
            title="Curriculum Vitae"
            style={{ width: '100%', height: '100%', border: 'none' }}
        />
    );
}

const styles = {
    center: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-2)',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '30px 40px',
        background: 'var(--bg-3)',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--line)',
        textAlign: 'center',
    },
    loading: {
        color: 'var(--fg-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-sm)',
    },
    warn: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--warn)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-sm)',
        margin: 0,
    },
    hint: {
        color: 'var(--fg-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-sm)',
        margin: 0,
    },
    code: {
        display: 'block',
        background: 'var(--bg-0)',
        color: 'var(--accent-fg)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-sm)',
        padding: '4px 10px',
        borderRadius: 'var(--r-sm)',
    },
};

export default CVViewer;
