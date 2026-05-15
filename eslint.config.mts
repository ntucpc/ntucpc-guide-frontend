import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import unusedImports from "eslint-plugin-unused-imports"

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {
            js,
            "unused-imports": unusedImports,
            reactPlugin: pluginReact,
        },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules: {
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
])
