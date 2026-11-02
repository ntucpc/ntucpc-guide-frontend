import type { Config } from "tailwindcss"
const colors = require("tailwindcss/colors")

const config: Config = {
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
