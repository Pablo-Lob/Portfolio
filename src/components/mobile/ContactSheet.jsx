import { useState } from 'react';
import BottomSheet from './BottomSheet.jsx';
import { profile } from '../../data/profile.js';
import { isSpanishSpeaker } from '../../utils/lang.js';
import { FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaFilePdf, FaCopy, FaCheck } from 'react-icons/fa';

function ContactSheet({ onClose }) {
    const [copied, setCopied] = useState(false);
    const spanish = isSpanishSpeaker();
    const cvPath = spanish ? '/files/cv/CV_ES.pdf' : '/files/cv/CV_EN.pdf';

    const copyEmail = async () => {
        if (!navigator.clipboard) {
            console.error('Clipboard API no disponible en este navegador');
            return;
        }
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch (error) {
            console.error('No se pudo copiar el email:', error);
        }
    };

    return (
        <BottomSheet title={spanish ? 'Contacto' : 'Contact'} onClose={onClose}>
            <ul className="contact-list">
                <li className="contact-row">
                    <a className="contact-link" href={`mailto:${profile.email}`}>
                        <FaEnvelope size={16} />
                        <span className="contact-text">{profile.email}</span>
                    </a>
                    <button type="button" className="contact-copy" onClick={copyEmail} aria-label={spanish ? 'Copiar email' : 'Copy email'}>
                        {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
                    </button>
                </li>
                <li className="contact-row">
                    <a className="contact-link" href={profile.github.url} target="_blank" rel="noopener noreferrer">
                        <FaGithub size={16} />
                        <span className="contact-text">{profile.github.label}</span>
                    </a>
                </li>
                <li className="contact-row">
                    <a className="contact-link" href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={16} />
                        <span className="contact-text">{profile.linkedin.label}</span>
                    </a>
                </li>
                <li className="contact-row">
                    <a className="contact-link" href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">
                        <FaGlobe size={16} />
                        <span className="contact-text">{profile.website}</span>
                    </a>
                </li>
                <li className="contact-row">
                    <a className="contact-link" href={cvPath} target="_blank" rel="noopener noreferrer">
                        <FaFilePdf size={16} />
                        <span className="contact-text">{spanish ? 'Ver CV (Español)' : 'View CV (English)'}</span>
                    </a>
                </li>
            </ul>
        </BottomSheet>
    );
}

export default ContactSheet;
