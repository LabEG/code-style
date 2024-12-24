// eslint.config.js
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import stylistic from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default tseslint.config(
    js.configs.all,
    tseslint.configs.all,
    stylistic.configs["all-flat"],
    reactPlugin.configs.flat.all,
    jsxA11y.flatConfigs.strict,
    {
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            // Eslint rules
            "sort-imports": "off", // Need found sorter
            "sort-keys": "off", // More nice
            "one-var": ["error", "never"], // More nice
            "no-ternary": "off", // More nice
            "no-void": "off", // Strange rule
            "no-bitwise": "off", // Used in many projects
            "no-inline-comments": "off", // Maybe later?
            "line-comment-position": "off", // Maybe later?


            // Eslint moved to Stylistic, but now to buggy for js. Remove after fix bugs in new versions Stylistic
            "max-len": [
                "error", {
                    code: 140,
                    comments: 140
                }
            ], // More nice, for modern screens
            "padded-blocks": [
                "error", {
                    classes: "always",
                    blocks: "never",
                    switches: "never"
                }
            ], // More nice
            "function-call-argument-newline": ["error", "consistent"], // More nice
            "quote-props": ["error", "as-needed"], // More nice
            "multiline-ternary": ["error", "always-multiline"], // More nice
            "array-element-newline": ["error", "consistent"], // More nice
            "operator-linebreak": ["error", "after"], // More nice

            // Stylistic rules
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


            /**
             * Copied from TS part
             */

            "no-duplicate-imports": "off", // Bug, conflict between TS import and import type

            "@typescript-eslint/no-inferrable-types": "off", // Need for reflection
            "@typescript-eslint/no-magic-numbers": "off",
            "@typescript-eslint/prefer-readonly-parameter-types": "off", // Wrong immutable undestand
            "@typescript-eslint/no-floating-promises": "off", // Block async promises
            "@typescript-eslint/no-extra-parens": "off", // Conflict with react best practise in jsx
            "@typescript-eslint/promise-function-async": "off", // More nice
            "@typescript-eslint/no-misused-promises": ["error", {checksVoidReturn: false}], // More nice
            "@typescript-eslint/naming-convention": "off", // Bad with react func components
            "@typescript-eslint/no-confusing-void-expression": "off", // More nice
            "@typescript-eslint/member-ordering": "off", // Need correct priority

            "react/jsx-filename-extension": ["error", {extensions: [".tsx"]}], // Added typescript file extension
            "react/jsx-no-literals": "off", // Broken rule, not work with ??
            "react/jsx-max-depth": ["error", {max: 10}], // To small by default
            "react/function-component-definition": ["error", {namedComponents: "arrow-function"}], // Same as eslint func-styles
            "react/forbid-component-props": "off", // Conflict with styled-components
            "react/require-default-props": "off", // Don't used in modern react
            "react/jsx-uses-react": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
            "react/react-in-jsx-scope": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

        }
    }
);