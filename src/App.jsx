import { useState } from 'react';
import './App.css';
import BootScreen from './components/os/BootScreen.jsx';
import Desktop from './components/os/Desktop.jsx';
import MobileOverlay from './components/os/MobileOverlay.jsx';

function App() {
    const [showLoader, setShowLoader] = useState(true);

    return (
        <div className="app-container">
            <MobileOverlay />
            {showLoader && <BootScreen onLogin={() => setShowLoader(false)} />}
            {!showLoader && <Desktop onLock={() => setShowLoader(true)} />}
        </div>
    );
}

export default App;
