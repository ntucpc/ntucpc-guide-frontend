/**
 * Color theme handling.
 *
 * The theme is applied by toggling the `dark` class on <html> (Tailwind `darkMode: "class"`).
 * The user's explicit choice is stored in localStorage; without one, the system preference is used.
 */

export const THEME_STORAGE_KEY = "theme"

export type Theme = "light" | "dark"

/**
 * Inline script run in <head> before the page is painted, so that the correct theme is applied
 * without a flash of the wrong one. It also follows system preference changes while the user
 * has not made an explicit choice.
 */
export const themeInitScript = `
(() => {
    const key = ${JSON.stringify(THEME_STORAGE_KEY)};
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = () => {
        try {
            const value = localStorage.getItem(key);
            return value === "light" || value === "dark" ? value : null;
        } catch (e) {
            return null;
        }
    };
    const apply = () => {
        const theme = stored() ?? (media.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
    };
    apply();
    media.addEventListener("change", () => {
        if (!stored()) apply();
    });
})();
`

/** Switch to the given theme and remember it as the user's choice */
export function setTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
        // Storage may be unavailable (e.g. blocked site data); the choice just isn't remembered
    }
}

export function getCurrentTheme(): Theme {
    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
}
