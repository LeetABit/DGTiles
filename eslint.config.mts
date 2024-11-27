//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import tseslint, { ConfigWithExtends } from "typescript-eslint";
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

const defaultConfig: ConfigWithExtends = {
    extends: [
        js.configs.all,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
    ],
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
        ...react.configs["jsx-runtime"].rules,
        "init-declarations": ["error"],
        "react/jsx-uses-react": ["off"],
        "react/react-in-jsx-scope": ["off"],
        ...reactHooks.configs.recommended.rules,
        "no-magic-numbers": ["error", { ignore: [0, 1] }],
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
};

export default tseslint.config(
    eslintConfigPrettier,
    { ignores: ["dist"] },
    {
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: { react: { version: "18.3" } },
    },
    defaultConfig,
    {
        files: ["**/*.d.mts"],
        rules: {
            ...defaultConfig.rules,
            "init-declarations": ["off"],
        },
    },
    {
        files: ["**/*.{tsx,mts}"],
        ignores: ["**/*.d.mts"],
        rules: {
            ...defaultConfig.rules,
        },
    },
);
