import iconFileSystem from '../assets/icons/gnome-disks.svg';
import iconTrash from '../assets/icons/user-trash.svg';
import iconFile from '../assets/icons/folder-documents.svg';
import iconGithub from '../assets/icons/github-desktop.svg';

export const fileSystem = [
    {
        id: 'fileSystem',
        name: 'File System',
        type: 'folder',
        icon: iconFileSystem,
        content: 'FileExplorer',
        isOpen: false,
        isMinimised: false
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
        name: 'CV.pdf',
        type: 'file',
        icon: iconFile,
        content: '/files/CV Juan Pablo Lobato González.pdf',
        isOpen: true,
        isMinimised: false,
        defaultX: 725,           // Posición X
        defaultY: 120,           // Posición Y
        defaultWidth: 500,      // Ancho inicial
        defaultHeight: 800      // Alto inicial
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