import { useState } from 'react';
import { projects } from '../../data/projects.js';
import { pickLang } from '../../utils/lang.js';
import '../../styles/Projects.css';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import BottomSheet from '../mobile/BottomSheet.jsx';
import { FaGithub, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';

function ProjectTech({ tech }) {
    return (
        <div className="project-tech">
            {tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
            ))}
        </div>
    );
}

function ProjectLinks({ project }) {
    return (
        <div className="project-links">
            {project.github ? (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-github"
                >
                    <FaGithub size={11} /> GitHub
                </a>
            ) : (
                <span className="project-btn project-btn-github project-btn-disabled">
                    <FaGithub size={11} /> Private
                </span>
            )}

            {project.live ? (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-live"
                >
                    <FaExternalLinkAlt size={10} /> Live
                </a>
            ) : null}
        </div>
    );
}

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-card-accent" />
            <div className="project-card-body">
                <div className="project-card-top">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-year">{project.year}</span>
                </div>

                <p className="project-desc">{pickLang(project.description)}</p>

                <ProjectTech tech={project.tech} />
                <ProjectLinks project={project} />
            </div>
        </div>
    );
}

function ProjectCardCompact({ project, onSelect }) {
    return (
        <button type="button" className="project-card project-card-compact" onClick={() => onSelect(project)}>
            <div className="project-card-accent" />
            <div className="project-card-body">
                <div className="project-card-top">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-year">{project.year}</span>
                </div>
                <p className="project-desc project-desc-clamp">{pickLang(project.description)}</p>
                <div className="project-card-more">
                    <span>{project.tech.slice(0, 3).join(' · ')}</span>
                    <FaChevronRight size={11} />
                </div>
            </div>
        </button>
    );
}

function ProjectSheet({ project, onClose }) {
    return (
        <BottomSheet title={project.name} onClose={onClose}>
            <div className="project-sheet">
                <span className="project-year">{project.year}</span>
                <p className="project-desc">{pickLang(project.description)}</p>
                <ProjectTech tech={project.tech} />
                <ProjectLinks project={project} />
            </div>
        </BottomSheet>
    );
}

function Projects() {
    const isMobile = useIsMobile();
    const [selected, setSelected] = useState(null);

    return (
        <div className="projects-window">
            <div className="projects-header">
                <h2 className="projects-title">Projects</h2>
                <p className="projects-subtitle">~/projects — {projects.length} repositories</p>
            </div>
            <div className="projects-grid">
                {projects.map(p => (
                    isMobile
                        ? <ProjectCardCompact key={p.id} project={p} onSelect={setSelected} />
                        : <ProjectCard key={p.id} project={p} />
                ))}
            </div>
            {isMobile && selected && <ProjectSheet project={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}

export default Projects;
