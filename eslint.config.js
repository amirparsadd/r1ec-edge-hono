import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/dist/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
]);