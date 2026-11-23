import { useState, useEffect } from 'react';
import logo from '../../assets/images/kali_logo.webp';
import profilePhoto from '../../assets/images/foto-profile.webp';
import { profile } from '../../data/profile.js';
import { isSpanishSpeaker } from '../../utils/lang.js';
import Clock from '../os/Clock.jsx';

const HOLD_MS = 700;

function LockScreen({ onDone }) {
    const [leaving, setLeaving] = useState(false);
    const spanish = isSpanishSpeaker();

    useEffect(() => {
        const t = setTimeout(() => setLeaving(true), HOLD_MS);
        return () => clearTimeout(t);
    }, []);

    return (
        <button
            type="button"
            className={`m-lock${leaving ? ' m-lock-leaving' : ''}`}
            onClick={onDone}
            onAnimationEnd={leaving ? onDone : undefined}
            aria-label={spanish ? 'Entrar' : 'Enter'}
        >
            <img src={logo} alt="" className="m-lock-logo" />
            <Clock />
            <img src={profilePhoto} alt="" className="m-lock-avatar" width="72" height="72" />
            <span className="m-lock-name">{profile.name}</span>
            <span className="m-lock-hint">{spanish ? 'Toca para entrar' : 'Tap to enter'}</span>
        </button>
    );
}

export default LockScreen;
