import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "airbnb-base",
    "plugin:import/typescript",
    "prettier",
    )),
    {
        ignores: ['eslint.config.mjs'],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: fixupPluginRules(_import),
            "unused-imports": unusedImports,
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        "import/resolver": {
            alias: {
                map: [["@", "./src"], ["~", "./"]],
                extensions: [".ts", ".js", ".json"],
            },
        },
    },

    rules: {
        "consistent-return": "off",
        "no-underscore-dangle": "off",

        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "unused-imports/no-unused-imports": "error",

        "import/order": ["error", {
            groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
            },
        }],

        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
        }],

        "no-restricted-imports": ["error", {
            patterns: ["./*", "../*"],
        }],
    },
}];