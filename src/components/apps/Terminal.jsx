import { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/Terminal.css';
import profilePhoto from '../../assets/images/foto-profile.jpg';

const USER = 'visitor';
const HOST = 'portfolio';

const NEOFETCH = [
    '                          ',
    '   ██╗  ██╗ █████╗ ██╗   ',
    '   ██║ ██╔╝██╔══██╗██║   ',
    '   █████╔╝ ███████║██║   ',
    '   ██╔═██╗ ██╔══██║██║   ',
    '   ██║  ██╗██║  ██║██║   ',
    '   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ',
    '                          ',
];

const SYSINFO = [
    `{g}${USER}{w}@{g}${HOST}`,
    '─────────────────────────────────',
    `{c}OS{w}:         KaliOS Portfolio Edition`,
    `{c}Host{w}:       portfolio.dev`,
    `{c}Shell{w}:      bash 5.2.15`,
    `{c}Stack{w}:      Java · Spring Boot · React 19`,
    `{c}DE{w}:         GNOME (simulated)`,
    `{c}GitHub{w}:     github.com/Pablo-Lob`,
    `{c}Email{w}:      juanpablolobato1@gmail.com`,
    `{c}Status{w}:     Open to work 🟢`,
    '',
    '  🔴 🟡 🟢',
];

const ABOUT = [
    '{g}> About Juan Pablo Lobato González{w}',
    '',
    '  Full-stack developer and computer science student.',
    '  Passionate about security, UI/UX, and building',
    '  projects that merge aesthetic design with solid code.',
    '',
    '  Currently based in Spain 🇪🇸',
    '  Available for freelance & internships.',
    '',
    '  Type {y}skills{w} or {y}projects{w} to know more.',
];

const SKILLS = [
    '{g}> Technical Skills{w}',
    '',
    '  {c}Frontend{w}   React · JavaScript · HTML/CSS',
    '  {c}Backend{w}    Java · Spring Boot · SQL',
    '  {c}Security{w}   Cisco · Kali Linux · CTF basics',
    '  {c}Tools{w}      Git/GitHub · Docker · Figma',
    '  {c}Servers{w}    Windows Server · Ubuntu Server',
];

const PROJECTS = [
    '{g}> Projects{w}',
    '',
    '  {y}Web a medida{w}      ─  CMS with PHP API + React 19',
    '  {y}Infraestructura Red{w} ─  OSPF/BGP/VPN with Cisco Packet Tracer',
    '  {y}HobbiesApp{w}        ─  UX/Figma university project',
    '  {y}Portfolio{w}         ─  This very OS-style portfolio',
    '',
    '  See more at: {c}github.com/Pablo-Lob{w}',
];

const CONTACT = [
    '{g}> Contact{w}',
    '',
    '  📧  juanpablolobato1@gmail.com',
    '  🐙  github.com/Pablo-Lob',
    '  💼  linkedin.com/in/pablo-lobato-gonzález-536b67221',
    '',
    '  Feel free to reach out!',
];

const HELP = [
    '{g}┌─ Available Commands ────────────────────────┐{w}',
    '{g}│{w}  {y}about{w}      — About me                       {g}│{w}',
    '{g}│{w}  {y}skills{w}     — Technical skills               {g}│{w}',
    '{g}│{w}  {y}projects{w}   — My projects                    {g}│{w}',
    '{g}│{w}  {y}contact{w}    — Contact information            {g}│{w}',
    '{g}│{w}  {y}cv{w}         — Open my CV                     {g}│{w}',
    '{g}│{w}  {y}neofetch{w}   — System info                    {g}│{w}',
    '{g}│{w}  {y}ls{w}         — List portfolio files           {g}│{w}',
    '{g}│{w}  {y}whoami{w}     — Current user                   {g}│{w}',
    '{g}│{w}  {y}date{w}       — Current date & time            {g}│{w}',
    '{g}│{w}  {y}echo <msg>{w} — Print a message                {g}│{w}',
    '{g}│{w}  {y}clear{w}      — Clear terminal                 {g}│{w}',
    '{g}└────────────────────────────────────────────┘{w}',
];

const LS_OUTPUT = [
    'total 4',
    '{c}drwxr-xr-x{w}  cv/',
    '{c}drwxr-xr-x{w}  certificates/',
    '{y}-rw-r--r--{w}  CV_ES.pdf',
    '{y}-rw-r--r--{w}  CV_EN.pdf',
    '{g}-rw-r--r--{w}  README.md',
];

const WELCOME = [
    '{g}Kali GNU/Linux Rolling{w}',
    `Last login: ${new Date().toDateString()} on tty1`,
    '',
    'Welcome, {g}visitor{w}. Type {y}help{w} for available commands.',
    '',
];

function colorize(text) {
    return text
        .replace(/\{g\}/g, '<span class="t-green">')
        .replace(/\{y\}/g, '<span class="t-yellow">')
        .replace(/\{c\}/g, '<span class="t-cyan">')
        .replace(/\{r\}/g, '<span class="t-red">')
        .replace(/\{w\}/g, '</span>');
}

function processCommand(raw, onAction) {
    const trimmed = raw.trim();
    if (!trimmed) return [];

    const [cmd, ...args] = trimmed.split(/\s+/);

    switch (cmd.toLowerCase()) {
        case 'help':
            return HELP;

        case 'about':
            return ABOUT;

        case 'skills':
            return SKILLS;

        case 'projects':
            return PROJECTS;

        case 'contact':
            return CONTACT;

        case 'neofetch': {
            const infoHtml = SYSINFO.map(l => `<div>${colorize(l)}</div>`).join('');
            return [`<div class="t-nf-block">
                <img src="${profilePhoto}" class="t-nf-photo" alt="profile" />
                <div class="t-nf-info">${infoHtml}</div>
            </div>`];
        }

        case 'ls':
        case 'ls -la':
        case 'dir':
            return LS_OUTPUT;

        case 'whoami':
            return [`{g}${USER}{w}  (authenticated guest)`];

        case 'date':
            return [new Date().toString()];

        case 'pwd':
            return [`/home/${USER}`];

        case 'uname':
        case 'uname -a':
            return ['Linux portfolio 6.6.9-amd64 #1 SMP PREEMPT Kali 6.6.9 x86_64 GNU/Linux'];

        case 'echo':
            return [args.join(' ') || ''];

        case 'cv':
            onAction('openCV');
            return ['{g}>>{w} Opening CV...'];

        case 'clear':
            onAction('clear');
            return [];

        case 'sudo':
            return ['{r}visitor is not in the sudoers file. This incident will be reported.{w}'];

        case 'hack':
        case 'hacking':
            return [
                '{r}Initiating hack sequence...{w}',
                '',
                '  Just kidding 😄',
                "  I'm a developer, not a script kiddie.",
            ];

        case 'rm':
        case 'rm -rf':
        case 'rm -rf /':
            return ['{r}Nice try. This portfolio cannot be deleted.{w}'];

        case 'exit':
        case 'quit':
            return ["{y}There's no escaping this portfolio. You're here forever.{w} 😄"];

        case 'cat':
            if (args[0] === 'README.md') {
                return [
                    '# Juan Pablo Lobato — Portfolio',
                    '',
                    'A Kali-Linux-themed interactive OS portfolio.',
                    'Built with React 19 + Vite.',
                    '',
                    'Type `help` to explore.',
                ];
            }
            return args[0]
                ? [`{r}cat: ${args[0]}: No such file or directory{w}`]
                : ['{r}cat: missing file operand{w}'];

        case 'ping':
            return [
                `PING ${args[0] || 'localhost'} — 64 bytes`,
                'Reply from portfolio.dev: time=1ms TTL=64',
                'Reply from portfolio.dev: time=1ms TTL=64',
                '{g}Connection established.{w}',
            ];

        default:
            return [`{r}Command not found: ${cmd}.{w} Type {y}help{w} for available commands.`];
    }
}

function TerminalLine({ text }) {
    return (
        <div
            className="t-line"
            dangerouslySetInnerHTML={{ __html: colorize(text) }}
        />
    );
}

function Terminal({ onOpenCV }) {
    const [history, setHistory] = useState(() =>
        WELCOME.map(line => ({ type: 'output', text: line }))
    );
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);

    const bodyRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleAction = useCallback((action) => {
        if (action === 'clear') {
            setHistory([]);
        } else if (action === 'openCV') {
            onOpenCV?.();
        }
    }, [onOpenCV]);

    const submit = () => {
        const raw = input;
        const promptLine = { type: 'prompt', text: raw };

        const lines = processCommand(raw, handleAction);
        const outputLines = lines.map(t => ({ type: 'output', text: t }));

        if (raw.trim().toLowerCase() === 'clear') {
            setHistory([]);
        } else {
            setHistory(prev => [...prev, promptLine, ...outputLines, { type: 'output', text: '' }]);
        }

        if (raw.trim()) {
            setCmdHistory(prev => [raw, ...prev]);
        }
        setHistoryIdx(-1);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submit();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const idx = Math.min(historyIdx + 1, cmdHistory.length - 1);
            setHistoryIdx(idx);
            setInput(cmdHistory[idx] ?? '');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const idx = Math.max(historyIdx - 1, -1);
            setHistoryIdx(idx);
            setInput(idx === -1 ? '' : cmdHistory[idx]);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const cmds = ['help','about','skills','projects','contact','cv','neofetch','ls','whoami','date','echo','clear','ping','uname','cat'];
            const match = cmds.find(c => c.startsWith(input));
            if (match) setInput(match);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    const PROMPT = `<span class="t-green">${USER}@${HOST}</span>:<span class="t-cyan">~</span>$`;

    return (
        <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
            <div className="terminal-body" ref={bodyRef}>
                {history.map((entry, i) => (
                    <div key={i} className="t-entry">
                        {entry.type === 'prompt' && (
                            <div className="t-prompt-line">
                                <span dangerouslySetInnerHTML={{ __html: PROMPT }} />
                                <span className="t-cmd-text"> {entry.text}</span>
                            </div>
                        )}
                        {entry.type === 'output' && <TerminalLine text={entry.text} />}
                    </div>
                ))}

                {/* Línea de input activa */}
                <div className="t-prompt-line t-active-line">
                    <span dangerouslySetInnerHTML={{ __html: PROMPT }} />
                    <span className="t-input-wrapper">
                        <span className="t-input-ghost"> {input}</span>
                        <input
                            ref={inputRef}
                            className="t-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <span className="t-cursor" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Terminal;
