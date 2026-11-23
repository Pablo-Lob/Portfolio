import { useState, useRef } from 'react';
import '../../styles/Desktop.css';
import logo from '../../assets/images/kali_logo.webp';
import profilePhoto from '../../assets/images/foto-profile.webp';
import { fileSystem } from '../../data/fileSystem.js';
import { profile } from '../../data/profile.js';
import { skills } from '../../data/skills.js';
import { pickLang } from '../../utils/lang.js';
import { useDismiss } from '../../hooks/useDismiss.js';
import { useAppManager } from '../../hooks/useAppManager.js';
import DesktopIcon from './DesktopIcon.jsx';
import Window from './Window.jsx';
import Clock from './Clock.jsx';
import ResumeLink from '../ResumeLink.jsx';
import { FaVolumeUp, FaPowerOff, FaLock, FaRedo, FaBell, FaCog, FaNetworkWired, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaSearch, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

function DesktopShell({ onLock }) {
    const {
        apps: openWindows,
        activeId: activeWindowId,
        zOrder,
        open: openWindow,
        close: closeWindow,
        focus: focusWindow,
        toggleMinimize,
        toggleMaximize,
        handleTaskbarClick,
    } = useAppManager({ autostart: true });

    // ── Menú de aplicaciones ─────────────────────────────────────────────────
    const [showAppMenu, setShowAppMenu] = useState(false);
    const [appSearch, setAppSearch] = useState('');
    const appMenuRef = useRef(null);
    useDismiss(showAppMenu, appMenuRef, () => setShowAppMenu(false));

    const handleAppMenuOpen = (id) => {
        openWindow(id);
        setShowAppMenu(false);
        setAppSearch('');
    };

    const menuApps = fileSystem.filter(f => f.type !== 'trash');
    const filteredApps = menuApps.filter(f =>
        f.name.toLowerCase().includes(appSearch.toLowerCase())
    );

    // ── Menú de apagado ───────────────────────────────────────────────────────
    const [showPowerMenu, setShowPowerMenu] = useState(false);
    const powerRef = useRef(null);
    useDismiss(showPowerMenu, powerRef, () => setShowPowerMenu(false));

    return (
        <div className="desktop-container">
            {/* ── Taskbar ─────────────────────────────────────────────────── */}
            <div className="taskbar">
                <div className="taskbar-left">
                    {/* ── App Menu (dragon button) ─────────────────────────── */}
                    <div className="app-menu-wrap" ref={appMenuRef}>
                        <button
                            type="button"
                            className="taskbar-btn"
                            aria-label="Applications menu"
                            aria-expanded={showAppMenu}
                            onClick={() => { setShowAppMenu(v => !v); setAppSearch(''); }}
                        >
                            <img
                                className={`logo-kali${showAppMenu ? ' logo-kali-active' : ''}`}
                                src={logo}
                                alt=""
                            />
                        </button>
                        {showAppMenu && (
                            <div className="app-menu">
                                <div className="app-menu-search">
                                    <span className="app-menu-search-icon"><FaSearch size={13} /></span>
                                    <input
                                        className="app-menu-input"
                                        type="text"
                                        placeholder="Search applications..."
                                        aria-label="Search applications"
                                        value={appSearch}
                                        onChange={e => setAppSearch(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="app-menu-list">
                                    {filteredApps.map(f => (
                                        <button
                                            type="button"
                                            key={f.id}
                                            className="app-menu-item"
                                            onClick={() => handleAppMenuOpen(f.id)}
                                        >
                                            <img src={f.icon} alt="" className="app-menu-icon" />
                                            <span className="app-menu-name">{f.name}</span>
                                            {f.type === 'link' && <span className="app-menu-badge"><FaExternalLinkAlt size={10} /></span>}
                                        </button>
                                    ))}
                                    {filteredApps.length === 0 && (
                                        <div className="app-menu-empty">No results for "{appSearch}"</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="separator" />

                    <button type="button" className="terminal-icon" onClick={() => openWindow('terminal')} title="Open Terminal" aria-label="Open Terminal">
                        <span>_&gt;</span>
                    </button>
                    <div className="separator" />

                    <div className="workspaces">
                        <button type="button" className="workspace-btn active" aria-label="Workspace 1">1</button>
                        <button type="button" className="workspace-btn" aria-label="Workspace 2">2</button>
                        <button type="button" className="workspace-btn" aria-label="Workspace 3">3</button>
                        <button type="button" className="workspace-btn" aria-label="Workspace 4">4</button>
                    </div>
                    <div className="separator" />

                    <div className="taskbar-windows">
                        {openWindows.map(win => (
                            <button
                                type="button"
                                key={win.id}
                                className={`taskbar-item ${!win.isMinimised && activeWindowId === win.id ? 'active' : win.isMinimised ? '' : 'open'}`}
                                onClick={() => handleTaskbarClick(win.id)}
                                title={win.name}
                            >
                                <img src={win.icon} alt="" />
                                <span>{win.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="taskbar-right">
                    <ResumeLink className="taskbar-resume">
                        <FaFileAlt size={12} aria-hidden="true" /> Resume · Quick view
                    </ResumeLink>
                    <div className="separator" />
                    {/* Tray icons */}
                    <button type="button" className="tray-icon" title="Network" aria-label="Network"><FaNetworkWired size={13} /></button>
                    <button type="button" className="tray-icon" title="Volume" aria-label="Volume"><FaVolumeUp size={13} /></button>
                    <button type="button" className="tray-icon" title="Notifications" aria-label="Notifications"><FaBell size={13} /></button>
                    <button type="button" className="tray-icon" title="Settings" aria-label="Settings"><FaCog size={13} /></button>
                    <Clock />
                    <div className="separator" />
                    <button type="button" className="tray-icon" title="Lock screen" aria-label="Lock screen" onClick={onLock}><FaLock size={12} /></button>

                    {/* Power menu */}
                    <div className="power-wrap" ref={powerRef}>
                        <button
                            type="button"
                            className="tray-icon"
                            title="Session / Power"
                            aria-label="Session and power menu"
                            aria-expanded={showPowerMenu}
                            onClick={() => setShowPowerMenu(v => !v)}
                        >
                            <FaPowerOff size={13} />
                        </button>
                        {showPowerMenu && (
                            <div className="power-menu">
                                <button type="button" className="power-menu-item" onClick={onLock}>
                                    <FaLock size={11} /> Lock Screen
                                </button>
                                <button type="button" className="power-menu-item power-menu-danger" onClick={() => window.location.reload()}>
                                    <FaRedo size={11} /> Restart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Desktop ─────────────────────────────────────────────────── */}
            <div className="desktop-content">
                {fileSystem.map(file => (
                    <DesktopIcon key={file.id} file={file} onOpen={openWindow} />
                ))}

                {/* ── Widgets column ──────────────────────────────────────── */}
                <div className="widgets-column">
                    <div className="widget-about">
                        <img src={profilePhoto} alt={profile.name} className="widget-avatar" />
                        <div className="widget-name">{profile.name}</div>
                        <div className="widget-role">{pickLang(profile.field)}</div>
                        <div className="widget-location"><FaMapMarkerAlt size={9} /> {profile.location}</div>
                        <div className="widget-badge">
                            <span className="widget-badge-dot" />
                            {pickLang(profile.status)}
                        </div>
                        <div className="widget-contacts">
                            <a href={`mailto:${profile.email}`} title="Email" aria-label="Email"><FaEnvelope size={14} /></a>
                            <a href={profile.github.url} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><FaGithub size={14} /></a>
                            <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin size={14} /></a>
                        </div>
                    </div>

                    <div className="widget-skills">
                        {skills.map(group => (
                            <div key={group.id} className="ws-group">
                                <div className="ws-group-title">{pickLang(group.category)}</div>
                                <div className="ws-items">{pickLang(group.items).join(' · ')}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {openWindows.map(win => (
                    <Window
                        key={win.id}
                        file={win}
                        onClose={closeWindow}
                        onMinimize={toggleMinimize}
                        onMaximize={toggleMaximize}
                        onOpenWindow={openWindow}
                        onFocus={focusWindow}
                        isActive={activeWindowId === win.id}
                        order={Math.max(zOrder.indexOf(win.id), 0)}
                    />
                ))}
            </div>
        </div>
    );
}

export default DesktopShell;
