import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { LANGUAGES, translations } from './i18n.js';
import {
  GOOGLE_MAPS_LINK,
  GOOGLE_MAP_EMBED_SRC,
  SITE_PHONE_TEL,
  SITE_PHONE_DISPLAY,
} from './siteInfo.js';
import { HERO_IMAGE_SRC, GALLERY_IMAGE_SRCS, GURU_DAKSHINA_QR_SRC } from './siteMedia.js';

const SERVICES_PER_PAGE = 6;
const GALLERY_PER_PAGE = 6;

function formatPageStatus(template, current, total) {
  return template.replace('{current}', String(current)).replace('{total}', String(total));
}

function revealInitiallyVisible() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(revealInitiallyVisible);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      /* Positive bottom margin = trigger a bit before section hits center, so motion reads clearly */
      { threshold: 0.03, rootMargin: '0px 0px 14% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal-root${visible ? ' reveal-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}

// --- i18n ---

const LanguageContext = createContext(null);

function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const messages = translations[lang] ?? translations.en;

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : lang === 'sa' ? 'sa' : 'en';
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, messages }), [lang, messages]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

// --- Components ---

const LanguageMenu = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const selectCode = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-[9.5rem] shrink-0 sm:w-[11.75rem]"
    >
      <button
        type="button"
        id="lang-menu-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
        className="box-border flex h-10 w-full max-w-full cursor-pointer items-center gap-1 rounded-full border-2 border-white/35 bg-white/95 px-2.5 py-0 text-left text-sm font-semibold leading-none text-charcoal shadow-md shadow-charcoal/25 backdrop-blur-sm transition hover:border-white/60 hover:bg-white focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/90 sm:px-3"
      >
        <span className="pointer-events-none shrink-0 text-saffron" aria-hidden>
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{current.label}</span>
        <span
          className={`pointer-events-none shrink-0 text-saffron transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby="lang-menu-button"
          className="animate-dropdown-in absolute right-0 z-[200] mt-2 box-border min-w-full w-max max-w-[calc(100vw-1rem)] overflow-hidden rounded-xl border-2 border-saffron/20 bg-gradient-to-b from-white to-cream py-1.5 shadow-xl shadow-charcoal/30 ring-1 ring-charcoal/10"
        >
          {LANGUAGES.map(({ code, label }) => {
            const selected = code === lang;
            return (
              <li key={code} role="presentation" className="px-1.5">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectCode(code)}
                  className={`flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-saffron text-white shadow-sm'
                      : 'text-charcoal hover:bg-gold/15 active:bg-gold/25'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] leading-none ${
                      selected
                        ? 'border-white/80 bg-white/25 text-white'
                        : 'border-saffron/35 bg-white/60'
                    }`}
                    aria-hidden
                  >
                    {selected ? '✓' : ''}
                  </span>
                  <span className="min-w-0 flex-1 break-words text-left leading-snug">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Header = () => {
  const { messages: m } = useLanguage();
  const nav = [
    ['home', '#home'],
    ['about', '#about'],
    ['services', '#services'],
    ['gallery', '#gallery'],
    ['faq', '#faq'],
    ['contact', '#contact'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-saffron px-3 py-3 text-white shadow-lg shadow-charcoal/20 transition-shadow duration-300 sm:px-4 sm:py-4">
      <div className="container mx-auto flex min-w-0 max-w-full items-center justify-between gap-2 sm:gap-4">
        <h1 className="flex min-w-0 flex-1 items-center gap-2.5 pr-1 text-lg font-bold sm:flex-none sm:gap-3 sm:pr-0 sm:text-2xl sm:leading-tight">
          <span
            className="header-bar-glow h-7 w-1 shrink-0 rounded-full bg-gold sm:h-9"
            aria-hidden
          />
          <span className="min-w-0 truncate tracking-tight">{m.brand}</span>
        </h1>
        <nav className="hidden flex-wrap justify-center gap-8 font-medium md:flex">
          {nav.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="nav-link-animated uppercase text-sm tracking-widest text-white/95 hover:text-gold"
            >
              {m.nav[key]}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <a
            href={SITE_PHONE_TEL}
            className="flex h-10 min-w-10 items-center justify-center rounded-md bg-white/15 text-xs font-bold text-white tabular-nums transition-all duration-300 hover:scale-[1.03] hover:bg-white/25 active:scale-[0.98] sm:h-auto sm:min-w-0 sm:px-3 sm:py-2 sm:text-sm"
            aria-label={`${m.contact.callNow}: ${SITE_PHONE_DISPLAY}`}
          >
            <span className="sm:hidden" aria-hidden>
              📞
            </span>
            <span className="hidden sm:inline">📞 {SITE_PHONE_DISPLAY}</span>
          </a>
          <LanguageMenu />
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const { messages: m } = useLanguage();
  const h = m.hero;
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-charcoal py-24 text-white md:py-32 h-[calc(100vh-73px)]"
    >
      <div
        className="animate-hero-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/88 via-saffron/72 to-charcoal/92"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <span className="hero-fade hero-fade-delay-1 mb-4 inline-block rounded-full border border-gold/35 bg-gold/20 px-4 py-1 text-sm font-bold text-gold">
          {h.badge}
        </span>
        <h2 className="hero-fade hero-fade-delay-2 mb-6 font-serif text-5xl drop-shadow-md md:text-7xl [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]">
          {h.title1} <br /> {h.title2}
        </h2>
        <p className="hero-fade hero-fade-delay-3 mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
          {h.subtitle}
        </p>
        <div className="hero-fade hero-fade-delay-3 flex flex-col justify-center gap-4 md:flex-row">
          <a
            href="#contact"
            className="rounded-md bg-gold px-10 py-4 font-bold text-charcoal shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/85 hover:shadow-2xl active:translate-y-0"
          >
            {h.ctaConsult}
          </a>
          <a
            href="#services"
            className="rounded-md border-2 border-white bg-transparent px-10 py-4 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-charcoal hover:shadow-lg active:translate-y-0"
          >
            {h.ctaServices}
          </a>
        </div>
        <p className="hero-fade hero-fade-delay-4 mt-10">
          <a
            href={SITE_PHONE_TEL}
            className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-semibold text-gold tabular-nums underline-offset-4 transition-colors duration-300 hover:text-gold/85 hover:underline"
          >
            <span aria-hidden>📞</span>
            <span>{SITE_PHONE_DISPLAY}</span>
            <span className="text-white/80 text-base font-normal">({m.contact.callNow})</span>
          </a>
        </p>
      </div>
    </section>
  );
};

const About = () => {
  const { messages: m } = useLanguage();
  const a = m.about;
  return (
    <section id="about" className="py-20 bg-white">
      <Reveal>
        <div className="container mx-auto px-4">
        <div className="reveal-in mb-14 text-center">
          <h3 className="text-3xl font-bold text-charcoal mb-2">{a.title}</h3>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="font-serif text-2xl font-bold text-charcoal mb-2">{a.panditName}</p>
          <p className="text-ritual font-bold text-lg mb-4">{a.experience}</p>
          <p className="text-charcoal/70 max-w-2xl mx-auto text-lg leading-relaxed">{a.intro}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {a.cards.map((item, i) => (
            <div
              key={i}
              style={{ '--i': i }}
              className="reveal-in reveal-stagger card-lift rounded-2xl border border-saffron/12 bg-cream p-8 text-center shadow-sm hover:shadow-md"
            >
              <h4 className="text-xl font-bold text-charcoal mb-3">{item.title}</h4>
              <p className="text-charcoal/75 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="reveal-in reveal-stagger mt-12 text-center" style={{ '--i': a.cards.length }}>
          <a
            href={SITE_PHONE_TEL}
            className="text-saffron font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
        </div>
      </Reveal>
    </section>
  );
};

const Services = () => {
  const { messages: m } = useLanguage();
  const s = m.services;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(s.items.length / SERVICES_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = s.items.slice(
    safePage * SERVICES_PER_PAGE,
    safePage * SERVICES_PER_PAGE + SERVICES_PER_PAGE
  );

  return (
    <section id="services" className="py-20 bg-cream">
      <Reveal>
        <div className="container mx-auto px-4">
        <div className="reveal-in mb-14 text-center">
          <h3 className="text-3xl font-bold text-charcoal mb-2">{s.title}</h3>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-charcoal/70 max-w-2xl mx-auto">{s.intro}</p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((item, i) => (
            <article
              key={item.id}
              style={{ '--i': i }}
              className="reveal-in reveal-stagger card-lift rounded-2xl border border-saffron/12 bg-white p-8 shadow-lg hover:border-saffron/45"
            >
              <h4 className="text-xl font-bold text-charcoal mb-3">{item.title}</h4>
              <p className="text-charcoal/75 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <nav
            className="reveal-in reveal-stagger mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
            style={{ '--i': pageItems.length }}
            aria-label={s.title}
          >
            <button
              type="button"
              disabled={safePage <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="min-w-[8.5rem] rounded-md border-2 border-saffron bg-white px-5 py-2.5 text-sm font-bold text-charcoal shadow-sm transition-all duration-300 hover:bg-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {s.prev}
            </button>
            <p className="text-sm font-semibold tabular-nums text-charcoal/80">
              {formatPageStatus(s.pageStatus, safePage + 1, totalPages)}
            </p>
            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="min-w-[8.5rem] rounded-md border-2 border-saffron bg-white px-5 py-2.5 text-sm font-bold text-charcoal shadow-sm transition-all duration-300 hover:bg-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {s.next}
            </button>
          </nav>
        )}
        <div
          className="reveal-in reveal-stagger mt-12 flex flex-col items-stretch justify-center gap-4 px-4 text-center sm:flex-row sm:flex-wrap sm:items-center"
          style={{ '--i': pageItems.length + (totalPages > 1 ? 1 : 0) }}
        >
          <a
            href="#contact"
            className="inline-block rounded-md bg-saffron px-8 py-3 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-saffron/90 hover:shadow-xl active:translate-y-0"
          >
            {s.book}
          </a>
          <a
            href={SITE_PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-saffron bg-white px-8 py-3 font-bold text-charcoal shadow-lg tabular-nums transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream active:translate-y-0"
          >
            📞 {m.contact.callNow}
          </a>
        </div>
        </div>
      </Reveal>
    </section>
  );
};

const Gallery = () => {
  const { messages: m } = useLanguage();
  const g = m.gallery;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(GALLERY_IMAGE_SRCS.length / GALLERY_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * GALLERY_PER_PAGE;
  const pageSrcs = GALLERY_IMAGE_SRCS.slice(start, start + GALLERY_PER_PAGE);

  return (
    <section id="gallery" className="py-20 bg-cream">
      <Reveal>
        <div className="container mx-auto px-4 text-center">
        <div className="reveal-in mb-2">
          <h3 className="text-3xl font-bold text-charcoal">{g.title}</h3>
          <div className="mx-auto mt-2 h-1 w-24 bg-gold" />
        </div>
        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {pageSrcs.map((src, i) => {
            const globalIndex = start + i;
            return (
            <div
              key={`${src}-${safePage}`}
              style={{ '--i': i }}
              className="reveal-in reveal-stagger card-lift group aspect-[3/4] overflow-hidden rounded-xl shadow-lg ring-1 ring-saffron/25"
            >
              <img
                src={src}
                alt={`${g.alt} — ${globalIndex + 1}`}
                loading={globalIndex < 6 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <nav
            className="reveal-in reveal-stagger mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
            style={{ '--i': pageSrcs.length }}
            aria-label={g.title}
          >
            <button
              type="button"
              disabled={safePage <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="min-w-[8.5rem] rounded-md border-2 border-saffron bg-white px-5 py-2.5 text-sm font-bold text-charcoal shadow-sm transition-all duration-300 hover:bg-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {g.prev}
            </button>
            <p className="text-sm font-semibold tabular-nums text-charcoal/80">
              {formatPageStatus(g.pageStatus, safePage + 1, totalPages)}
            </p>
            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="min-w-[8.5rem] rounded-md border-2 border-saffron bg-white px-5 py-2.5 text-sm font-bold text-charcoal shadow-sm transition-all duration-300 hover:bg-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {g.next}
            </button>
          </nav>
        )}
        <p
          className="reveal-in reveal-stagger mt-10"
          style={{ '--i': pageSrcs.length + (totalPages > 1 ? 1 : 0) }}
        >
          <a
            href={SITE_PHONE_TEL}
            className="text-saffron font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
        </div>
      </Reveal>
    </section>
  );
};

const GuruDakshina = () => {
  const { messages: m } = useLanguage();
  const gd = m.guruDakshina;
  return (
    <section id="guru-dakshina" className="border-t border-saffron/15 bg-white py-16">
      <Reveal>
        <div className="container mx-auto px-4 text-center">
          <div className="reveal-in">
            <h3 className="mb-2 text-3xl font-bold text-charcoal">{gd.title}</h3>
            <div className="mx-auto mb-8 h-1 w-24 bg-gold" />
          </div>
          <div
            style={{ '--i': 1 }}
            className="reveal-in reveal-stagger card-lift mx-auto max-w-xs rounded-2xl bg-cream p-6 shadow-lg ring-1 ring-saffron/20 sm:max-w-sm"
          >
            <img
              src={GURU_DAKSHINA_QR_SRC}
              alt={gd.qrAlt}
              width={320}
              height={320}
              decoding="async"
              className="mx-auto h-auto w-full max-w-[280px] rounded-lg transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const FAQ = () => {
  const { messages: m } = useLanguage();
  return (
    <section id="faq" className="py-20 bg-white">
      <Reveal>
        <div className="container mx-auto max-w-3xl px-4">
          <h3 className="reveal-in mb-10 text-center text-3xl font-bold text-charcoal">{m.faq.title}</h3>
          <div className="space-y-6">
          {m.faq.items.map((faq, i) => (
            <div
              key={i}
              style={{ '--i': i }}
              className="reveal-in reveal-stagger card-lift rounded-lg border-l-4 border-ritual bg-cream p-6 transition-colors duration-300 hover:bg-white"
            >
              <h4 className="font-bold text-lg text-charcoal mb-2">{faq.q}</h4>
              <p className="text-charcoal/75">{faq.a}</p>
            </div>
          ))}
        </div>
        <p
          className="reveal-in reveal-stagger mt-10 text-center"
          style={{ '--i': m.faq.items.length }}
        >
          <a
            href={SITE_PHONE_TEL}
            className="text-saffron font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} — {m.contact.callNow}
          </a>
        </p>
        </div>
      </Reveal>
    </section>
  );
};

const Testimonials = () => {
  const { messages: m } = useLanguage();
  return (
    <section className="py-20 bg-charcoal text-white">
      <Reveal>
        <div className="container mx-auto px-4">
          <h3 className="reveal-in mb-12 text-center text-3xl font-bold">{m.testimonials.title}</h3>
          <div className="grid gap-8 md:grid-cols-3">
          {m.testimonials.items.map((t, i) => (
            <div
              key={i}
              style={{ '--i': i }}
              className="reveal-in reveal-stagger card-lift rounded-2xl border border-ritual/50 bg-white/6 p-8 italic backdrop-blur-[2px] transition-colors duration-300 hover:border-gold/40 hover:bg-white/10"
            >
              <p className="mb-6">"{t.text}"</p>
              <p className="font-bold text-gold">— {t.name}</p>
            </div>
          ))}
        </div>
        <p
          className="reveal-in reveal-stagger mt-10 text-center"
          style={{ '--i': m.testimonials.items.length }}
        >
          <a
            href={SITE_PHONE_TEL}
            className="text-gold font-bold hover:text-gold/85 hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
        </div>
      </Reveal>
    </section>
  );
};

const ContactForm = () => {
  const { messages: m } = useLanguage();
  const c = m.contact;
  return (
    <section id="contact" className="py-20 bg-white">
      <Reveal>
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl transition-shadow duration-500 hover:shadow-[0_28px_60px_-15px_rgba(28,28,28,0.22)]">
          <div className="flex flex-col md:flex-row">
            <div
              style={{ '--i': 0 }}
              className="reveal-in reveal-stagger bg-saffron p-10 text-white md:w-1/3"
            >
              <h3 className="text-2xl font-bold mb-6">{c.title}</h3>
              <div className="space-y-4">
                <div className="space-y-1 text-white/85 leading-relaxed">
                  {c.location.split('\n').map((line, i) => (
                    <p key={i} className={i === 0 ? 'font-semibold text-white' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-bold text-gold underline underline-offset-2 hover:text-gold/85"
                >
                  {c.mapOpen}
                </a>
                <a
                  href={SITE_PHONE_TEL}
                  className="block font-semibold text-white hover:text-gold/85 tabular-nums transition-colors"
                >
                  📞 {SITE_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <form
              style={{ '--i': 1 }}
              className="reveal-in reveal-stagger space-y-4 bg-white p-10 md:w-2/3"
              onSubmit={(e) => e.preventDefault()}
            >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={c.namePh}
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-saffron/45"
              />
              <input
                type="tel"
                placeholder={c.phonePh}
                autoComplete="tel"
                className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-saffron/45"
              />
            </div>
            <select className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-saffron/45 text-charcoal/70">
              <option value="">{c.ritualPh}</option>
              {m.services.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
              <option value="other">{c.otherRitual}</option>
            </select>
            <textarea
              placeholder={c.messagePh}
              rows={4}
              className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-saffron/45"
            ></textarea>
            <a
              href={SITE_PHONE_TEL}
              className="flex w-full items-center justify-center gap-2 border-2 border-saffron text-charcoal bg-white font-bold py-3 rounded-md hover:bg-cream transition tabular-nums"
            >
              📞 {c.callNow} · {SITE_PHONE_DISPLAY}
            </a>
            <button className="w-full bg-saffron text-white font-bold py-3 rounded-md hover:bg-saffron/90 transition shadow-lg">
              {c.submit}
            </button>
            </form>
          </div>
          <div
            style={{ '--i': 2 }}
            className="reveal-in reveal-stagger border-t border-saffron/20 bg-white p-4 md:p-6"
          >
            <iframe
              title="Pandit Ji Seva location"
              src={GOOGLE_MAP_EMBED_SRC}
              className="w-full h-56 md:h-72 rounded-xl border border-saffron/12 shadow-inner"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
};

const Footer = () => {
  const { messages: m } = useLanguage();
  const f = m.footer;
  return (
    <footer className="border-t-4 border-gold bg-charcoal py-12 text-white/60">
      <Reveal>
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div
            style={{ '--i': 0 }}
            className="reveal-in reveal-stagger col-span-1 md:col-span-2"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{m.brand}</h2>
            <p className="max-w-md">{f.mission}</p>
          </div>
          <div style={{ '--i': 1 }} className="reveal-in reveal-stagger">
            <h4 className="text-white font-bold mb-4">{f.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="transition-colors duration-200 hover:text-white/850">
                  {m.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors duration-200 hover:text-white/850">
                  {m.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors duration-200 hover:text-white/850">
                  {f.linkServices}
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors duration-200 hover:text-white/850">
                  {f.linkFaq}
                </a>
              </li>
            </ul>
          </div>
          <div style={{ '--i': 2 }} className="reveal-in reveal-stagger">
            <h4 className="text-white font-bold mb-4">{f.connect}</h4>
            <p className="mb-4">
              <a
                href={SITE_PHONE_TEL}
                className="text-gold font-semibold hover:text-white tabular-nums transition-colors"
              >
                📞 {SITE_PHONE_DISPLAY}
              </a>
            </p>
            <div className="flex gap-4 text-xl">
              <span className="cursor-pointer hover:text-white transition">🅵</span>
              <span className="cursor-pointer hover:text-white transition">🆆</span>
              <span className="cursor-pointer hover:text-white transition">🅸</span>
            </div>
          </div>
        </div>
          <div
            style={{ '--i': 3 }}
            className="reveal-in reveal-stagger border-t border-white/10 pt-8 text-center text-xs uppercase tracking-widest"
          >
            {f.copyright}
          </div>
        </div>
      </Reveal>
    </footer>
  );
};

const WELCOME_STORAGE_KEY = 'pandit-welcome-dismissed';

const WelcomePopup = () => {
  const { messages: m } = useLanguage();
  const w = m.welcome;
  const [open, setOpen] = useState(() => {
    try {
      return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(WELCOME_STORAGE_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(WELCOME_STORAGE_KEY, '1');
    } catch {
      /* private mode or blocked storage */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6" role="presentation">
      <button
        type="button"
        aria-label="Close welcome dialog"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="animate-dropdown-in relative z-10 w-full max-w-lg rounded-2xl border-2 border-saffron/25 bg-gradient-to-b from-white to-cream px-6 py-8 shadow-2xl shadow-charcoal/25 ring-1 ring-charcoal/10 sm:px-8"
      >
        <div className="mb-1 flex justify-center" aria-hidden>
          <span className="font-serif text-5xl font-bold leading-none text-saffron sm:text-6xl" lang="sa">
            ॐ
          </span>
        </div>
        <h2 id="welcome-title" className="text-center font-serif text-2xl font-bold text-charcoal sm:text-3xl">
          {w.title}
        </h2>
        <p className="mt-3 text-center text-lg font-semibold text-saffron">{w.greeting}</p>
        <p className="mt-4 text-center text-base leading-relaxed text-charcoal/80">{w.body}</p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <a
            href={SITE_PHONE_TEL}
            className="flex min-h-12 w-full flex-nowrap items-center justify-center gap-2.5 rounded-xl border-2 border-saffron bg-saffron px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-saffron/90 hover:shadow-lg sm:text-base"
          >
            <span className="shrink-0" aria-hidden>
              📞
            </span>
            <span className="whitespace-nowrap tabular-nums">{SITE_PHONE_DISPLAY}</span>
          </a>
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full flex-nowrap items-center justify-center gap-2.5 rounded-xl border-2 border-gold bg-white px-4 py-3.5 text-sm font-bold text-charcoal shadow-md transition-all duration-300 hover:bg-cream hover:shadow-lg sm:text-base"
          >
            <span className="shrink-0" aria-hidden>
              📍
            </span>
            <span className="whitespace-nowrap text-center">{m.contact.mapOpen}</span>
          </a>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="mt-8 w-full rounded-xl border-2 border-charcoal/15 bg-charcoal/5 py-3.5 text-sm font-bold text-charcoal transition-colors duration-300 hover:bg-charcoal/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          {w.close}
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

function AppShell() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal antialiased selection:bg-gold/35 selection:text-charcoal">
      <WelcomePopup />
      <Header />
      <Hero />
      <About />
      <Services key={lang} />
      <Gallery key={lang} />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <GuruDakshina />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}
