import { useState } from 'react';
import { certificates } from '../../data/certificates.js';
import '../../styles/Certificates.css';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import { isSpanishSpeaker } from '../../utils/lang.js';
import BottomSheet from '../mobile/BottomSheet.jsx';
import { FaFilePdf, FaTimes, FaExternalLinkAlt, FaStar, FaDownload, FaChevronRight } from 'react-icons/fa';

function CertificateSheet({ cert, onClose }) {
    const spanish = isSpanishSpeaker();
    return (
        <BottomSheet title={cert.title} onClose={onClose}>
            <div className="cert-sheet">
                <p className="cert-sheet-meta">{cert.issuer} · {cert.date}</p>
                <a className="cert-sheet-btn cert-sheet-btn-primary" href={cert.file} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt size={13} /> {spanish ? 'Abrir PDF' : 'Open PDF'}
                </a>
                <a className="cert-sheet-btn" href={cert.file} download>
                    <FaDownload size={13} /> {spanish ? 'Descargar PDF' : 'Download PDF'}
                </a>
                {cert.verifyUrl && (
                    <a className="cert-sheet-btn" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt size={13} /> {spanish ? 'Verificar' : 'Verify'}
                    </a>
                )}
            </div>
        </BottomSheet>
    );
}

function Certificates() {
    const isMobile = useIsMobile();
    const [selected, setSelected] = useState(null);

    if (certificates.length === 0) {
        return (
            <div className="certs-empty">
                <FaFilePdf size={48} />
                <p>No certificates loaded yet.</p>
                <code>src/data/certificates.js</code>
            </div>
        );
    }

    const sorted = [...certificates].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    if (isMobile) {
        return (
            <div className="certs-mobile">
                <ul className="certs-mobile-list">
                    {sorted.map(cert => (
                        <li key={cert.id}>
                            <button type="button" className="certs-mobile-item" onClick={() => setSelected(cert)}>
                                <FaFilePdf size={22} />
                                <span className="cert-info">
                                    <span className="cert-title">
                                        <span className="cert-title-text">{cert.title}</span>
                                        {cert.favorite && <FaStar size={10} className="cert-star" />}
                                    </span>
                                    <span className="cert-meta">{cert.issuer} · {cert.date}</span>
                                </span>
                                <FaChevronRight size={12} className="certs-mobile-chevron" />
                            </button>
                        </li>
                    ))}
                </ul>
                {selected && <CertificateSheet cert={selected} onClose={() => setSelected(null)} />}
            </div>
        );
    }

    return (
        <div className="certs-container">
            {/* Lista lateral */}
            <div className="certs-list">
                {sorted.map(cert => (
                    <button
                        type="button"
                        key={cert.id}
                        className={`cert-item ${selected?.id === cert.id ? 'active' : ''}`}
                        onClick={() => setSelected(cert)}
                    >
                        <FaFilePdf size={20} />
                        <div className="cert-info">
                            <span className="cert-title">
                                <span className="cert-title-text">{cert.title}</span>
                                {cert.favorite && <FaStar size={10} className="cert-star" />}
                            </span>
                            <span className="cert-meta">{cert.issuer} · {cert.date}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Visor */}
            <div className="certs-viewer">
                {selected ? (
                    <>
                        <div className="certs-viewer-header">
                            <span>{selected.title}</span>
                            <div className="certs-viewer-actions">
                                {selected.verifyUrl && (
                                    <a
                                        href={selected.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cert-verify-btn"
                                    >
                                        <FaExternalLinkAlt size={10} /> Verify
                                    </a>
                                )}
                                <button
                                    type="button"
                                    className="cert-close-btn"
                                    aria-label="Close certificate"
                                    onClick={() => setSelected(null)}
                                >
                                    <FaTimes size={14} />
                                </button>
                            </div>
                        </div>
                        <iframe
                            src={selected.file}
                            title={selected.title}
                            className="certs-iframe"
                        />
                    </>
                ) : (
                    <div className="certs-viewer-placeholder">
                        <FaFilePdf size={40} />
                        <p>Select a certificate to view</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Certificates;
