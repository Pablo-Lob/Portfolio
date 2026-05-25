import { useState, useEffect, useRef } from 'react';
import '../../styles/BootScreen.css';
import logo from '../../assets/images/kali_logo.png';
import profilePhoto from '../../assets/images/foto-profile.jpg';

function BootScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [typingField, setTypingField] = useState(null); // 'user' | 'pass' | null

    const onLoginRef = useRef(onLogin);
    onLoginRef.current = onLogin;

    useEffect(() => {
        const USER_TEXT = 'visitor';
        const PASS_TEXT = '●●●●●●●●';
        const timers    = [];
        const intervals = [];

        // Fase 1: escribe username letra a letra
        const t1 = setTimeout(() => {
            setTypingField('user');
            let i = 0;
            const iv1 = setInterval(() => {
                i++;
                setUsername(USER_TEXT.slice(0, i));
                if (i >= USER_TEXT.length) {
                    clearInterval(iv1);
                    setTypingField(null);

                    // Fase 2: pausa y escribe password
                    const t2 = setTimeout(() => {
                        setTypingField('pass');
                        let j = 0;
                        const iv2 = setInterval(() => {
                            j++;
                            setPassword(PASS_TEXT.slice(0, j));
                            if (j >= PASS_TEXT.length) {
                                clearInterval(iv2);
                                setTypingField(null);

                                // Fase 3: login
                                const t3 = setTimeout(() => onLoginRef.current(), 450);
                                timers.push(t3);
                            }
                        }, 65);
                        intervals.push(iv2);
                    }, 220);
                    timers.push(t2);
                }
            }, 80);
            intervals.push(iv1);
        }, 550);
        timers.push(t1);

        return () => {
            timers.forEach(clearTimeout);
            intervals.forEach(clearInterval);
        };
    }, []);

    return (
        <div className="bootscreen-container">
            <div className="loggin-container">
                <div className="loggin-top">

                    <div className="logo-section">
                        <img className="boot-avatar" src={profilePhoto} alt="Profile" />
                        <img className="boot-kali-mini" src={logo} alt="Kali" />
                    </div>

                    <div className="input-section">
                        <div className="loggin-input boot-display-input">
                            {!username && typingField !== 'user'
                                ? <span className="boot-placeholder">Username</span>
                                : <span>{username}</span>
                            }
                            {typingField === 'user' && <span className="boot-cursor">▌</span>}
                        </div>

                        <div className="loggin-input boot-display-input">
                            {!password && typingField !== 'pass'
                                ? <span className="boot-placeholder">Password</span>
                                : <span>{password}</span>
                            }
                            {typingField === 'pass' && <span className="boot-cursor">▌</span>}
                        </div>
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
