/* ---------- icons + logo ---------- */
const ICON={
 home:'<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
 plan:'<path d="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4"/>',
 book:'<path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3zM4 17a3 3 0 013-3h11"/>',
 focus:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
 dumb:'<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>',
 tasks:'<path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
 chart:'<path d="M5 20V11M12 20V4M19 20v-6"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
 palette:'<path d="M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 003-3c0-6-3.5-11-8-11z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',
 pause:'<path d="M8 5v14M16 5v14"/>',
 reset:'<path d="M4 12a8 8 0 108-8M4 4v5h5"/>',
 check:'<path d="M5 12l5 5 9-10"/>',
 left:'<path d="M15 5l-7 7 7 7"/>',
 right:'<path d="M9 5l7 7-7 7"/>',
 send:'<path d="M4 12l16-8-6 16-2-7z"/>',
 sound:'<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6"/>'
};
const ic=(n,s=20)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const LOGO=(s=46)=>`<svg viewBox="0 0 512 512" width="${s}" height="${s}" role="img" aria-label="Cherry"><defs><linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a0d22"/><stop offset="1" stop-color="#12040c"/></linearGradient><radialGradient id="cc" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff7a8e"/><stop offset=".5" stop-color="#e0153f"/><stop offset="1" stop-color="#7d0522"/></radialGradient><linearGradient id="cl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9be36b"/><stop offset="1" stop-color="#2f8a46"/></linearGradient><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe29a"/><stop offset="1" stop-color="#c8923a"/></linearGradient></defs><rect width="512" height="512" rx="116" fill="url(#cbg)"/><rect x="10" y="10" width="492" height="492" rx="106" fill="none" stroke="url(#cg)" stroke-width="4" opacity=".7"/><path d="M190 264C198 200 250 150 322 112" fill="none" stroke="url(#cg)" stroke-width="12" stroke-linecap="round"/><path d="M338 282C346 220 340 160 322 112" fill="none" stroke="url(#cg)" stroke-width="12" stroke-linecap="round"/><path d="M322 112C352 62 420 58 452 96C420 140 360 146 322 112Z" fill="url(#cl)"/><path d="M326 108C370 92 410 90 440 98" stroke="#1f6b35" stroke-width="3" fill="none" opacity=".6"/><circle cx="188" cy="352" r="92" fill="url(#cc)"/><circle cx="338" cy="366" r="86" fill="url(#cc)"/><ellipse cx="156" cy="318" rx="20" ry="30" transform="rotate(30 156 318)" fill="#fff" opacity=".45"/><ellipse cx="308" cy="334" rx="18" ry="27" transform="rotate(30 308 334)" fill="#fff" opacity=".4"/></svg>`;

