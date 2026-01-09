import '../../styles/Desktop.css';
import logo from '../../assets/images/kali_logo.png';

function Desktop() {
    return (
        <div className="desktop-container">
            {/* Barra de tareas */}
            <div className="taskbar">

                <div className="taskbar-left">
                    <img className="logo-kali" src={logo} alt="Logo kali"/>
                    <div className="separator"></div>
                </div>



                <div className="taskbar-right">

                    <div className="clock">
                        12:35 PM
                    </div>

                    <div className="network-icon">
                        🌐︎
                    </div>

                    <div className="bell-icon">
                        🔔︎
                    </div>

                    <div className="settings-icon">
                        ⚙︎
                    </div>

                    <div className="separator"></div>

                    <diva className="padlock-icon">
                        🔒︎
                    </diva>

                    <div className="power-icon">
                        ⏻
                    </div>

                </div>

            </div>
            {/* Zona escritorio */}
            <div className="desktop-content">

            </div>
        </div>
    );

}

export default Desktop;