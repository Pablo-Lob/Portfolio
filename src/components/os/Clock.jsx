import { useState, useEffect } from 'react';

function formatTime(date) {
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`;
}

function Clock() {
    const [time, setTime] = useState(() => formatTime(new Date()));

    useEffect(() => {
        const t = setInterval(() => setTime(formatTime(new Date())), 1000);
        return () => clearInterval(t);
    }, []);

    return <div className="clock">{time}</div>;
}

export default Clock;
