import Clock from '../os/Clock.jsx';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';

function StatusBar() {
    return (
        <div className="m-status" aria-hidden="true">
            <Clock />
            <div className="m-status-icons">
                <FaSignal size={11} />
                <FaWifi size={12} />
                <FaBatteryFull size={14} />
            </div>
        </div>
    );
}

export default StatusBar;
