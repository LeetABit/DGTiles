// Issue #31
// https://github.com/eslint/eslint/issues/18100#issuecomment-1971500684
import { ESLint } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
// Issue #31
// https://github.com/facebook/react/issues/30119
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";
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
            // Issue #30
            // https://github.com/LeetABit/DGTiles/issues/30
            react: react as ESLint.Plugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            tsPlugin,
        },
        rules: {
            ...react.configs.all.rules,
            //...react.configs["jsx-runtime"].rules,
            "init-declarations": ["off"],
            "react/jsx-uses-react": ["off"],
            "react/react-in-jsx-scope": ["off"],
            ...reactHooks.configs.recommended.rules,
            "no-magic-numbers": ["error", { ignore: [0] }],
            "no-ternary": ["off"],
            "no-undefined": ["off"],
            "one-var": ["error", "never"],
            "react-refresh/only-export-components": [
                "error",
                // https://github.com/ArnaudBarre/eslint-plugin-react-refresh#:~:text=allowConstantExport%20(v0.4.0)
                // This should be enabled if the fast refresh implementation correctly handles this case (HMR when the constant doesn't change,
                // Propagate update to importers when the constant changes.). Vite supports it
                { allowConstantExport: true },
            ],
            "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
            "react/require-default-props": [
                "error",
                { functions: "defaultArguments" },
            ],
        },
        settings: { react: { version: "18.3" } },
    },
);
