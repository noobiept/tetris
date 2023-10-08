import { defineConfig } from "vitest/config";

const COVERAGE_TARGET = 75;

export default defineConfig({
    root: "./source",

    test: {
        environment: "jsdom",
        setupFiles: ["./setup-tests.ts"],
        coverage: {
            enabled: true,
            skipFull: true,
            lines: COVERAGE_TARGET,
            statements: COVERAGE_TARGET,
            functions: COVERAGE_TARGET,
            branches: COVERAGE_TARGET,
            reporter: ["text", "json", "html"],
        },
    },
});
