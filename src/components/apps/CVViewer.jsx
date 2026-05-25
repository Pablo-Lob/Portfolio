import { useMemo, useState, useEffect } from 'react';

const SPANISH_LOCALES = [
    'es', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU',
    'es-DO', 'es-EC', 'es-SV', 'es-GT', 'es-HN', 'es-MX', 'es-NI',
    'es-PA', 'es-PY', 'es-PE', 'es-PR', 'es-ES', 'es-UY', 'es-VE',
];

function isSpanishSpeaker() {
    const lang = navigator.language || navigator.userLanguage || '';
    return SPANISH_LOCALES.some(l => lang.toLowerCase().startsWith(l.toLowerCase()));
}

function CVViewer() {
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
                <span style={{ color: '#2ecc71', fontFamily: 'monospace' }}>Loading CV...</span>
            </div>
        );
    }

    if (ready === false) {
        const lang = isSpanishSpeaker() ? 'ES' : 'EN';
        return (
            <div style={styles.center}>
                <div style={styles.box}>
                    <p style={{ color: '#f1c40f', fontFamily: 'monospace', margin: 0 }}>
                        ⚠ CV_{lang}.pdf not found
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
        background: '#1f2229',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '30px 40px',
        background: '#2a2a2a',
        borderRadius: 8,
        border: '1px solid #333',
        textAlign: 'center',
    },
    hint: {
        color: '#888',
        fontFamily: 'monospace',
        fontSize: 12,
        margin: 0,
    },
    code: {
        display: 'block',
        background: '#1a1a1a',
        color: '#2ecc71',
        fontFamily: 'monospace',
        fontSize: 12,
        padding: '4px 10px',
        borderRadius: 4,
    },
};

export default CVViewer;
