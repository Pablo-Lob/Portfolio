import profilePhoto from '../../assets/images/foto-profile.webp';
import { profile } from '../../data/profile.js';
import { experience } from '../../data/experience.js';
import { pickLang } from '../../utils/lang.js';
import { formatRange } from '../../utils/format.js';
import ResumeLink from '../ResumeLink.jsx';
import { FaFileAlt, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const current = experience.find(item => item.current) ?? experience[0];

function ProfileWidget({ onContact }) {
    return (
        <section className="m-widget" aria-label={profile.name}>
            <div className="m-widget-top">
                <img src={profilePhoto} alt="" className="m-widget-avatar" width="56" height="56" />
                <div className="m-widget-id">
                    <h1 className="m-widget-name">{profile.name}</h1>
                    <div className="m-widget-role">
                        <span className="m-widget-dot" />
                        {pickLang(profile.status)}
                    </div>
                    <div className="m-widget-meta">
                        <FaMapMarkerAlt size={9} /> {profile.location} · {formatRange(current)}
                    </div>
                </div>
            </div>
            <ResumeLink className="m-resume-cta">
                <FaFileAlt size={15} aria-hidden="true" /> Resume · Quick view
            </ResumeLink>
            <div className="m-widget-actions">
                <button type="button" className="m-action" onClick={onContact}>
                    <FaEnvelope size={14} /> Email
                </button>
                <a className="m-action" href={profile.github.url} target="_blank" rel="noopener noreferrer">
                    <FaGithub size={14} /> GitHub
                </a>
                <a className="m-action" href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={14} /> LinkedIn
                </a>
            </div>
        </section>
    );
}

export default ProfileWidget;
