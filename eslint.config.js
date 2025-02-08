import pluginJs from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        settings: { react: { version: "detect" } },
    },
    {
        ignores: [
            "**/node_modules/**",
            "release/**",
            "build/**",
            "**/coverage/**",
        ],
    },
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
    },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    react.configs.flat.recommended,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
            "react-hooks": reactHooks,
        },
    },
    {
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "react/react-in-jsx-scope": "off",
        },
    },
];
