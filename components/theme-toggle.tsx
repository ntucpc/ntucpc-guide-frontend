"use client"

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getCurrentTheme, setTheme } from "@/lib/theme"

type ThemeToggleProps = {
    className?: string
}

/**
 * Button that switches between light and dark mode.
 * Which icon is shown is decided by CSS (`dark:` variants) rather than React state,
 * so it is already correct on first paint, before hydration.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
    return (
        <button
            type="button"
            className={`p-2 text-slate-400 hover:text-white transition-colors ${className}`}
            onClick={() =>
                setTheme(getCurrentTheme() === "dark" ? "light" : "dark")
            }
            title="切換深色模式"
            aria-label="切換深色模式"
        >
            {/* Wrapped in spans since FontAwesome's own CSS sets `display` on the svg */}
            <span className="dark:hidden">
                <FontAwesomeIcon icon={faSun} className="text-lg" />
            </span>
            <span className="hidden dark:inline">
                <FontAwesomeIcon icon={faMoon} className="text-lg" />
            </span>
        </button>
    )
}
