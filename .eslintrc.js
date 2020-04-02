module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: ["eslint:all", "plugin:react/all", "plugin:@typescript-eslint/all"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react", "@typescript-eslint"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "linebreak-style": ["error", "windows"],
        "sort-imports": "off",
        "object-curly-spacing": ["error", "always"],
        "max-len": ["error", { code: 140, comments: 140 }],
        "padded-blocks": ["error", { classes: "always", blocks: "never", switches: "never" }],
        "lines-between-class-members": "off",
        "function-call-argument-newline": ["error", "consistent"],
        "quote-props": ["error", "as-needed"],
        "sort-keys": "off",
        "max-classes-per-file": ["error", 5],
        "class-methods-use-this": "off",
        "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
        "max-statements": ["error", 30],
        "no-negated-condition": "off",
        "one-var": ["error", "never"],
        "no-ternary": "off",
        "multiline-ternary": ["error", "always-multiline"],
        "id-length": "off",
        "camelcase": "off", // починить код и вернуть правило
        "max-lines-per-function": ["error", { "max": 300 }],
        "array-element-newline": ["error", "consistent"],
        "lines-around-comment": ["error", { allowBlockStart: true }],
        "operator-linebreak": ["error", "after"],
        "no-return-assign": "off",
        "capitalized-comments": "off",
        "no-void": "off",
        "max-params": ["error", { "max": 4 }],
        "no-bitwise": "off",
        "prefer-named-capture-group": "off",
        "dot-location": ["error", "property"],
        "no-inline-comments": "off",
        "line-comment-position": "off",
        "yoda": ["error", "never", { exceptRange: true }],

        "react/jsx-closing-bracket-location": ["error", "after-props"],
        "react/jsx-first-prop-new-line": ["error", "never"],
        "react/jsx-no-literals": "off",
        "react/jsx-no-bind": "off", // maybe deprecate later?
        "react/jsx-max-props-per-line": ["error", { maximum: 2 }],
        "react/jsx-sort-props": ["error", { noSortAlphabetically: true }],
        "react/jsx-max-depth": ["error", { "max": 10 }],
        "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
        "react/no-array-index-key": "off",
        "react/destructuring-assignment": "off",
        "react/no-adjacent-inline-elements": "off", // crash linting
        "react/function-component-definition": "off",
        "react/prop-types": "off",
        "react/no-danger": "off",
        "react/sort-comp": "off",
        "react/no-multi-comp": ["error", { ignoreStateless: true }],

        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": ["error", { ignoreArgsIfArgsAfterAreUsed: true }],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "{}": "Use classes instead",
                "String": {
                    "message": "Use string instead",
                    "fixWith": "string"
                },
                "Number": {
                    "message": "Use number instead",
                    "fixWith": "number"
                },
                "Boolean": {
                    "message": "Use boolean instead",
                    "fixWith": "boolean"
                }
            },
            "extendDefaults": false
        }],
        "@typescript-eslint/space-before-function-paren": ["error", "never"],
        "@typescript-eslint/no-use-before-define": ["error", { classes: false }],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true, allowNullable: true }],
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/explicit-member-accessibility": ["error", { overrides: { constructors: "off" } }],
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }],
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/return-await": ["error", "always"],
        "@typescript-eslint/no-unused-vars-experimental": ["error", { ignoreArgsIfArgsAfterAreUsed: true }],
    }
};