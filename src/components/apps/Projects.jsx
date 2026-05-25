import { projects } from '../../data/projects.js';
import '../../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-card-accent" style={{ background: project.accent }} />
            <div className="project-card-body">
                <div className="project-card-top">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-year">{project.year}</span>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                    {project.tech.map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                    ))}
                </div>

                <div className="project-links">
                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
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
                            rel="noreferrer"
                            className="project-btn project-btn-live"
                        >
                            <FaExternalLinkAlt size={10} /> Live
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function Projects() {
    return (
        <div className="projects-window">
            <div className="projects-header">
                <h2 className="projects-title">Projects</h2>
                <p className="projects-subtitle">~/projects — {projects.length} repositories</p>
            </div>
            <div className="projects-grid">
                {projects.map(p => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </div>
    );
}

export default Projects;
