import { isSpanishSpeaker } from './lang.js';

const MONTHS = {
    es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function currentLang() {
    return isSpanishSpeaker() ? 'es' : 'en';
}

export function formatMonth(yearMonth, lang = currentLang()) {
    const [year, month] = yearMonth.split('-').map(Number);
    return `${MONTHS[lang][month - 1]} ${year}`;
}

export function formatRange(item, lang = currentLang()) {
    return `${formatMonth(item.start, lang)} – ${formatMonth(item.end, lang)}`;
}
