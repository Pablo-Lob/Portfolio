import {useState} from 'react'
import './App.css'
import BootScreen from "./components/os/BootScreen.jsx";

function App() {
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    {/*
    useEffect(() => {
        const boottime = 3000;
        const fadeTime = 1000;
        if(!loading) {
            setFadeOut(true);

            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [loading]);
    */}


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
