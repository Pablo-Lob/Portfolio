import '../../styles/AppContent.css';
import { Suspense } from 'react';
import { appComponents } from './registry.js';

function AppContent({ file, onOpenApp }) {
    const Component = appComponents[file.content];

    if (Component) {
        return (
            <Suspense fallback={<div className="window-loading">Loading…</div>}>
                <Component onOpenWindow={onOpenApp} />
            </Suspense>
        );
    }

    return (
        <div className="temp-content">
            <h3>{file.name}</h3>
            <p>{file.content}</p>
        </div>
    );
}

export default AppContent;
