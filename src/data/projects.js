export const projects = [
    {
        id: 'signwhitehub',
        name: 'SignWhiteHub',
        description: {
            es: 'SaaS de firma digital white-label en producción: cada cliente opera con su propia marca y dominio. Proyecto propio.',
            en: 'White-label e-signature SaaS in production: each customer runs it under their own brand and domain. Own product.',
        },
        caseStudy: {
            problem: {
                es: 'Las empresas que quieren ofrecer firma electrónica a sus clientes necesitan hacerlo con su propia marca, sin construir la plataforma.',
                en: 'Businesses that want to offer e-signatures to their clients need to do it under their own brand without building the platform themselves.',
            },
            work: {
                es: 'Diseñé y desplegué la plataforma completa: backend Java 21 + Spring Boot (Spring Security, OAuth2/JWT, JPA, MySQL), facturación con Stripe, frontend React 19 multiidioma con login de Microsoft (MSAL), motor de firma PDF, y despliegue con Docker Compose detrás de Nginx con WAF ModSecurity (OWASP CRS), certificados TLS automáticos y dominios propios por cliente.',
                en: 'Designed and shipped the whole platform: Java 21 + Spring Boot backend (Spring Security, OAuth2/JWT, JPA, MySQL), Stripe billing, a multilingual React 19 frontend with Microsoft sign-in (MSAL), a PDF signing engine, and a Docker Compose deployment behind Nginx with a ModSecurity WAF (OWASP CRS), automatic TLS certificates and per-customer custom domains.',
            },
        },
        tech: ['Java 21', 'Spring Boot', 'Spring Security', 'MySQL', 'Stripe', 'React 19', 'Docker', 'Nginx', 'ModSecurity'],
        github: null,
        live: 'https://signwhitehub.com',
        year: '2026',
    },
    {
        id: 'mesaconnect',
        name: 'MesaConnect',
        description: {
            es: 'Prototipo de SaaS de reservas de restaurante vía WhatsApp y email con IA y recordatorios automáticos. Proyecto personal, no lanzado.',
            en: 'Prototype restaurant booking SaaS over WhatsApp and email, with AI and automatic reminders. Personal project, not launched.',
        },
        caseStudy: {
            problem: {
                es: 'Las reservas de un restaurante llegan por WhatsApp y email y se gestionan a mano.',
                en: 'A restaurant receives bookings over WhatsApp and email and has to handle them by hand.',
            },
            work: {
                es: 'Construí el backend (Java 17, Spring Boot) y el frontend (React 19): las reservas se gestionan por WhatsApp Business API y email, la OpenAI API interpreta los mensajes y se envían recordatorios automáticos.',
                en: 'Built the backend (Java 17, Spring Boot) and the frontend (React 19): bookings are handled through the WhatsApp Business API and email, the OpenAI API interprets incoming messages, and reminders are sent automatically.',
            },
        },
        tech: ['Java 17', 'Spring Boot', 'React 19', 'PostgreSQL', 'WhatsApp Business API', 'OpenAI API', 'Jakarta Mail'],
        github: null,
        live: null,
        year: '2025',
    },
    {
        id: 'mivs',
        name: 'MIVS Global',
        description: {
            es: 'Landing page para cliente real con CMS propio: panel de administración, autenticación JWT con 2FA y editor de temas en tiempo real. En producción.',
            en: 'Landing page for a real client with a custom CMS: admin panel, JWT authentication with 2FA and a real-time theme editor. In production.',
        },
        caseStudy: {
            problem: {
                es: 'Un cliente real necesitaba una web corporativa que pudiera gestionar por sí mismo.',
                en: 'A real client needed a corporate website they could manage themselves.',
            },
            work: {
                es: 'Desarrollé la web (React 19 + Vite) y una API en PHP con CMS propio: panel de administración, autenticación JWT con 2FA y editor de temas en tiempo real. Está en producción.',
                en: 'Built the site (React 19 + Vite) and a PHP API with a custom CMS: admin panel, JWT authentication with 2FA and a real-time theme editor. Live in production.',
            },
        },
        tech: ['React 19', 'Vite', 'PHP', 'MySQL', 'JWT', '2FA'],
        github: null,
        live: 'https://mivsglobal.com',
        year: '2026',
    },
    {
        id: 'webja',
        name: 'ITS Stones',
        description: {
            es: 'Landing page para cliente real con CMS propio: panel de administración, autenticación JWT y editor de temas en tiempo real. En producción.',
            en: 'Landing page for a real client with a custom CMS: admin panel, JWT authentication and a real-time theme editor. In production.',
        },
        caseStudy: {
            problem: {
                es: 'Un cliente real necesitaba una web corporativa que pudiera gestionar por sí mismo.',
                en: 'A real client needed a corporate website they could manage themselves.',
            },
            work: {
                es: 'Desarrollé la web (React 19 + Vite) y un backend PHP con PDO y CMS propio: panel de administración, autenticación JWT y editor de temas en tiempo real. Está en producción.',
                en: 'Built the site (React 19 + Vite) and a PHP (PDO) backend with a custom CMS: admin panel, JWT authentication and a real-time theme editor. Live in production.',
            },
        },
        tech: ['React 19', 'Vite', 'PHP', 'MySQL', 'JWT'],
        github: null,
        live: 'https://itsstonesfzco.com',
        year: '2025',
    },
    {
        id: 'cfi',
        name: 'Infraestructura de Red Municipal',
        description: {
            es: 'Diseño e implementación de una red municipal completa: arquitectura por capas, IPv4/IPv6, OSPF, BGP, VPN IPsec, firewalls y simulación en Cisco Packet Tracer.',
            en: 'Design and implementation of a complete municipal network: layered architecture, IPv4/IPv6, OSPF, BGP, IPsec VPN, firewalls and simulation in Cisco Packet Tracer.',
        },
        tech: ['Cisco Packet Tracer', 'OSPF', 'BGP', 'VPN IPsec', 'IPv6', 'ACL'],
        github: 'https://github.com/Pablo-Lob/CFI-Final',
        live: null,
        year: '2025',
    },
    {
        id: 'portfolio',
        name: 'Portfolio OS',
        description: {
            es: 'Portfolio interactivo con temática de escritorio Kali Linux. Terminal con comandos, CV adaptativo por idioma y sistema de ventanas.',
            en: 'Interactive portfolio themed as a Kali Linux desktop. Command terminal, language-aware CV and a window system.',
        },
        caseStudy: {
            problem: {
                es: 'Quería un portfolio que se recordara, sin sacrificar la accesibilidad ni el uso en móvil.',
                en: 'I wanted a memorable portfolio without giving up accessibility or mobile usability.',
            },
            work: {
                es: 'Lo construí con React 19 y Vite: escritorio con ventanas y terminal, versión móvil propia, CV adaptado al idioma y esta vista de resumen para lectura rápida.',
                en: 'Built with React 19 and Vite: a windowed desktop with a terminal, a dedicated mobile version, a language-aware CV and this quick-read resume view.',
            },
        },
        tech: ['React 19', 'Vite', 'CSS', 'JavaScript'],
        github: 'https://github.com/Pablo-Lob/Portfolio',
        live: 'https://juanpablolobato.com',
        year: '2025',
    },
    {
        id: 'hobbiesapp',
        name: 'HobbiesApp',
        description: {
            es: 'Aplicación de comunidad para hobbies diseñada en Figma. Sistema de diseño completo, flujo de usuario y prototipo interactivo.',
            en: 'Hobby community app designed in Figma. Full design system, user flow and interactive prototype.',
        },
        tech: ['Figma', 'UX/UI', 'Design System', 'Prototyping'],
        github: null,
        live: null,
        year: '2025',
    },
];
