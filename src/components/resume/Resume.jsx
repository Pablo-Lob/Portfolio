import { useState, useRef, useEffect } from 'react';
import '../../styles/Resume.css';
import { profile } from '../../data/profile.js';
import { experience } from '../../data/experience.js';
import { projects } from '../../data/projects.js';
import { skills } from '../../data/skills.js';
import { pickBy } from '../../utils/lang.js';
import { formatRange } from '../../utils/format.js';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import { closeResume, replaceUrl, RESUME_PATH } from '../../hooks/useResumeRoute.js';
import { FaDownload, FaDesktop, FaEnvelope, FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const LANGS = ['en', 'es'];

const TEXT = {
    en: {
        pageTitle: `${profile.name} — Resume · Computer Engineering student · Infrastructure Intern at Repsol`,
        pageDescription: 'Resume of Pablo Lobato González, Computer Engineering student in Madrid and Infrastructure Intern at Repsol (I&OaaS). Java, Spring Boot, React, Docker and networking. Winner of the Avanade UNICEF hackathon and the SENER project.',
        skip: 'Skip to content',
        langLabel: 'Language',
        download: 'Download CV (PDF)',
        explore: 'Explore interactive desktop',
        experience: 'Experience',
        current: 'Current',
        projects: 'Featured projects',
        problem: 'Problem',
        work: 'What I did',
        stack: 'Stack',
        live: 'Live site',
        source: 'Source',
        privateSource: 'Private repository',
        otherProjects: 'Other projects',
        achievements: 'Achievements',
        education: 'Education',
        skills: 'Skills',
        languages: 'Languages',
        contact: 'Contact',
        cvPath: '/files/cv/CV_EN.pdf',
    },
    es: {
        pageTitle: `${profile.name} — Resumen · Estudiante de Ingeniería Informática · Prácticas en Infraestructura en Repsol`,
        pageDescription: 'Resumen de Pablo Lobato González, estudiante de Ingeniería Informática en Madrid y en prácticas de Infraestructura en Repsol (I&OaaS). Java, Spring Boot, React, Docker y redes. Ganador del hackathon Avanade UNICEF y del proyecto SENER.',
        skip: 'Saltar al contenido',
        langLabel: 'Idioma',
        download: 'Descargar CV (PDF)',
        explore: 'Explorar el escritorio interactivo',
        experience: 'Experiencia',
        current: 'Actual',
        projects: 'Proyectos destacados',
        problem: 'Problema',
        work: 'Qué hice',
        stack: 'Stack',
        live: 'Web en producción',
        source: 'Código',
        privateSource: 'Repositorio privado',
        otherProjects: 'Otros proyectos',
        achievements: 'Logros',
        education: 'Formación',
        skills: 'Habilidades',
        languages: 'Idiomas',
        contact: 'Contacto',
        cvPath: '/files/cv/CV_ES.pdf',
    },
};

function readInitialLang() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    return LANGS.includes(requested) ? requested : 'en';
}

