import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*.svg", "**/*.json", "**/*.md", "**/*.bicep"],
    files: ["./*.{ts,tsx,js,jsx,mjs}", "./src/**/*.{ts,tsx,js,jsx,mjs}", "./scripts/**/*.{ts,tsx,js,jsx,mjs}"],
}, ...fixupConfigRules(compat.extends(
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "only-warn": onlyWarn,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },

    rules: {
        "no-nested-ternary": "off",

        "import/extensions": ["warn", "never", {
            json: "always",
            mjs: "always",
        }],

        camelcase: ["warn", {
            allow: ["jwks_uri", "client_id", "redirect_uri", "response_mode", "response_type"],
        }],

        "comma-dangle": ["warn", "always-multiline"],
        "no-undef": "off",

        "max-len": ["warn", {
            code: 180,
        }],

        "react/react-in-jsx-scope": "off",

        "react/jsx-filename-extension": ["warn", {
            extensions: [".jsx", ".tsx"],
        }],

        indent: ["warn", 4, {
            SwitchCase: 1,
        }],

        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/function-component-definition": "off",

        "react/jsx-no-useless-fragment": ["warn", {
            allowExpressions: true,
        }],

        "import/no-extraneous-dependencies": ["warn", {
            devDependencies: true,
        }],

        "object-curly-newline": ["warn", {
            ImportDeclaration: "never",
        }],

        semi: "off",
        "no-use-before-define": "off",

        "@typescript-eslint/no-use-before-define": ["warn", {
            ignoreTypeReferences: true,
            functions: false,
        }],

        "no-plusplus": "off",
        "no-restricted-exports": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "arrow-body-style": "off",
        "import/prefer-default-export": "off",
        "react/static-property-placement": "off",
        "react/prefer-stateless-function": "off",
        "react/self-closing-comp": "warn",
        "lines-between-class-members": "off",
        "arrow-parens": "off",
        "no-restricted-syntax": "off",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "warn",

        "no-param-reassign": ["warn", {
            props: true,
            ignorePropertyModificationsFor: ["state"],
        }],

        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            ignoreRestSiblings: true,
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],

        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": "off",
        "react/prop-types": "off",

        // "@typescript-eslint/ban-types": ["warn", {
        //     types: {
        //         "{}": false,
        //     },

        //     extendDefaults: true,
        // }],

        "react/no-unknown-property": ["warn", {
            ignore: ["css"],
        }],

        "no-await-in-loop": "off",
        "no-underscore-dangle": "off",

        "@typescript-eslint/no-explicit-any": ["warn", {
            ignoreRestArgs: true,
        }],
    },
}];
