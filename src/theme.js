// Appearance for both pages: 'light' or 'dark' forces that scheme, 'system' follows the OS (src/theme.css).
// A classic script in <head> so the scheme is set before first paint. Storage can throw (Safari on file://).
const savedTheme = () => { try { const t = localStorage.getItem('theme'); return t === 'light' || t === 'dark' ? t : 'system' } catch { return 'system' } };
const applyTheme = t => { document.documentElement.style.colorScheme = t === 'system' ? 'light dark' : t };
const saveTheme = t => { try { t === 'system' ? localStorage.removeItem('theme') : localStorage.setItem('theme', t) } catch {} applyTheme(t) };
applyTheme(savedTheme());
