import { RESUME_PATH, openResume } from '../hooks/useResumeRoute.js';

function ResumeLink({ className, children }) {
    const handleClick = (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        openResume();
    };

    return (
        <a className={className} href={RESUME_PATH} onClick={handleClick}>
            {children}
        </a>
    );
}

export default ResumeLink;
