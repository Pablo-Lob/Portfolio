import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFilePdf, FaFileAlt, FaLink, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import '../../styles/FileExplorer.css';
import { certificates } from '../../data/certificates.js';
import { projects } from '../../data/projects.js';

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
            children: projects.map(p => ({
                id:   p.id,
                name: p.name.replace(/\s+/g, '_'),
                type: 'link',
                url:  p.github || '#',
                desc: p.description,
            })),
        },
        {
            id: 'readme',
            name: 'README.md',
            type: 'text',
            content: [
                '# Juan Pablo Lobato González',
                '',
                'Full-stack developer · Spain 🇪🇸',
                '',
                '## Quick links',
                '- cv/         → Curriculum Vitae (ES & EN)',
                '- certificates/ → Professional certificates',
                '- projects/   → Source code & repos',
                '',
                '## Contact',
                '- Email:    juanpablolobato1@gmail.com',
                '- GitHub:   github.com/Pablo-Lob',
                '- LinkedIn: linkedin.com/in/pablo-lobato-gonzález-536b67221',
                '',
                'Type `help` in the Terminal for more info.',
            ].join('\n'),
        },
    ],
};

// ── Ícono por tipo ──────────────────────────────────────────────────────────
function NodeIcon({ node, open }) {
    if (node.type === 'folder')  return open ? <FaFolderOpen color="#f1c40f" /> : <FaFolder color="#f1c40f" />;
    if (node.type === 'pdf')     return <FaFilePdf color="#e74c3c" />;
    if (node.type === 'link')    return <FaLink color="#3b8eea" />;
    return <FaFileAlt color="#aaa" />;
}

// ── Fila del árbol lateral ──────────────────────────────────────────────────
function TreeRow({ node, depth, selectedId, onSelect, openFolders, toggleFolder }) {
    const isFolder = node.type === 'folder';
    const isOpen   = openFolders.has(node.id);
    const isActive = selectedId === node.id;

    return (
        <>
            <div
                className={`fe-tree-row ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: 10 + depth * 14 }}
                onClick={() => { onSelect(node); if (isFolder) toggleFolder(node.id); }}
            >
                {isFolder && (
                    <span className="fe-chevron">
                        {isOpen ? <FaChevronDown size={9} /> : <FaChevronRight size={9} />}
                    </span>
                )}
                <span className="fe-tree-icon"><NodeIcon node={node} open={isOpen} /></span>
                <span className="fe-tree-name">{node.name}</span>
            </div>

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
    if (!node) return (
        <div className="fe-preview-empty">
            <FaFolderOpen size={40} color="#333" />
            <p>Select a file to preview</p>
        </div>
    );

    if (node.type === 'folder') return (
        <div className="fe-preview-empty">
            <FaFolderOpen size={40} color="#f1c40f" />
            <p style={{ color: '#f1c40f' }}>{node.name}/</p>
            <p>{node.children?.length ?? 0} items</p>
        </div>
    );

    if (node.type === 'pdf') return (
        <iframe src={node.url} title={node.name} className="fe-iframe" />
    );

    if (node.type === 'link') return (
        <div className="fe-preview-empty">
            <FaLink size={32} color="#3b8eea" />
            <p style={{ color: '#e0e0e0', fontWeight: 600 }}>{node.name.replace(/_/g, ' ')}</p>
            {node.desc && <p style={{ color: '#888', fontSize: 12, maxWidth: 300, textAlign: 'center' }}>{node.desc}</p>}
            <a href={node.url} target="_blank" rel="noreferrer" className="fe-open-btn">
                Open on GitHub ↗
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
    const [openFolders, setOpenFolders] = useState(new Set(['root']));

    const toggleFolder = id =>
        setOpenFolders(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    return (
        <div className="fe-container">
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
                        onSelect={setSelected}
                        openFolders={openFolders}
                        toggleFolder={toggleFolder}
                    />
                </div>
            </div>

            {/* Preview panel */}
            <div className="fe-preview">
                <div className="fe-preview-header">
                    {selected ? selected.name : 'No selection'}
                </div>
                <Preview node={selected} />
            </div>
        </div>
    );
}

export default FileExplorer;
