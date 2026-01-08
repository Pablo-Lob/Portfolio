import {useState} from 'react'
import './App.css'
import BootScreen from "./components/os/BootScreen.jsx";

function App() {
    const [showLoader, setShowLoader] = useState(true);

    return (
        <>
            <div className="app-container">
                {showLoader && <BootScreen/>}


                {!showLoader && <Desktop />}

            </div>
        </>
    );
}

export default App
