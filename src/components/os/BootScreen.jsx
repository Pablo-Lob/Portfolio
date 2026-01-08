import {useState, useEffect} from 'react';
import '../../styles/BootScreen.css';
import logo from '../../assets/images/kali_logo.png';

function BootScreen({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const typeUser = setTimeout(() => {
            setUsername("visitor");
        }, 800);

        const typePassword = setTimeout(() => {
            setPassword("********");
        }, 800);

        const loggin = setTimeout(() => {
            onLogin();
        }, 2500);

        return () => {
            clearTimeout(typeUser);
            clearTimeout(typePassword);
            clearTimeout(loggin);
        }
    }, [onLogin]);

    return (
        <div className="bootscreen-container">
            <div className="loggin-container">
                <div className="loggin-top">
                    <div className="logo-section">
                        <img className="logo-kali" src={logo} alt="Logo kali"/>
                    </div>
                    <div className="input-section">
                        <input className="loggin-input" type="text" placeholder="Username" value={username} readOnly />
                        <input className="loggin-input" type="password" placeholder="Password" value={password} readOnly />
                    </div>
                </div>
                <div className="loggin-actions">
                    <button className="cancel-button">Cancel</button>
                    <button className="loggin-button">Login</button>
                </div>
            </div>
            <div className="autor-container">
                <h1 className="portfolio">PORTFOLIO</h1>
                <p className="autor">BY JUAN PABLO LOBATO</p>
            </div>
        </div>
    );
}

export default BootScreen;