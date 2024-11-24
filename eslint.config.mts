// Issue #31
// https://github.com/eslint/eslint/issues/18100#issuecomment-1971500684
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { ESLint } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
// Issue #31
// https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslintConfigPrettier,
    { ignores: ["dist"] },
    {
        extends: [
            js.configs.all,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],

        files: ["**/*.{tsx,mts}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "react-hooks": reactHooks as ESLint.Plugin,
            "react-refresh": reactRefresh,
            // Issue #30
            // https://github.com/LeetABit/DGTiles/issues/30
            react: react as ESLint.Plugin,
            tsPlugin,
        },
        rules: {
            ...react.configs.all.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
            "react-refresh/only-export-components": [
                "warn",
                // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#:~:text=allowConstantExport%20(v0.4.0)
                // This should be enabled if the fast refresh implementation correctly handles this case (HMR when the constant doesn't change,
                // Propagate update to importers when the constant changes.). Vite supports it
                { allowConstantExport: true },
            ],
        },
        settings: { react: { version: "18.3" } },
    },
);
