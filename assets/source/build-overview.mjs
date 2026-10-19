// Source for assets/subagent-manager-overview.png.
// Writes subagent-manager-overview.svg next to this file; render it to PNG at 2x
// (3200 x 2000), e.g. with headless Chrome or Edge. See README.md in this folder.
// joinB (used in the README): lead and Sol cards share one dark palette, amber fork/result arrows.
// joinA: alternative with a white Sol card and two-tone arrows across the seam.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const grokPaths = readFileSync(here('logos/grok-paths.txt'), 'utf8').trim().split(/\r?\n/);
const blossom = readFileSync(here('logos/openai-blossom-path.txt'), 'utf8').trim();
const geminiPng = readFileSync(here('logos/gemini-sparkle.png')).toString('base64');
const W = 1600, H = 1000;
const FONT = `'Segoe UI Variable Display','Segoe UI',system-ui,sans-serif`;

const C = {
  ink: '#16203A', sub: '#3F4B63', subStrong: '#2C3850', line: '#2E3A55', caption: '#33405A', tier: '#4C5873',
  card: '#FFFFFF', cardStroke: '#C3CDDD', opt: '#5F6C86',
  sol: '#C2760A', solTint: '#FCEDD0', luna: '#36579A', lunaTint: '#E1E9F6', astra: '#5A3CC2', astraTint: '#E9E2FB',
  lead0: '#22386A', lead1: '#3866A6',
  bandTop: '#EFEAFB', bandMid: '#E9F0F9', bandBot: '#E7F3EF', frame: '#DCE6F4', frameStroke: '#8FA4C6', amber: '#F5A623',
};

// ---------- icons ----------
let uid = 0;
const f1 = (n) => n.toFixed(1);
function glyph(kind, cx, cy, set, color, tint) {
  if (kind === 'gemini') {
    const s = 58;
    return `<image href="data:image/png;base64,${geminiPng}" x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}"/>`;
  }
  if (kind === 'grok') {
    const s = 54, k = s / 512;
    return `<rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" rx="12" fill="#000"/>
      <g transform="translate(${cx - s / 2} ${cy - s / 2}) scale(${k.toFixed(4)})" fill="#fff">${grokPaths.map((d) => `<path d="${d}"/>`).join('')}</g>`;
  }
  if (set === 'badge') {
    // astronomical-style line glyphs on a tinted disc
    let g = `<circle cx="${cx}" cy="${cy}" r="29" fill="${tint}"/>`;
    const st = `fill="none" stroke="${color}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"`;
    if (kind === 'sun') g += `<circle cx="${cx}" cy="${cy}" r="13" ${st}/><circle cx="${cx}" cy="${cy}" r="4.2" fill="${color}"/>`;
    if (kind === 'moon') {
      const R = 14, a = R * 0.5, b = R * 0.866;
      g += `<path d="M${f1(cx + a)} ${f1(cy - b)} A${R} ${R} 0 1 0 ${f1(cx + a)} ${f1(cy + b)} A${R * 0.9} ${R * 0.9} 0 0 1 ${f1(cx + a)} ${f1(cy - b)} Z" ${st} transform="rotate(-20 ${cx} ${cy})"/>`;
    }
    if (kind === 'star') {
      let rays = '';
      for (let i = 0; i < 3; i++) {
        const a = Math.PI / 2 + (Math.PI / 3) * i, r = 15;
        rays += `<line x1="${f1(cx + Math.cos(a) * r)}" y1="${f1(cy + Math.sin(a) * r)}" x2="${f1(cx - Math.cos(a) * r)}" y2="${f1(cy - Math.sin(a) * r)}"/>`;
      }
      g += `<g ${st}>${rays}</g>`;
    }
    return g;
  }
  // 'solid': geometric marks, no badge
  if (kind === 'sun') return `<circle cx="${cx}" cy="${cy}" r="13" fill="${color}"/><circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="${color}" stroke-width="2.6"/>`;
  if (kind === 'moon') return `<circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="${color}" stroke-width="2.6"/>
      <path d="M${cx} ${cy - 20} A20 20 0 0 0 ${cx} ${cy + 20} Z" fill="${color}"/>`;
  if (kind === 'star') {
    let rays = '';
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 4) * i, r = i % 2 ? 15 : 22;
      rays += `<line x1="${f1(cx + Math.cos(a) * r)}" y1="${f1(cy + Math.sin(a) * r)}" x2="${f1(cx - Math.cos(a) * r)}" y2="${f1(cy - Math.sin(a) * r)}"/>`;
    }
    return `<g stroke="${color}" stroke-width="3.2" stroke-linecap="round">${rays}</g><circle cx="${cx}" cy="${cy}" r="5" fill="${color}"/>`;
  }
  return '';
}
const tone = { sun: [C.sol, C.solTint], moon: [C.luna, C.lunaTint], star: [C.astra, C.astraTint] };

