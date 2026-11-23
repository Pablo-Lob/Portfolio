import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFilePdf, FaFileAlt, FaLink, FaChevronRight, FaChevronLeft, FaChevronDown, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import '../../styles/FileExplorer.css';
import { certificates } from '../../data/certificates.js';
import { projects } from '../../data/projects.js';
import { readmeMd, experienceMd } from '../../data/docs.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import { pickLang } from '../../utils/lang.js';

// ── Árbol virtual del sistema de archivos ───────────────────────────────────
const VIRTUAL_FS = {
    id: 'root',
    name: 'visitor',
    type: 'folder',
    children: [
        {
            id: 'cv-folder',
            name: 'cv',
            type: 'folder',
            children: [
                { id: 'cv-es', name: 'CV_ES.pdf',  type: 'pdf', url: '/files/cv/CV_ES.pdf' },
                { id: 'cv-en', name: 'CV_EN.pdf',  type: 'pdf', url: '/files/cv/CV_EN.pdf' },
            ],
        },
        {
            id: 'certs-folder',
            name: 'certificates',
            type: 'folder',
            children: certificates.map(c => ({
                id: c.id,
                name: c.title + '.pdf',
                type: 'pdf',
                url: c.file,
            })),
        },
        {
            id: 'projects-folder',
            name: 'projects',
            type: 'folder',
            children: projects.map(p => {
                const url = p.live || p.github;
                return {
                    id:   p.id,
                    name: p.name.replace(/\s+/g, '_'),
                    type: url ? 'link' : 'text',
                    url,
                    desc: pickLang(p.description),
                    content: [p.name, '', pickLang(p.description), '', `Stack: ${p.tech.join(', ')}`].join('\n'),
                };
            }),
        },
        {
            id: 'readme',
            name: 'README.md',
            type: 'text',
            content: readmeMd,
        },
        {
            id: 'experience-md',
            name: 'experience.md',
            type: 'text',
            content: experienceMd,
        },
    ],
};

function findPath(node, id, trail = []) {
    const path = [...trail, node.name];
    if (node.id === id) return path;
    for (const child of node.children ?? []) {
        const found = findPath(child, id, path);
        if (found) return found;
    }
    return null;
}

// ── Ícono por tipo ──────────────────────────────────────────────────────────
function NodeIcon({ node, open }) {
    if (node.type === 'folder')  return open ? <FaFolderOpen /> : <FaFolder />;
    if (node.type === 'pdf')     return <FaFilePdf />;
    if (node.type === 'link')    return <FaLink />;
    return <FaFileAlt />;
}

// ── Fila del árbol lateral ──────────────────────────────────────────────────
function TreeRow({ node, depth, selectedId, onSelect, openFolders, toggleFolder }) {
    const isFolder = node.type === 'folder';
    const isOpen   = openFolders.has(node.id);
    const isActive = selectedId === node.id;

    return (
        <>
            <button
                type="button"
                className={`fe-tree-row ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: 10 + depth * 14 }}
                aria-expanded={isFolder ? isOpen : undefined}
                onClick={() => { onSelect(node); if (isFolder) toggleFolder(node.id); }}
            >
                {isFolder && (
                    <span className="fe-chevron">
                        {isOpen ? <FaChevronDown size={9} /> : <FaChevronRight size={9} />}
                    </span>
                )}
                <span className="fe-tree-icon"><NodeIcon node={node} open={isOpen} /></span>
                <span className="fe-tree-name">{node.name}</span>
            </button>

            {isFolder && isOpen && node.children?.map(child => (
                <TreeRow
                    key={child.id}
                    node={child}
                    depth={depth + 1}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    openFolders={openFolders}
                    toggleFolder={toggleFolder}
                />
            ))}
        </>
    );
}

// ── Panel de previsualización ───────────────────────────────────────────────
function Preview({ node }) {
    const isMobile = useIsMobile();

    if (!node) return (
        <div className="fe-preview-empty">
            <FaFolderOpen size={40} />
            <p>Select a file to preview</p>
        </div>
    );

    if (node.type === 'folder') return (
        <div className="fe-preview-empty">
            <FaFolderOpen size={40} />
            <p className="fe-preview-title">{node.name}/</p>
            <p>{node.children?.length ?? 0} items</p>
        </div>
    );

    if (node.type === 'pdf' && isMobile) return (
        <div className="fe-preview-empty">
            <FaFilePdf size={40} />
            <p className="fe-preview-title">{node.name}</p>
            <a href={node.url} target="_blank" rel="noopener noreferrer" className="fe-open-btn">
                Open <FaExternalLinkAlt size={10} />
            </a>
            <a href={node.url} download className="fe-open-btn fe-open-btn-secondary">
                Download <FaDownload size={10} />
            </a>
        </div>
    );

    if (node.type === 'pdf') return (
        <iframe src={node.url} title={node.name} className="fe-iframe" />
    );

    if (node.type === 'link') return (
        <div className="fe-preview-empty">
            <FaLink size={32} />
            <p className="fe-preview-title">{node.name.replace(/_/g, ' ')}</p>
            {node.desc && <p className="fe-preview-desc">{node.desc}</p>}
            <a href={node.url} target="_blank" rel="noopener noreferrer" className="fe-open-btn">
                Open <FaExternalLinkAlt size={10} />
            </a>
        </div>
    );

    if (node.type === 'text') return (
        <pre className="fe-text-preview">{node.content}</pre>
    );

    return null;
}

// ── Componente principal ────────────────────────────────────────────────────
function FileExplorer() {
    const [selected, setSelected] = useState(null);
    const [view, setView] = useState('tree');
    const [openFolders, setOpenFolders] = useState(new Set(['root']));

    const toggleFolder = id =>
        setOpenFolders(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const handleSelect = (node) => {
        setSelected(node);
        if (node.type !== 'folder') setView('preview');
    };

    const path = selected ? findPath(VIRTUAL_FS, selected.id) : null;

    return (
        <div className="fe-container" data-view={view}>
            {/* Sidebar */}
            <div className="fe-sidebar">
                <div className="fe-sidebar-header">
                    <span>~/home/visitor</span>
                </div>
                <div className="fe-tree">
                    <TreeRow
                        node={VIRTUAL_FS}
                        depth={0}
                        selectedId={selected?.id}
                        onSelect={handleSelect}
                        openFolders={openFolders}
                        toggleFolder={toggleFolder}
                    />
                </div>
            </div>

            {/* Preview panel */}
            <div className="fe-preview">
                <div className="fe-preview-header">
                    <button type="button" className="fe-back" onClick={() => setView('tree')} aria-label="Back to file list">
                        <FaChevronLeft size={12} />
                    </button>
                    <span className="fe-preview-path">
                        <span className="fe-preview-name">{selected ? selected.name : 'No selection'}</span>
                        {path && <span className="fe-breadcrumb">~/{path.join('/')}</span>}
                    </span>
                </div>
                <Preview node={selected} />
            </div>
        </div>
    );
}

export default FileExplorer;
