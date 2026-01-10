import React from 'react';
import '../../styles/DesktopIcon.css';

const DesktopIcon = ({file, onOpen}) => {
    const handleDoubleClick = () => {
        onOpen(file.id);
    };

    return(
        <div
            className="desktop-icon"
            onDoubleClick={handleDoubleClick}
            // Añadimos soporte para pantallas táctiles (tap simple)
            onClick={(e) => e.detail === 2 ? handleDoubleClick() : null}
        >
            {/* Lo meto en una div para poder controlar con el flex*/}
            <div className="icon-img-container">
                <img
                    src={file.icon}
                    alt={file.name}
                    className="icon-img"
                    draggable="false"
                />
            </div>
            <div className="icon-name">{file.name}</div>
        </div>
    );
};

export default DesktopIcon;