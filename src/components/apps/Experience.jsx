import '../../styles/Experience.css';
import { experience } from '../../data/experience.js';
import { profile } from '../../data/profile.js';
import { isSpanishSpeaker, pickLang } from '../../utils/lang.js';
import { formatRange } from '../../utils/format.js';
import { FaTrophy } from 'react-icons/fa';

function Experience() {
    const spanish = isSpanishSpeaker();

    return (
        <div className="exp-window">
            <div className="exp-header">
                <h2 className="exp-title">Experience</h2>
                <p className="exp-subtitle">{pickLang(profile.role)}</p>
            </div>

            <div className="exp-body">
                <ol className="exp-timeline">
                    {experience.map(item => (
                        <li key={item.id} className={`exp-item${item.current ? ' exp-item-current' : ''}`}>
                            <span className="exp-dot" />
                            <div className="exp-card">
                                <div className="exp-period">
                                    {item.current && (
                                        <span className="exp-badge">{spanish ? 'Actual' : 'Current'}</span>
                                    )}
                                    <span>{formatRange(item)}</span>
                                </div>
                                <h3 className="exp-role">{pickLang(item.role)}</h3>
                                <div className="exp-company">{item.company} · {item.team}</div>
                                <p className="exp-desc">{pickLang(item.description)}</p>
                                {item.tech.length > 0 && (
                                    <div className="exp-tech">
                                        {item.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>

                <h3 className="exp-section-title">{spanish ? 'Logros' : 'Achievements'}</h3>
                <ul className="exp-achievements">
                    {profile.achievements.map(a => (
                        <li key={a.id} className="exp-achievement">
                            <FaTrophy size={14} className="exp-trophy" />
                            <div>
                                <div className="exp-achievement-title">{pickLang(a.title)}</div>
                                <div className="exp-achievement-desc">{pickLang(a.description)}</div>
                            </div>
                        </li>
                    ))}
                </ul>

                <h3 className="exp-section-title">{spanish ? 'Idiomas' : 'Languages'}</h3>
                <p className="exp-desc">{pickLang(profile.languages).join(' · ')}</p>
            </div>
        </div>
    );
}

export default Experience;
