import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ntucpc-website-common-lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|purple|fuchsia|pink|rose)-\d{3}/,
      variants: ["hover"]
    },
    {
      pattern: /[mp][lrbtxy]-\d+/
    }
  ],
  theme: {
    fontFamily:{
        'sans': ['ui-sans-serif', 'system-ui', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'home': "url('/background.png')"
      }
    }
  },
  plugins: [],
};
export default config;
