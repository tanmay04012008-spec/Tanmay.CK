/**
 * Pixel Portfolio Script
 * Handles Theme Toggling with CSS Media Query detection and manual overrides
 */

(function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to get current effective theme
    function getEffectiveTheme() {
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme) {
            return savedTheme;
        }
        // Fallback to CSS Media Query default browser theme
        return mediaQuery.matches ? 'dark' : 'light';
    }

    // Function to apply theme to document
    function applyTheme(theme, isManual = false) {
        if (isManual) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme-preference', theme);
        } else {
            // If system change or initial without manual override
            const saved = localStorage.getItem('theme-preference');
            if (saved) {
                document.documentElement.setAttribute('data-theme', saved);
                theme = saved;
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }

        // Update button visual state
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'DAY';
                themeToggleBtn.setAttribute('aria-label', 'Switch to day mode');
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'NIGHT';
                themeToggleBtn.setAttribute('aria-label', 'Switch to night mode');
            }
        }
    }

    // Initialize on page load
    const initialTheme = getEffectiveTheme();
    const hasManualPreference = localStorage.getItem('theme-preference') !== null;
    applyTheme(initialTheme, hasManualPreference);

    // Toggle button click listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = getEffectiveTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }

    // Listen for system / browser theme changes via CSS media query
    mediaQuery.addEventListener('change', (e) => {
        // If user hasn't set an explicit preference, respond to system changes automatically
        if (!localStorage.getItem('theme-preference')) {
            applyTheme(e.matches ? 'dark' : 'light', false);
        }
    });
})();
