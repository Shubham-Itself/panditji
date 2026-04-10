import React, { createContext, useContext, useMemo, useState, useEffect, useRef } from 'react';
import { LANGUAGES, translations } from './i18n.js';
import {
  GOOGLE_MAPS_LINK,
  GOOGLE_MAP_EMBED_SRC,
  SITE_PHONE_TEL,
  SITE_PHONE_DISPLAY,
} from './siteInfo.js';
import { HERO_IMAGE_SRC, GALLERY_IMAGE_SRCS } from './siteMedia.js';

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
    <div ref={wrapRef} className="relative shrink-0 min-w-[10.5rem] sm:min-w-[11.5rem]">
      <button
        type="button"
        id="lang-menu-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-full cursor-pointer items-center gap-0 rounded-full border-2 border-white/35 bg-white/95 py-0 pl-3 pr-3 text-left text-sm font-semibold text-orange-900 shadow-md shadow-orange-950/20 backdrop-blur-sm transition hover:border-white/60 hover:bg-white focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/90 focus:ring-offset-2 focus:ring-offset-orange-700"
      >
        <span className="pointer-events-none shrink-0 text-orange-600" aria-hidden>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1 truncate px-2 text-center sm:text-left">{current.label}</span>
        <span
          className={`pointer-events-none shrink-0 text-orange-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby="lang-menu-button"
          className="absolute right-0 z-[200] mt-2 min-w-full overflow-hidden rounded-xl border-2 border-orange-200 bg-gradient-to-b from-white to-orange-50/90 py-1.5 shadow-xl shadow-orange-950/30 ring-1 ring-orange-900/10"
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
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-orange-950 hover:bg-orange-100/90 active:bg-orange-200/80'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] leading-none ${
                      selected
                        ? 'border-white/80 bg-white/25 text-white'
                        : 'border-orange-300/70 bg-white/60'
                    }`}
                    aria-hidden
                  >
                    {selected ? '✓' : ''}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{label}</span>
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
    <header className="bg-orange-700 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 shrink-0">
          <span className="text-yellow-400">🕉️</span> {m.brand}
        </h1>
        <nav className="hidden md:flex gap-8 font-medium flex-wrap justify-center">
          {nav.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="hover:text-yellow-300 transition-colors uppercase text-sm tracking-widest"
            >
              {m.nav[key]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={SITE_PHONE_TEL}
            className="flex items-center justify-center min-w-10 h-10 sm:min-w-0 sm:h-auto sm:px-3 sm:py-2 rounded-md bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm tabular-nums transition-colors"
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
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-orange-950 py-24 text-white md:py-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-950/90 via-orange-900/82 to-orange-950/92"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <span className="bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block border border-yellow-500/30">
          {h.badge}
        </span>
        <h2 className="mb-6 font-serif text-5xl drop-shadow-md md:text-7xl [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]">
          {h.title1} <br /> {h.title2}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-orange-100 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
          {h.subtitle}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#contact"
            className="bg-yellow-500 text-orange-900 px-10 py-4 rounded-md font-bold hover:bg-yellow-400 transition-all shadow-xl"
          >
            {h.ctaConsult}
          </a>
          <a
            href="#services"
            className="bg-transparent border-2 border-white px-10 py-4 rounded-md font-bold hover:bg-white hover:text-orange-900 transition-all"
          >
            {h.ctaServices}
          </a>
        </div>
        <p className="mt-10">
          <a
            href={SITE_PHONE_TEL}
            className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-yellow-300 font-semibold hover:text-yellow-200 underline-offset-4 hover:underline tabular-nums"
          >
            <span aria-hidden>📞</span>
            <span>{SITE_PHONE_DISPLAY}</span>
            <span className="text-orange-200/90 text-base font-normal">({m.contact.callNow})</span>
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
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold text-orange-900 mb-2">{a.title}</h3>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-orange-800 font-bold text-lg mb-4">{a.experience}</p>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{a.intro}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {a.cards.map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-orange-50 border border-orange-100 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="text-xl font-bold text-orange-900 mb-3">{item.title}</h4>
              <p className="text-gray-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-12">
          <a
            href={SITE_PHONE_TEL}
            className="text-orange-700 font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
      </div>
    </section>
  );
};

const Services = () => {
  const { messages: m } = useLanguage();
  const s = m.services;
  return (
    <section id="services" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold text-orange-900 mb-2">{s.title}</h3>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">{s.intro}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {s.items.map((item, i) => (
            <article
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:border-orange-300 transition-colors"
            >
              <h4 className="text-xl font-bold text-orange-900 mb-3">{item.title}</h4>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 flex-wrap px-4">
          <a
            href="#contact"
            className="inline-block bg-orange-600 text-white font-bold px-8 py-3 rounded-md hover:bg-orange-700 transition shadow-lg text-center"
          >
            {s.book}
          </a>
          <a
            href={SITE_PHONE_TEL}
            className="inline-flex items-center justify-center gap-2 border-2 border-orange-700 text-orange-900 bg-white font-bold px-8 py-3 rounded-md hover:bg-orange-50 transition shadow-lg tabular-nums"
          >
            📞 {m.contact.callNow}
          </a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { messages: m } = useLanguage();
  return (
    <section id="gallery" className="py-20 bg-orange-50">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold text-orange-900 mb-2">{m.gallery.title}</h3>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGE_SRCS.map((src, i) => (
            <div
              key={src}
              className="group aspect-[3/4] overflow-hidden rounded-xl shadow-lg ring-1 ring-orange-200/60"
            >
              <img
                src={src}
                alt={`${m.gallery.alt} — ${i + 1}`}
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <p className="mt-10">
          <a
            href={SITE_PHONE_TEL}
            className="text-orange-800 font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { messages: m } = useLanguage();
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h3 className="text-3xl font-bold text-center text-orange-900 mb-10">{m.faq.title}</h3>
        <div className="space-y-6">
          {m.faq.items.map((faq, i) => (
            <div key={i} className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
              <h4 className="font-bold text-lg text-orange-900 mb-2">{faq.q}</h4>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10">
          <a
            href={SITE_PHONE_TEL}
            className="text-orange-700 font-bold hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} — {m.contact.callNow}
          </a>
        </p>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { messages: m } = useLanguage();
  return (
    <section className="py-20 bg-orange-900 text-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">{m.testimonials.title}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {m.testimonials.items.map((t, i) => (
            <div key={i} className="bg-orange-800/50 p-8 rounded-2xl border border-orange-700 italic">
              <p className="mb-6">"{t.text}"</p>
              <p className="font-bold text-yellow-400">— {t.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10">
          <a
            href={SITE_PHONE_TEL}
            className="text-yellow-300 font-bold hover:text-yellow-200 hover:underline tabular-nums"
          >
            📞 {SITE_PHONE_DISPLAY} · {m.contact.callNow}
          </a>
        </p>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const { messages: m } = useLanguage();
  const c = m.contact;
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-orange-50 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-orange-600 p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">{c.title}</h3>
              <div className="space-y-4">
                <div className="space-y-1 text-orange-50 leading-relaxed">
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
                  className="inline-block text-sm font-bold text-yellow-300 underline underline-offset-2 hover:text-yellow-200"
                >
                  {c.mapOpen}
                </a>
                <a
                  href={SITE_PHONE_TEL}
                  className="block font-semibold text-white hover:text-yellow-200 tabular-nums transition-colors"
                >
                  📞 {SITE_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <form className="md:w-2/3 p-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={c.namePh}
                className="p-3 border rounded-md w-full focus:outline-orange-600"
              />
              <input
                type="tel"
                placeholder={c.phonePh}
                autoComplete="tel"
                className="p-3 border rounded-md w-full focus:outline-orange-600"
              />
            </div>
            <select className="p-3 border rounded-md w-full focus:outline-orange-600 text-gray-600">
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
              className="p-3 border rounded-md w-full focus:outline-orange-600"
            ></textarea>
            <a
              href={SITE_PHONE_TEL}
              className="flex w-full items-center justify-center gap-2 border-2 border-orange-600 text-orange-900 bg-white font-bold py-3 rounded-md hover:bg-orange-50 transition tabular-nums"
            >
              📞 {c.callNow} · {SITE_PHONE_DISPLAY}
            </a>
            <button className="w-full bg-orange-600 text-white font-bold py-3 rounded-md hover:bg-orange-700 transition shadow-lg">
              {c.submit}
            </button>
            </form>
          </div>
          <div className="border-t border-orange-200 bg-white p-4 md:p-6">
            <iframe
              title="Pandit Ji Seva location"
              src={GOOGLE_MAP_EMBED_SRC}
              className="w-full h-56 md:h-72 rounded-xl border border-orange-100 shadow-inner"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { messages: m } = useLanguage();
  const f = m.footer;
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t-4 border-orange-600">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">{m.brand}</h2>
            <p className="max-w-md">{f.mission}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{f.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-orange-500">
                  {m.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-500">
                  {m.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-500">
                  {f.linkServices}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-500">
                  {f.linkFaq}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{f.connect}</h4>
            <p className="mb-4">
              <a
                href={SITE_PHONE_TEL}
                className="text-orange-400 font-semibold hover:text-white tabular-nums transition-colors"
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
        <div className="text-center pt-8 border-t border-stone-800 text-xs uppercase tracking-widest">
          {f.copyright}
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
