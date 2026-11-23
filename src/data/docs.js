import { profile } from './profile.js';
import { experience } from './experience.js';
import { pickLang } from '../utils/lang.js';
import { formatRange } from '../utils/format.js';

export const readmeMd = [
    `# ${profile.name}`,
    '',
    pickLang(profile.role),
    `${profile.location} · ${pickLang(profile.status)}`,
    '',
    '## Quick links',
    '- cv/            → Curriculum Vitae (ES & EN)',
    '- certificates/  → Certificates',
    '- projects/      → Projects',
    '- experience.md  → Work experience',
    '',
    '## Contact',
    `- Email:    ${profile.email}`,
    `- Web:      ${profile.website}`,
    `- GitHub:   ${profile.github.label}`,
    `- LinkedIn: ${profile.linkedin.label}`,
    '',
    'Type `help` in the Terminal for more info.',
].join('\n');

export const experienceMd = [
    '# Experience',
    '',
    ...experience.flatMap(item => [
        `## ${item.company} — ${pickLang(item.role)} (${item.team})`,
        `${item.current ? 'Current · ' : ''}${formatRange(item)}`,
        pickLang(item.description),
        '',
    ]),
    '# Achievements',
    '',
    ...profile.achievements.flatMap(a => [`- ${pickLang(a.title)}`, `  ${pickLang(a.description)}`]),
].join('\n');