// ---------- pieces ----------
function card(c, set, optional = false) {
  const cy = c.y + c.h / 2;
  const [col, tint] = tone[c.icon] || [];
  const frame = optional
    ? `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="22" fill="${C.card}" stroke="${C.opt}" stroke-width="2.4" stroke-dasharray="18 12"/>`
    : `<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="22" fill="${C.card}" stroke="${C.cardStroke}" stroke-width="1.8" filter="url(#shadow)"/>`;
  return `<g>${frame}${glyph(c.icon, c.x + 58, cy, set, col, tint)}
    <text x="${c.x + 104}" y="${cy - 6}" font-size="27" font-weight="650" fill="${C.ink}">${c.title}</text>
    <text x="${c.x + 104}" y="${cy + 29}" font-size="23" font-weight="500" fill="${C.subStrong}">${c.sub}</text></g>`;
}

function lead(L, set) {
  const c = L.lead, cx = c.x + c.w / 2;
  // Official OpenAI Blossom, white, unmodified (brand terms: monochrome, no effects)
  const k = 62 / 350;
  const mark = `<path d="${blossom}" fill="#FFFFFF" transform="translate(${(cx - 358 * k).toFixed(2)} ${(c.y + 66 - 358 * k).toFixed(2)}) scale(${k.toFixed(4)})"/>`;
  return `<g><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="30" fill="url(#leadGrad)" filter="url(#leadShadow)"/>
    <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="30" fill="url(#sheen)"/>
    ${mark}
    <text x="${cx}" y="${c.y + 146}" text-anchor="middle" font-size="46" font-weight="700" fill="#FFFFFF">Lead Agent</text>
    <text x="${cx}" y="${c.y + 186}" text-anchor="middle" font-size="25" font-weight="600" fill="#F2F6FD">GPT-6.1 Sol Ultra</text></g>`;
}

function links(L, pair) {
  const lw = 5.5;
  const solid = (start = true) => `fill="none" stroke="${C.line}" stroke-width="${lw}" stroke-linejoin="round" ${start ? 'marker-start="url(#arrow)" ' : ''}marker-end="url(#arrow)"`;
  const dashed = `fill="none" stroke="${C.opt}" stroke-width="4.2" stroke-dasharray="18 12" stroke-linejoin="round" marker-start="url(#arrowOpt)" marker-end="url(#arrowOpt)"`;
  const { lead: ld, right } = L, mid = ld.x + ld.w / 2, cy = ld.y + ld.h / 2, gap = 6;
  const leadTop = ld.y, leadBot = ld.y + ld.h, leadR = ld.x + ld.w;
  let s = '';
  for (const c of L.top) s += `<path d="M${c.x + c.w / 2} ${c.y + c.h + gap} V272 H${mid} V${leadTop - gap}" ${solid()}/>`;
  for (const c of L.bottom) s += `<path d="M${c.x + c.w / 2} ${c.y - gap} V700 H${mid} V${leadBot + gap}" ${solid()}/>`;
  for (const c of L.left) s += `<path d="M${c.x + c.w + gap} ${c.y + c.h / 2} H${L.busX} V${cy} H${ld.x - gap}" ${dashed}/>`;
  s += `<g font-size="24" font-weight="600" fill="${C.ink}">
    <text x="${mid + 16}" y="${leadBot + 62}">focused brief</text></g>`;
  return s;
}

// Sol card joined to the lead; content shifted right to leave room for the seam arrows
function solCard(r, mode) {
  const dark = mode === 'joinB';
  const cx = r.x + r.w / 2 + 8;
  const box = dark
    ? `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="30" fill="url(#solGrad)" filter="url(#leadShadow)"/>
       <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="30" fill="url(#sheen)"/>`
    : `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="30" fill="${C.card}" stroke="${C.cardStroke}" stroke-width="1.8" filter="url(#shadow)"/>`;
  const ink = dark ? '#FFFFFF' : C.ink, sub = dark ? '#F2F6FD' : C.sub, note = dark ? '#FFE3A6' : C.caption;
  return `<g>${box}${glyph('sun', cx, r.y + 62, 'solid', dark ? '#FFC757' : C.sol)}
    <text x="${cx}" y="${r.y + 132}" text-anchor="middle" font-size="27" font-weight="700" fill="${ink}">Task execution</text>
    <text x="${cx}" y="${r.y + 168}" text-anchor="middle" font-size="24" font-weight="600" fill="${sub}">GPT-6.1 Sol</text>
    <text x="${cx}" y="${r.y + 202}" text-anchor="middle" font-size="22" font-weight="500" fill="${note}">full-history fork</text></g>`;
}

// fork (right) and result (left) arrows drawn across the seam, on top of both cards
function seamArrows(L, mode) {
  const ld = L.lead, r = L.right, cy = ld.y + ld.h / 2;
  const seam = (ld.x + ld.w + r.x) / 2, reach = 38, x1 = seam - reach, x2 = seam + reach;
  const fork = `M${x1} ${cy - 22} H${x2}`, result = `M${x2} ${cy + 22} H${x1}`;
  const draw = (color, marker, w = 6) => `<path d="${fork}" fill="none" stroke="${color}" stroke-width="${w}" marker-end="url(#${marker})"/>
    <path d="${result}" fill="none" stroke="${color}" stroke-width="${w}" marker-end="url(#${marker})"/>`;
  if (mode === 'joinB') return draw(C.amber, 'arrowAmber', 8);
  return `<defs><clipPath id="seamL"><rect x="0" y="0" width="${seam}" height="${H}"/></clipPath>
      <clipPath id="seamR"><rect x="${seam}" y="0" width="${W - seam}" height="${H}"/></clipPath></defs>
    <g clip-path="url(#seamL)">${draw('#FFFFFF', 'arrowWhite')}</g>
    <g clip-path="url(#seamR)">${draw(C.ink, 'arrowInk')}</g>`;
}

