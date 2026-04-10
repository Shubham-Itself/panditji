/** Shared phone (India) — use with tel: for click-to-call */
export const SITE_PHONE_E164 = '+919582603393';
export const SITE_PHONE_DISPLAY = '+91 95826 03393';
export const SITE_PHONE_TEL = `tel:${SITE_PHONE_E164}`;

/** Shared map / address for contact embed and external link */
export const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/b6xKbvvphSH8U2uE7?g_st=aw';

const MAP_QUERY = 'F-2, 2nd Block, Durga Mandir, Madan Gir, New Delhi, Delhi, India';

export const GOOGLE_MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed&z=17`;
