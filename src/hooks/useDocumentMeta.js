import { useEffect } from 'react';

function upsert(selector, create, attribute, value) {
    let element = document.head.querySelector(selector);
    const existed = Boolean(element);
    if (!element) {
        element = create();
        document.head.appendChild(element);
    }
    const previous = element.getAttribute(attribute);
    element.setAttribute(attribute, value);
    return () => {
        if (existed) element.setAttribute(attribute, previous);
        else element.remove();
    };
}

function meta(attr, key) {
    return () => {
        const element = document.createElement('meta');
        element.setAttribute(attr, key);
        return element;
    };
}

export function useDocumentMeta({ title, description, canonical, lang }) {
    useEffect(() => {
        const previousTitle = document.title;
        const previousLang = document.documentElement.lang;
        document.title = title;
        document.documentElement.lang = lang;

        const restores = [
            upsert('meta[name="description"]', meta('name', 'description'), 'content', description),
            upsert('meta[property="og:title"]', meta('property', 'og:title'), 'content', title),
            upsert('meta[property="og:description"]', meta('property', 'og:description'), 'content', description),
            upsert('meta[property="og:url"]', meta('property', 'og:url'), 'content', canonical),
            upsert('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', title),
            upsert('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', description),
            upsert('link[rel="canonical"]', () => {
                const link = document.createElement('link');
                link.rel = 'canonical';
                return link;
            }, 'href', canonical),
        ];

        return () => {
            document.title = previousTitle;
            document.documentElement.lang = previousLang;
            restores.forEach(restore => restore());
        };
    }, [title, description, canonical, lang]);
}
