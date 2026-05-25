import iconFileSystem from '../assets/icons/gnome-disks.svg';
import iconTrash from '../assets/icons/user-trash.svg';
import iconFile from '../assets/icons/folder-documents.svg';
import iconGithub from '../assets/icons/github-desktop.svg';
import iconTerminal from '../assets/icons/terminal.svg';
import iconCertificates from '../assets/icons/certificates.svg';
import iconProjects from '../assets/icons/projects.svg';
export const fileSystem = [
    {
        id: 'fileSystem',
        name: 'File System',
        type: 'folder',
        icon: iconFileSystem,
        content: 'FileExplorer',
        isOpen: false,
        isMinimised: false,
        defaultWidth: 720,
        defaultHeight: 480
    },
    {
        id: 'trash',
        name: 'Trash',
        type: 'trash',
        icon: iconTrash,
        content: 'TrashBin',
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
        defaultWidth: 500,
        defaultHeight: 820
    },
    {
        id: 'projects',
        name: 'Projects',
        type: 'folder',
        icon: iconProjects,
        content: 'Projects',
        isOpen: false,
        isMinimised: false,
        defaultX: 160,
        defaultY: 60,
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
        defaultX: 200,
        defaultY: 80,
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
        defaultX: 120,
        defaultY: 70,
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
