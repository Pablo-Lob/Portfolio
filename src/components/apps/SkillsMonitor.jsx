import { useEffect, useState } from 'react';
import '../../styles/SkillsMonitor.css';

const SKILLS = [
    {
        category: 'Frontend',
        color: '#3b8eea',
        items: [
            { name: 'HTML / CSS',      level: 90 },
            { name: 'JavaScript ES6+', level: 82 },
            { name: 'React / JSX',     level: 85 },
            { name: 'Vite',            level: 75 },
        ],
    },
    {
        category: 'Backend',
        color: '#2ecc71',
        items: [
            { name: 'PHP',             level: 70 },
            { name: 'MySQL',           level: 72 },
            { name: 'REST APIs',       level: 76 },
            { name: 'Python',          level: 65 },
        ],
    },
    {
        category: 'Diseño & Herramientas',
        color: '#e67e22',
        items: [
            { name: 'Figma / UX·UI',   level: 78 },
            { name: 'Git / GitHub',    level: 82 },
            { name: 'Keras / TF',      level: 55 },
        ],
    },
    {
        category: 'Seguridad & Redes',
        color: '#e74c3c',
        items: [
            { name: 'Kali Linux',       level: 65 },
            { name: 'Cisco / Redes',    level: 62 },
            { name: 'CTF / Pentesting', level: 55 },
        ],
    },
];

function SkillBar({ name, level, color, animate }) {
    return (
        <div className="skill-row">
            <div className="skill-label">
                <span className="skill-name">{name}</span>
                <span className="skill-pct" style={{ color }}>{level}%</span>
            </div>
            <div className="skill-track">
                <div
                    className="skill-fill"
                    style={{
                        width: animate ? `${level}%` : '0%',
                        background: color,
                    }}
                />
            </div>
        </div>
    );
}

function SkillsMonitor() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="sm-container">
            <div className="sm-header">
                <span className="sm-title">visitor@portfolio — skills monitor</span>
                <span className="sm-uptime">uptime: always learning</span>
            </div>
            <div className="sm-body">
                {SKILLS.map(group => (
                    <div key={group.category} className="sm-group">
                        <div className="sm-group-title" style={{ color: group.color }}>
                            ▸ {group.category}
                        </div>
                        {group.items.map(s => (
                            <SkillBar
                                key={s.name}
                                name={s.name}
                                level={s.level}
                                color={group.color}
                                animate={animate}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsMonitor;
