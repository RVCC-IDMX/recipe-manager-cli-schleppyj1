import globals from "globals";
import pluginJs from "@eslint/js";
import json from "@eslint/json";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global settings for both browser and Node environments
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Recommended JavaScript linting rules
  pluginJs.configs.recommended,
  // Add JSON plugin to support linting JSON files
  {
    plugins: {
      json,
    },
  },
  // Lint JSON files for duplicate keys using @eslint/json
  {
    files: ["**/*.json"],
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
];
