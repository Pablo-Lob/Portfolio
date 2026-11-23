import { useState, useEffect, useRef } from 'react';
import '../../styles/Terminal.css';
import profilePhoto from '../../assets/images/foto-profile.webp';
import { profile } from '../../data/profile.js';
import { skills } from '../../data/skills.js';
import { projects } from '../../data/projects.js';
import { experience } from '../../data/experience.js';
import { readmeMd, experienceMd } from '../../data/docs.js';
import { pickLang } from '../../utils/lang.js';
import { formatRange } from '../../utils/format.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';

const USER = 'visitor';
const HOST = 'portfolio';

const ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '{': '&#123;',
    '}': '&#125;',
};

function esc(value) {
    return String(value).replace(/[&<>"'{}]/g, ch => ESCAPES[ch]);
}

const SYSINFO = [
    `{g}${USER}{w}@{g}${HOST}`,
    '─────────────────────────────────',
    `{c}OS{w}:         KaliOS Portfolio Edition`,
    `{c}Host{w}:       ${esc(profile.website)}`,
    `{c}Shell{w}:      bash 5.2.15`,
    `{c}Stack{w}:      Java · Spring Boot · React 19`,
    `{c}DE{w}:         GNOME (simulated)`,
    `{c}GitHub{w}:     ${esc(profile.github.label)}`,
    `{c}Email{w}:      ${esc(profile.email)}`,
    `{c}Status{w}:     ${esc(profile.statusShort)}`,
    '',
    '  {r}●{w} {y}●{w} {g}●{w}',
];

const ABOUT = [
    `{g}> About ${esc(profile.name)}{w}`,
    '',
    `  ${esc(pickLang(profile.role))}`,
    `  Based in ${esc(profile.location)}.`,
    '',
    '  Currently an intern at {y}Repsol{w} — Infrastructure, I&amp;OaaS team',
    '  (Sep 2026 – Feb 2027).',
    '',
    '  Type {y}experience{w}, {y}skills{w} or {y}projects{w} to know more.',
];

const SKILLS = [
    '{g}> Technical Skills{w}',
    '',
    ...skills.flatMap(group => [
        `  {c}${esc(pickLang(group.category))}{w}`,
        `    ${esc(pickLang(group.items).join(' · '))}`,
    ]),
];

const EXPERIENCE = [
    '{g}> Experience{w}',
    '',
    ...experience.flatMap(item => [
        `  {y}${esc(item.company)}{w} — ${esc(pickLang(item.role))} (${esc(item.team)})`,
        `    ${item.current ? '{g}Current{w} · ' : ''}${esc(formatRange(item))}`,
        `    ${esc(pickLang(item.description))}`,
        '',
    ]),
    '{g}> Achievements{w}',
    '',
    ...profile.achievements.flatMap(a => [
        `  {y}${esc(pickLang(a.title))}{w}`,
        `    ${esc(pickLang(a.description))}`,
    ]),
];

const PROJECTS = [
    '{g}> Projects{w}',
    '',
    ...projects.map(p => `  {y}${esc(p.name.padEnd(34))}{w}${esc(p.tech.slice(0, 3).join(' · '))}`),
    '',
    `  See more at: {c}${esc(profile.github.label)}{w}`,
];

const CONTACT = [
    '{g}> Contact{w}',
    '',
    `  Email     ${esc(profile.email)}`,
    `  Web       ${esc(profile.website)}`,
    `  GitHub    ${esc(profile.github.label)}`,
    `  LinkedIn  ${esc(profile.linkedin.label)}`,
    '',
    '  Feel free to reach out!',
];

const HELP_INNER = 46;
const HELP_ROWS = [
    ['about', 'About me'],
    ['skills', 'Technical skills'],
    ['experience', 'Work experience (alias: work)'],
    ['projects', 'My projects'],
    ['contact', 'Contact information'],
    ['cv', 'Open my CV'],
    ['neofetch', 'System info'],
    ['ls', 'List portfolio files'],
    ['cat <file>', 'Print README.md / experience.md'],
    ['whoami', 'Current user'],
    ['date', 'Current date & time'],
    ['echo <msg>', 'Print a message'],
    ['clear', 'Clear terminal'],
];

function helpRow([cmd, desc]) {
    return `{g}│{w}  {y}${esc(cmd.padEnd(11))}{w}— ${esc(desc.padEnd(HELP_INNER - 15))}{g}│{w}`;
}

const HELP = [
    `{g}┌─ Available Commands ${'─'.repeat(HELP_INNER - 21)}┐{w}`,
    ...HELP_ROWS.map(helpRow),
    `{g}└${'─'.repeat(HELP_INNER)}┘{w}`,
];

const LS_OUTPUT = [
    'total 5',
    '{c}drwxr-xr-x{w}  cv/',
    '{c}drwxr-xr-x{w}  certificates/',
    '{c}drwxr-xr-x{w}  projects/',
    '{g}-rw-r--r--{w}  README.md',
    '{g}-rw-r--r--{w}  experience.md',
];

const COMMANDS = [
    'help', 'about', 'skills', 'experience', 'work', 'projects', 'contact', 'cv', 'neofetch',
    'ls', 'cat', 'whoami', 'date', 'pwd', 'echo', 'ping', 'uname', 'clear', 'exit',
];

const MOBILE_CHIPS = ['help', 'experience', 'projects', 'contact', 'neofetch'];

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

        case 'experience':
        case 'work':
            return EXPERIENCE;

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
        case 'dir':
            return LS_OUTPUT;

        case 'whoami':
            return [`{g}${USER}{w}  (authenticated guest)`];

        case 'date':
            return [esc(new Date().toString())];

        case 'pwd':
            return [`/home/${USER}`];

        case 'uname':
            return ['Linux portfolio 6.6.9-amd64 #1 SMP PREEMPT Kali 6.6.9 x86_64 GNU/Linux'];

        case 'echo':
            return [esc(args.join(' '))];

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
                '  Just kidding :)',
                "  I'm a developer, not a script kiddie.",
            ];

        case 'rm':
            return ['{r}Nice try. This portfolio cannot be deleted.{w}'];

        case 'exit':
        case 'quit':
            return ["{y}There's no escaping this portfolio. You're here forever.{w}"];

        case 'cat':
            if (args[0] === 'README.md') return esc(readmeMd).split('\n');
            if (args[0] === 'experience.md') return esc(experienceMd).split('\n');
            return args[0]
                ? [`{r}cat: ${esc(args[0])}: No such file or directory{w}`]
                : ['{r}cat: missing file operand{w}'];

        case 'ping': {
            const host = esc(args[0] || 'localhost');
            return [
                `PING ${host} — 64 bytes`,
                `Reply from ${host}: time=1ms TTL=64`,
                `Reply from ${host}: time=1ms TTL=64`,
                '{g}Connection established.{w}',
            ];
        }

        default:
            return [`{r}Command not found: ${esc(cmd)}.{w} Type {y}help{w} for available commands.`];
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

function Prompt() {
    return (
        <>
            <span className="t-green">{USER}@{HOST}</span>:<span className="t-cyan">~</span>$
        </>
    );
}

function Terminal({ onOpenWindow }) {
    const isMobile = useIsMobile();
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

    const runCommand = (raw) => {
        let cleared = false;

        const lines = processCommand(raw, (action) => {
            if (action === 'clear') cleared = true;
            else if (action === 'openCV') onOpenWindow?.('cv');
        });

        if (cleared) {
            setHistory([]);
        } else {
            const outputLines = lines.map(t => ({ type: 'output', text: t }));
            setHistory(prev => [...prev, { type: 'prompt', text: raw }, ...outputLines, { type: 'output', text: '' }]);
        }

        if (raw.trim()) {
            setCmdHistory(prev => [raw, ...prev]);
        }
        setHistoryIdx(-1);
        setInput('');
    };

    const submit = () => runCommand(input);

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
            if (!input) return;
            const match = COMMANDS.find(c => c.startsWith(input));
            if (match) setInput(match);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    return (
        <div
            className={`terminal-window${isMobile ? ' terminal-mobile' : ''}`}
            onClick={isMobile ? undefined : () => inputRef.current?.focus()}
        >
            <div className="terminal-body" ref={bodyRef}>
                {history.map((entry, i) => (
                    <div key={i} className="t-entry">
                        {entry.type === 'prompt' && (
                            <div className="t-prompt-line">
                                <Prompt />
                                <span className="t-cmd-text"> {entry.text}</span>
                            </div>
                        )}
                        {entry.type === 'output' && <TerminalLine text={entry.text} />}
                    </div>
                ))}

                {/* Línea de input activa */}
                <div className="t-prompt-line t-active-line">
                    <Prompt />
                    <span className="t-input-wrapper">
                        <span className="t-input-ghost"> {input}</span>
                        <input
                            ref={inputRef}
                            className="t-input"
                            aria-label="Terminal input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus={!isMobile}
                            enterKeyHint="send"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <span className="t-cursor" />
                    </span>
                </div>
            </div>

            {isMobile && (
                <div className="t-chips" role="toolbar" aria-label="Quick commands">
                    {MOBILE_CHIPS.map(cmd => (
                        <button key={cmd} type="button" className="t-chip" onClick={() => runCommand(cmd)}>
                            {cmd}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Terminal;
