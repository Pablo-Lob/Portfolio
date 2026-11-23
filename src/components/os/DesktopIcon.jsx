import '../../styles/DesktopIcon.css';

const DesktopIcon = ({ file, onOpen }) => {
    const handleOpen = () => onOpen(file.id);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOpen();
        }
    };

    return (
        <button
            type="button"
            className="desktop-icon"
            aria-label={`Open ${file.name}`}
            onDoubleClick={handleOpen}
            onKeyDown={handleKeyDown}
        >
            <div className="icon-img-container">
                <img
                    src={file.icon}
                    alt=""
                    className="icon-img"
                    draggable="false"
                />
            </div>
            <div className="icon-name">{file.name}</div>
        </button>
    );
};

export default DesktopIcon;
