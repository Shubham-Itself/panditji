/** Shared phone (India) — use with tel: for click-to-call */
export const SITE_PHONE_E164 = '+919582603393';
export const SITE_PHONE_DISPLAY = '+91 95826 03393';
export const SITE_PHONE_TEL = `tel:${SITE_PHONE_E164}`;

/** Opens this place in Google Maps (works in a new tab; not for `<iframe>`) */
export const GOOGLE_MAPS_LINK = 'https://share.google/FFodyVTx0bNDuZ4aY';

/**
 * Pin for the contact map iframe — same location as your shared link (28.5157512, 77.2314604).
 * Google blocks `/maps/dir/...` and short links inside iframes; `output=embed` + `q=lat,lng` is allowed.
 */
const MAP_EMBED_LAT = 28.5157512;
const MAP_EMBED_LNG = 77.2314604;

export const GOOGLE_MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_EMBED_LAT}%2C${MAP_EMBED_LNG}&z=17&hl=en&output=embed`;
