import { useState } from 'react';
import { certificates } from '../../data/certificates.js';
import '../../styles/Certificates.css';
import { FaFilePdf, FaTimes, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

function Certificates() {
    const [selected, setSelected] = useState(null);

    if (certificates.length === 0) {
        return (
            <div className="certs-empty">
                <FaFilePdf size={48} color="#f39c12" />
                <p>No certificates loaded yet.</p>
                <code>src/data/certificates.js</code>
            </div>
        );
    }

    const sorted = [...certificates].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    return (
        <div className="certs-container">
            {/* Lista lateral */}
            <div className="certs-list">
                {sorted.map(cert => (
                    <div
                        key={cert.id}
                        className={`cert-item ${selected?.id === cert.id ? 'active' : ''}`}
                        onClick={() => setSelected(cert)}
                    >
                        <FaFilePdf size={20} color="#f39c12" />
                        <div className="cert-info">
                            <span className="cert-title">
                                <span className="cert-title-text">{cert.title}</span>
                                {cert.favorite && <FaStar size={10} className="cert-star" />}
                            </span>
                            <span className="cert-meta">{cert.issuer} · {cert.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visor */}
            <div className="certs-viewer">
                {selected ? (
                    <>
                        <div className="certs-viewer-header">
                            <span>{selected.title}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {selected.verifyUrl && (
                                    <a
                                        href={selected.verifyUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="cert-verify-btn"
                                    >
                                        <FaExternalLinkAlt size={10} /> Verify
                                    </a>
                                )}
                                <FaTimes
                                    size={14}
                                    style={{ cursor: 'pointer', color: '#aaa' }}
                                    onClick={() => setSelected(null)}
                                />
                            </div>
                        </div>
                        <iframe
                            src={selected.file}
                            title={selected.title}
                            style={{ width: '100%', flex: 1, border: 'none' }}
                        />
                    </>
                ) : (
                    <div className="certs-viewer-placeholder">
                        <FaFilePdf size={40} color="#444" />
                        <p>Select a certificate to view</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Certificates;
