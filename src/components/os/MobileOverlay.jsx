import { useState, useMemo } from 'react';
import logo from '../../assets/images/kali_logo.png';
import '../../styles/MobileOverlay.css';
import { FaEnvelope, FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';

function isSpanishSpeaker() {
    const lang = navigator.language || navigator.userLanguage || '';
    return lang.toLowerCase().startsWith('es');
}

function MobileOverlay() {
    const [dismissed, setDismissed] = useState(false);
    const cvPath = useMemo(() => isSpanishSpeaker() ? '/files/cv/CV_ES.pdf' : '/files/cv/CV_EN.pdf', []);

    if (dismissed) return null;

    return (
        <div className="mobile-overlay">
            <div className="mobile-card">
                <img src={logo} alt="Kali" className="mobile-logo" />

                <h1 className="mobile-title">PORTFOLIO</h1>
                <p className="mobile-author">BY JUAN PABLO LOBATO</p>

                <div className="mobile-terminal">
                    <span className="mobile-prompt">visitor@portfolio:~$</span>
                    <span className="mobile-cmd"> uname -a</span>
                    <p className="mobile-output">
                        Este portfolio está optimizado<br />
                        para <span className="mobile-green">pantallas de escritorio</span>.
                    </p>
                    <span className="mobile-prompt">visitor@portfolio:~$</span>
                    <span className="mobile-cmd"> cat contact.txt</span>
                </div>

                <div className="mobile-contacts">
                    <a href="mailto:juanpablolobato1@gmail.com" className="mobile-link">
                        <FaEnvelope size={14} />
                        juanpablolobato1@gmail.com
                    </a>
                    <a href="https://github.com/Pablo-Lob" target="_blank" rel="noreferrer" className="mobile-link">
                        <FaGithub size={14} />
                        github.com/Pablo-Lob
                    </a>
                    <a href="https://www.linkedin.com/in/pablo-lobato-gonz%C3%A1lez-536b67221" target="_blank" rel="noreferrer" className="mobile-link">
                        <FaLinkedin size={14} />
                        linkedin.com/in/pablo-lobato-gonzález
                    </a>
                    <a href={cvPath} target="_blank" rel="noreferrer" className="mobile-link mobile-link-cv">
                        <FaFilePdf size={14} />
                        Ver mi CV ({isSpanishSpeaker() ? 'Español' : 'English'})
                    </a>
                </div>

                <button className="mobile-anyway" onClick={() => setDismissed(true)}>
                    Ver de todas formas →
                </button>
            </div>
        </div>
    );
}

export default MobileOverlay;
