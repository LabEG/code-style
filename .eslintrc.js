module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react", "@typescript-eslint"],
    extends: [
        "eslint:all",
        "plugin:react/all",
        "plugin:@typescript-eslint/all"
    ],
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    ignorePatterns: ["node_modules/*"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "sort-imports": "off", // need found sorter
        "max-len": ["error", { code: 140, comments: 140 }], // for modern screens
        "padded-blocks": ["error", { classes: "always", blocks: "never", switches: "never" }], // more nice
        "function-call-argument-newline": ["error", "consistent"], // maybe later?
        "quote-props": ["error", "as-needed"], // more nice
        "sort-keys": "off", // more nice
        "class-methods-use-this": "off", // false positives
        "one-var": ["error", "never"], // more nice
        "no-ternary": "off", // more nice
        "multiline-ternary": ["error", "always-multiline"], // more nice
        "array-element-newline": ["error", "consistent"], // more nice
        "operator-linebreak": ["error", "after"], // more nice
        "no-void": "off", // strange rule
        "max-params": ["error", { "max": 4 }], // maybe later?
        "no-bitwise": "off", // needed
        "prefer-named-capture-group": "off", // maybe later?
        "dot-location": ["error", "property"], // more nice
        "no-inline-comments": "off", // maybe later?
        "line-comment-position": "off", // maybe later?

        "react/jsx-no-literals": "off", // broken rule, not work with ??
        "react/jsx-max-depth": ["error", { "max": 10 }], // to small by default
        "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }], // for typescript
        "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }], // same as eslint func-styles
        "react/no-danger": "off", // for insert html
        "react/forbid-component-props": "off", // conflict with styled-components
        "react/jsx-uses-react": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
        "react/react-in-jsx-scope": "off", // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
        "react/sort-comp": "off", // need write priority

        "@typescript-eslint/no-inferrable-types": "off", // need for reflection
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off", // wrong immutable undestand
        "@typescript-eslint/no-floating-promises": "off", // block async promises
        "@typescript-eslint/no-extra-parens": "off", // conflict with react best practise in jsx
        "@typescript-eslint/promise-function-async": "off", // more nice
        "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }], // more nice
        "@typescript-eslint/naming-convention": "off", // bad with react func components
        "@typescript-eslint/no-confusing-void-expression": "off", // more nice
        "@typescript-eslint/member-ordering": "off", // need correct priority
    }
};