function svg(L, set, pair) {
  const ld = L.lead, r = L.right;
  const pairFrame = '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">
  <defs>
    <linearGradient id="leadGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.lead0}"/><stop offset="1" stop-color="${C.lead1}"/></linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="8" flood-color="#16203A" flood-opacity=".10"/></filter>
    <filter id="leadShadow" x="-25%" y="-30%" width="150%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#22386A" flood-opacity=".32"/></filter>
    <marker id="arrow" viewBox="0 0 16 16" refX="13" refY="8" markerWidth="21" markerHeight="21" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
      <path d="M1.5 1.5 L14.5 8 L1.5 14.5 Z" fill="${C.line}"/></marker>
    <marker id="arrowOpt" viewBox="0 0 16 16" refX="13" refY="8" markerWidth="19" markerHeight="19" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
      <path d="M1.5 1.5 L14.5 8 L1.5 14.5 Z" fill="${C.opt}"/></marker>
    ${[['arrowWhite', '#FFFFFF'], ['arrowInk', C.ink], ['arrowAmber', C.amber]].map(([id, col]) =>
      `<marker id="${id}" viewBox="0 0 16 16" refX="13" refY="8" markerWidth="${id === 'arrowAmber' ? 26 : 22}" markerHeight="${id === 'arrowAmber' ? 26 : 22}" markerUnits="userSpaceOnUse" orient="auto">
      <path d="M1.5 1.5 L14.5 8 L1.5 14.5 Z" fill="${col}"/></marker>`).join('')}
    <linearGradient id="solGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E5290"/><stop offset="1" stop-color="#4C7EBF"/></linearGradient>
  </defs>
  <rect x="20" y="16" width="${W - 40}" height="206" rx="28" fill="${C.bandTop}"/>
  <rect x="20" y="300" width="${W - 40}" height="370" rx="28" fill="${C.bandMid}"/>
  <rect x="20" y="740" width="${W - 40}" height="234" rx="28" fill="${C.bandBot}"/>
  ${pairFrame}
  ${links(L, pair)}
  <g font-size="21" font-weight="700" letter-spacing="1.6" fill="${C.ink}">
    <text x="${L.left[0].x + L.left[0].w / 2}" y="340" text-anchor="middle">OPTIONAL</text>
    <text x="${L.cx}" y="950" text-anchor="middle">IN PARALLEL</text></g>
  ${L.top.map((c) => card(c, set)).join('')}
  ${L.left.map((c) => card(c, set, true)).join('')}
  ${L.bottom.map((c) => card(c, set)).join('')}
  ${solCard(L.right, pair)}
  ${lead(L, set)}
  ${seamArrows(L, pair)}
</svg>`;
}

function layout() {
  const cx = 820, gap = 6;
  const lead = { x: cx - 230, y: 370, w: 460, h: 220 };
  return {
    cx, lead,
    right: { x: lead.x + lead.w + gap, y: 370, w: 300, h: 220 },
    top: [
      { x: cx - 390, y: 59, w: 375, h: 120, icon: 'star', title: 'Expert consultation', sub: 'GPT-6 Astra · Max' },
      { x: cx + 15, y: 59, w: 375, h: 120, icon: 'star', title: 'Independent review', sub: 'Astra or Sol' },
    ],
    left: [
      { x: 110, y: 360, w: 385, h: 120, icon: 'gemini', title: 'Video & frames', sub: 'Gemini via AGY' },
      { x: 110, y: 500, w: 385, h: 120, icon: 'grok', title: 'X & web research', sub: 'Grok CLI' },
    ],
    busX: 543,
    bottom: [
      { x: cx - 555, y: 780, w: 350, h: 120, icon: 'moon', title: 'Extract & cite', sub: 'GPT-6 Luna Max' },
      { x: cx - 175, y: 780, w: 350, h: 120, icon: 'moon', title: 'Locate & edit', sub: 'GPT-6 Luna Max' },
      { x: cx + 205, y: 780, w: 350, h: 120, icon: 'moon', title: 'Organize & check', sub: 'GPT-6 Luna Max' },
    ],
  };
}

const mode = process.argv[2] || 'joinB';
const out = svg(layout(), 'solid', mode);
writeFileSync(here('subagent-manager-overview.svg'), out);
writeFileSync(here('subagent-manager-overview.html'),
  `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}svg{display:block}</style>${out}`);
console.log('wrote subagent-manager-overview.svg and .html (' + mode + ')');
