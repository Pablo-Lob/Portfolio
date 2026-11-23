export function isSpanishSpeaker() {
    const lang = navigator.language || '';
    return lang.toLowerCase().startsWith('es');
}

export function pickBy(value, lang) {
    if (value && typeof value === 'object') return value[lang];
    return value;
}

export function pickLang(value) {
    return pickBy(value, isSpanishSpeaker() ? 'es' : 'en');
}
