import { useState, lazy, Suspense } from 'react';
import './App.css';
import { useIsMobile } from './hooks/useIsMobile.js';
import { useResumeRoute } from './hooks/useResumeRoute.js';
import { BOOTED_KEY, readStorage, writeStorage } from './utils/storage.js';

const BootScreen = lazy(() => import('./components/os/BootScreen.jsx'));
const DesktopShell = lazy(() => import('./components/os/DesktopShell.jsx'));
const MobileShell = lazy(() => import('./components/mobile/MobileShell.jsx'));
const Resume = lazy(() => import('./components/resume/Resume.jsx'));

function App() {
    const isMobile = useIsMobile();
    const resumeActive = useResumeRoute();
    const [showLoader, setShowLoader] = useState(() => !readStorage(sessionStorage, BOOTED_KEY));

    const handleLogin = () => {
        writeStorage(sessionStorage, BOOTED_KEY, '1');
        setShowLoader(false);
    };

    return (
        <div className="app-container">
            <Suspense fallback={null}>
                {resumeActive && <Resume />}
                {!resumeActive && isMobile && <MobileShell />}
                {!resumeActive && !isMobile && showLoader && <BootScreen onLogin={handleLogin} />}
                {!resumeActive && !isMobile && !showLoader && <DesktopShell onLock={() => setShowLoader(true)} />}
            </Suspense>
        </div>
    );
}

export default App;
