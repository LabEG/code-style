// eslint.config.js
import {defineConfig, globalIgnores} from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import globals from "globals";

/**
 * For Next.js use @next/eslint-plugin-next instead of eslint-config-next to avoid plugin redefine conflicts.
 *
 * Help by links:
 * https://github.com/eslint/eslint/discussions/18304
 */

export default defineConfig([
    globalIgnores(["**/node_modules/**", "**/dist/**"]),

    // Files-only config: declares lintable extensions (notably .jsx) for directory-based linting
    {files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"]},

    js.configs.all,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    stylistic.configs.all,
    eslintReact.configs.all,
    reactHooks.configs.flat.recommended,
    jsxA11y.configs.strict,

    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            ...tseslint.configs.strictTypeCheckedOnly,
            ...tseslint.configs.stylisticTypeCheckedOnly
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true // Resolves tsconfig by file location, no tsconfigRootDir needed
            }
        },
        rules: {
            "@typescript-eslint/no-inferrable-types": "off", // Need for reflection
            "@typescript-eslint/no-magic-numbers": "off",
            "@typescript-eslint/prefer-readonly-parameter-types": "off", // Wrong immutable undestand
            "@typescript-eslint/no-floating-promises": "off", // Block async promises
            "@typescript-eslint/no-extra-parens": "off", // Conflict with react best practise in jsx
            "@typescript-eslint/promise-function-async": "off", // More nice
            "@typescript-eslint/no-misused-promises": ["error", {checksVoidReturn: false}], // More nice
            "@typescript-eslint/naming-convention": "off", // For react covered by @eslint-react/naming-convention/*
            "@typescript-eslint/no-confusing-void-expression": "off", // More nice
            "@typescript-eslint/member-ordering": "off" // Need correct priority
        }
    },

    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {

            /**
             * Eslint rules
             */
            "no-magic-numbers": "off", // Conflict with void 0
            "sort-imports": "off", // Need found sorter
            "sort-keys": "off", // More nice
            "one-var": ["error", "never"], // More nice
            "no-ternary": "off", // More nice
            "no-void": "off", // Strange rule
            "no-bitwise": "off", // Used in many projects
            "no-inline-comments": "off", // Maybe later?
            "line-comment-position": "off", // Maybe later?


            /**
             * Stylistic rules
             */
            "@stylistic/max-len": [
                "error", {
                    code: 140,
                    comments: 140
                }
            ], // More nice, for modern screens
            "@stylistic/padded-blocks": [
                "error", {
                    classes: "always",
                    blocks: "never",
                    switches: "never"
                }
            ], // More nice
            "@stylistic/function-call-argument-newline": ["error", "consistent"], // More nice
            "@stylistic/quote-props": ["error", "as-needed"], // More nice
            "@stylistic/multiline-ternary": ["error", "always-multiline"], // More nice
            "@stylistic/array-element-newline": ["error", "consistent"], // More nice
            "@stylistic/operator-linebreak": ["error", "after"], // More nice
            "@stylistic/no-extra-parens": "off",
            "@stylistic/dot-location": ["error", "property"], // Maybe later?
            "@stylistic/indent-binary-ops": ["error", 4] // Other indends in stylistic 4
        }
    }
]);
