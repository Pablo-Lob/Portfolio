import iconFileSystem from '../assets/icons/gnome-disks.svg';
import iconTrash from '../assets/icons/user-trash.svg';
import iconFile from '../assets/icons/folder-documents.svg';
import iconGithub from '../assets/icons/github-desktop.svg';
import iconTerminal from '../assets/icons/terminal.svg';
import iconCertificates from '../assets/icons/certificates.svg';
import iconProjects from '../assets/icons/projects.svg';
import iconExperience from '../assets/icons/experience.svg';
export const fileSystem = [
    {
        id: 'fileSystem',
        name: 'File System',
        type: 'folder',
        icon: iconFileSystem,
        content: 'FileExplorer',
        isOpen: false,
        isMinimised: false,
        defaultX: 300,
        defaultY: 190,
        defaultWidth: 720,
        defaultHeight: 480
    },
    {
        id: 'trash',
        name: 'Trash',
        type: 'trash',
        icon: iconTrash,
        content: 'La papelera está vacía.',
        isOpen: false,
        isMinimised: false
    },
    {
        id: 'cv',
        name: 'CV',
        type: 'file',
        icon: iconFile,
        content: 'CVViewer',
        isOpen: true,
        isMinimised: false,
        defaultX: 100,
        defaultY: 56,
        defaultWidth: 500,
        defaultHeight: 700
    },
    {
        id: 'experience',
        name: 'Experience',
        type: 'folder',
        icon: iconExperience,
        content: 'Experience',
        isOpen: false,
        isMinimised: false,
        defaultX: 140,
        defaultY: 70,
        defaultWidth: 640,
        defaultHeight: 520
    },
    {
        id: 'projects',
        name: 'Projects',
        type: 'folder',
        icon: iconProjects,
        content: 'Projects',
        isOpen: false,
        isMinimised: false,
        defaultX: 220,
        defaultY: 130,
        defaultWidth: 820,
        defaultHeight: 520
    },
    {
        id: 'certificates',
        name: 'Certificates',
        type: 'folder',
        icon: iconCertificates,
        content: 'Certificates',
        isOpen: false,
        isMinimised: false,
        defaultX: 260,
        defaultY: 160,
        defaultWidth: 700,
        defaultHeight: 480
    },
    {
        id: 'terminal',
        name: 'Terminal',
        type: 'terminal',
        icon: iconTerminal,
        content: 'Terminal',
        isOpen: false,
        isMinimised: false,
        defaultX: 180,
        defaultY: 100,
        defaultWidth: 720,
        defaultHeight: 480
    },
    {
        id: 'github',
        name: 'Github',
        type: 'link',
        icon: iconGithub,
        url: 'https://github.com/Pablo-Lob',
        isOpen: false,
        isMinimised: false
    },
];
