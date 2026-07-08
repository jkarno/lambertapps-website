// Theme (light / dark). Loaded synchronously in the head so it runs BEFORE
// first paint - no flash of the wrong mode.
// Precedence: saved choice in localStorage, then the OS appearance setting.
(() => {
    const apply = (theme) => {
        if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
    };

    let saved = null;
    try { saved = localStorage.getItem('trot-theme'); } catch (e) {}
    if (saved) {
        apply(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        apply('dark');
    }

    // Delegated click handler - works even though the button may not exist
    // yet when this script runs (head fires before the body parses).
    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-theme-toggle]')) return;
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        // Freeze transitions during the swap so the scene and chrome
        // don't animate - eliminates the day-to-night glitch.
        document.documentElement.classList.add('theme-toggling');
        apply(next);
        try { localStorage.setItem('trot-theme', next); } catch (e) {}
        // Re-enable transitions on the next frame.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('theme-toggling');
            });
        });
    });
})();
