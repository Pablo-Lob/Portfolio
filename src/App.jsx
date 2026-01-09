import {useState} from 'react'
import './App.css'
import BootScreen from "./components/os/BootScreen.jsx";
import Desktop from "./components/os/Desktop.jsx";

function App() {
    const [showLoader, setShowLoader] = useState(true);

    const handleLoaderFinish = () => {
        setShowLoader(false);
    }

    return (
        <>
            <div className="app-container">
                {showLoader && <BootScreen onLogin={handleLoaderFinish} />}


                {!showLoader && <Desktop/>}

            </div>
        </>
    );
}

export default App
