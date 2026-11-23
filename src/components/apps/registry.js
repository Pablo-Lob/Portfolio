import { lazy } from 'react';

export const appComponents = {
    Terminal: lazy(() => import('./Terminal.jsx')),
    CVViewer: lazy(() => import('./CVViewer.jsx')),
    Certificates: lazy(() => import('./Certificates.jsx')),
    Projects: lazy(() => import('./Projects.jsx')),
    FileExplorer: lazy(() => import('./FileExplorer.jsx')),
    Experience: lazy(() => import('./Experience.jsx')),
};

export const MOBILE_APP_IDS = ['experience', 'projects', 'cv', 'certificates', 'terminal', 'fileSystem', 'github'];
export const MOBILE_DOCK_IDS = ['terminal', 'projects', 'experience', 'cv'];