function hostLabel(url) {
    return url.replace(/^https?:\/\//, '');
}

function Resume() {
    const [lang, setLang] = useState(readInitialLang);
    const t = TEXT[lang];
    const pick = (value) => pickBy(value, lang);
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current?.focus({ preventScroll: true });
    }, []);

    useDocumentMeta({
        title: t.pageTitle,
        description: t.pageDescription,
        canonical: `https://${profile.website}${RESUME_PATH}`,
        lang,
    });

    const changeLang = (next) => {
        setLang(next);
        replaceUrl(next === 'es' ? `${RESUME_PATH}&lang=es` : RESUME_PATH);
    };

    const handleExplore = (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        closeResume();
    };

    const featured = projects.filter(p => p.caseStudy);
    const others = projects.filter(p => !p.caseStudy);

    return (
        <div className="resume">
            <a className="resume-skip" href="#resume-main">{t.skip}</a>

            <div className="resume-bar">
                <div className="resume-bar-inner">
                    <a className="resume-back" href="/" onClick={handleExplore}>
                        <FaDesktop size={13} aria-hidden="true" /> {t.explore}
                    </a>
                    <div className="resume-lang" role="group" aria-label={t.langLabel}>
                        {LANGS.map(code => (
                            <button
                                key={code}
                                type="button"
                                className="resume-lang-btn"
                                aria-pressed={lang === code}
                                lang={code}
                                onClick={() => changeLang(code)}
                            >
                                {code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="resume-main" id="resume-main">
                <header className="resume-head">
                    <h1 className="resume-name" tabIndex={-1} ref={nameRef}>{profile.name}</h1>
                    <p className="resume-headline">{pick(profile.headline)}</p>
                    <p className="resume-location">
                        <FaMapMarkerAlt size={12} aria-hidden="true" /> {profile.location}, {pick(profile.country)}
                    </p>

                    <ul className="resume-contact" aria-label={t.contact}>
                        <li><a href={`mailto:${profile.email}`}><FaEnvelope size={13} aria-hidden="true" /> {profile.email}</a></li>
                        <li><a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer"><FaLinkedin size={13} aria-hidden="true" /> LinkedIn</a></li>
                        <li><a href={profile.github.url} target="_blank" rel="noopener noreferrer"><FaGithub size={13} aria-hidden="true" /> {profile.github.label}</a></li>
                        <li><a href={`https://${profile.website}`}><FaGlobe size={13} aria-hidden="true" /> {profile.website}</a></li>
                    </ul>

                    <div className="resume-actions">
                        <a className="resume-btn resume-btn-primary" href={t.cvPath} download>
                            <FaDownload size={15} aria-hidden="true" /> {t.download}
                        </a>
                        <a className="resume-btn" href="/" onClick={handleExplore}>
                            <FaDesktop size={15} aria-hidden="true" /> {t.explore}
                        </a>
                    </div>
                </header>

                <section className="resume-section" aria-labelledby="resume-exp">
                    <h2 id="resume-exp" className="resume-h2">{t.experience}</h2>
                    <ul className="resume-list">
                        {experience.map(item => (
                            <li key={item.id} className="resume-entry">
                                <div className="resume-entry-top">
                                    <h3 className="resume-h3">
                                        {pick(item.role)} <span className="resume-sep">·</span> {item.company}
                                    </h3>
                                    <p className="resume-meta">
                                        {formatRange(item, lang)}
                                        {item.current && <span className="resume-pill">{t.current}</span>}
                                    </p>
                                </div>
                                <p className="resume-text">{item.team} — {pick(item.description)}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="resume-section" aria-labelledby="resume-projects">
                    <h2 id="resume-projects" className="resume-h2">{t.projects}</h2>
                    <div className="resume-cases">
                        {featured.map(project => (
                            <article key={project.id} className="resume-case">
                                <div className="resume-entry-top">
                                    <h3 className="resume-h3">{project.name}</h3>
                                    <p className="resume-meta">{project.year}</p>
                                </div>
                                <dl className="resume-case-body">
                                    <div>
                                        <dt>{t.problem}</dt>
                                        <dd>{pick(project.caseStudy.problem)}</dd>
                                    </div>
                                    <div>
                                        <dt>{t.work}</dt>
                                        <dd>{pick(project.caseStudy.work)}</dd>
                                    </div>
                                    <div>
                                        <dt>{t.stack}</dt>
                                        <dd>
                                            <ul className="resume-tags">
                                                {project.tech.map(item => <li key={item}>{item}</li>)}
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                                <p className="resume-links">
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt size={11} aria-hidden="true" /> {t.live}: {hostLabel(project.live)}
                                        </a>
                                    )}
                                    {project.github ? (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <FaGithub size={12} aria-hidden="true" /> {t.source}: GitHub
                                        </a>
                                    ) : (
                                        <span className="resume-muted">{t.privateSource}</span>
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>

                    <h3 className="resume-h3 resume-h3-spaced">{t.otherProjects}</h3>
                    <ul className="resume-list resume-list-tight">
                        {others.map(project => (
                            <li key={project.id} className="resume-text">
                                <strong>{project.name}</strong> ({project.year}) — {pick(project.description)}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="resume-section" aria-labelledby="resume-ach">
                    <h2 id="resume-ach" className="resume-h2">{t.achievements}</h2>
                    <ul className="resume-list">
                        {profile.achievements.map(a => (
                            <li key={a.id} className="resume-entry">
                                <h3 className="resume-h3">{pick(a.title)}</h3>
                                <p className="resume-text">{pick(a.description)}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="resume-section" aria-labelledby="resume-edu">
                    <h2 id="resume-edu" className="resume-h2">{t.education}</h2>
                    <div className="resume-entry">
                        <div className="resume-entry-top">
                            <h3 className="resume-h3">{pick(profile.education.degree)}</h3>
                            <p className="resume-meta">{pick(profile.education.period)}</p>
                        </div>
                        <p className="resume-text">{profile.education.school} — {pick(profile.education.note)}</p>
                    </div>
                </section>

                <section className="resume-section" aria-labelledby="resume-skills">
                    <h2 id="resume-skills" className="resume-h2">{t.skills}</h2>
                    <dl className="resume-skills">
                        {skills.map(group => (
                            <div key={group.id}>
                                <dt>{pick(group.category)}</dt>
                                <dd>{pick(group.items).join(' · ')}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="resume-section" aria-labelledby="resume-langs">
                    <h2 id="resume-langs" className="resume-h2">{t.languages}</h2>
                    <p className="resume-text">{pick(profile.languages).join(' · ')}</p>
                </section>

                <div className="resume-actions resume-actions-end">
                    <a className="resume-btn resume-btn-primary" href={t.cvPath} download>
                        <FaDownload size={15} aria-hidden="true" /> {t.download}
                    </a>
                    <a className="resume-btn" href="/" onClick={handleExplore}>
                        <FaDesktop size={15} aria-hidden="true" /> {t.explore}
                    </a>
                </div>
            </main>
        </div>
    );
}

export default Resume;
