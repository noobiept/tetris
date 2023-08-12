/* eslint-env node */
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "simple-import-sort"],
    root: true,
    ignorePatterns: ["node_modules", "release", "build"],
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
};
