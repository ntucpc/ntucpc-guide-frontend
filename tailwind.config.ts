import type { Config } from "tailwindcss"
const colors = require("tailwindcss/colors")

// Refer to a semantic color token defined in styles/global.css
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`

const config: Config = {
    // Dark mode is toggled by the `dark` class on <html> (see lib/theme.ts)
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: [
                '"var(--noto-sans-tc)"',
                "ui-sans-serif",
                "system-ui",
                "sans-serif",
            ],
        },
        extend: {
            colors: {
                page: token("page"),
                surface: {
                    DEFAULT: token("surface"),
                    subtle: token("surface-subtle"),
                    muted: token("surface-muted"),
                    strong: token("surface-strong"),
                },
                fg: {
                    strong: token("fg-strong"),
                    DEFAULT: token("fg"),
                    secondary: token("fg-secondary"),
                    tertiary: token("fg-tertiary"),
                    muted: token("fg-muted"),
                    subtle: token("fg-subtle"),
                    faint: token("fg-faint"),
                    ghost: token("fg-ghost"),
                },
                line: {
                    subtle: token("line-subtle"),
                    DEFAULT: token("line"),
                    strong: token("line-strong"),
                },
                accent: Object.fromEntries(
                    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                        (shade) => [shade, token(`accent-${shade}`)]
                    )
                ),
            },
            // Default for `border` without a color (Tailwind's default is gray-200, same as line-strong in light mode)
            borderColor: {
                DEFAULT: token("line-strong"),
            },
            backgroundImage: {
                home: "url('/background.png')",
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar")({
            nocompatible: true,
            preferredStrategy: "pseudoelements",
        }),
    ],
}
export default config
