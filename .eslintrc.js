"use strict"

/**
 * Good instruction:
 * https://duncanleung.com/eslint-mixed-javascript-typescript-files-codebase/
 */

const jsAndTsRules = {
    "sort-imports": "off", // Need found sorter
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
    "sort-keys": "off", // More nice
    "class-methods-use-this": "off", // False positives
    "one-var": ["error", "never"], // More nice
    "no-ternary": "off", // More nice
    "multiline-ternary": ["error", "always-multiline"], // More nice
    "array-element-newline": ["error", "consistent"], // More nice
    "operator-linebreak": ["error", "after"], // More nice
    "no-void": "off", // Strange rule
    "max-params": ["error", {max: 4}], // Maybe later?
    "no-bitwise": "off", // Used in many projects
    "prefer-named-capture-group": "off", // Maybe later?
    "dot-location": ["error", "property"], // More nice
    "no-inline-comments": "off", // Maybe later?
    "line-comment-position": "off", // Maybe later?

    "no-duplicate-imports": "off" // Bug, remove later
};

module.exports = {
    extends: [
        "eslint:all" // There is no React because they are used strictly with Typescript.
    ],
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    ignorePatterns: ["node_modules/*"],
    rules: {
        ...jsAndTsRules
    },
    overrides: [
        {
            files: ["**/*.{ts,tsx}"],
            settings: {
                react: {
                    version: "detect"
                },
                "import/parsers": {
                    "@typescript-eslint/parser": [".ts", ".tsx"]
                },
                "import/resolver": {
                    typescript: {
                        project: "tsconfig.json"
                    }
                }
            },
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "tsconfig.json",
                sourceType: "module",
                ecmaVersion: "latest",
                ecmaFeatures: {
                    jsx: true
                }
            },
            extends: [
                "eslint:all",
                "plugin:@typescript-eslint/all",
                "plugin:react/all",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/strict"
            ],
            rules: {
                ...jsAndTsRules,
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

                "@typescript-eslint/keyword-spacing": "off", // Bug, remove later
                "@typescript-eslint/no-import-type-side-effects": "off", // Bug, remove later

                "react/jsx-filename-extension": ["error", {extensions: [".tsx"]}], // Added typescript file extension
                "react/jsx-no-literals": "off", // Broken rule, not work with ??
                "react/jsx-max-depth": ["error", {max: 10}], // To small by default
                "react/function-component-definition": ["error", {namedComponents: "arrow-function"}], // Same as eslint func-styles
                "react/forbid-component-props": "off", // Conflict with styled-components
                "react/jsx-uses-react": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
                "react/react-in-jsx-scope": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
                "react/sort-comp": "off" // Need write priority
            }
        }
    ]
};
