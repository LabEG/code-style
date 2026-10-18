# CodeStyle

![npm version](https://img.shields.io/npm/v/@labeg/code-style.svg)
![npm downloads](https://img.shields.io/npm/dm/@labeg/code-style.svg)
![GitHub](https://img.shields.io/github/license/LabEG/code-style.svg)
![build status](https://github.com/LabEG/code-style/workflows/Test%20Pull%20Request/badge.svg)
[![CodeQL](https://github.com/LabEG/code-style/workflows/CodeQL%20Advanced/badge.svg)](https://github.com/LabEG/code-style/security/code-scanning)

Comprehensive ESLint configuration for TypeScript and React projects with strict code quality rules.

## Features

- ✅ **ESLint 10** with flat config format (`defineConfig`)
- ✅ **TypeScript** support with strict rules
- ✅ **React 19+** and React Hooks best practices
- ✅ **Accessibility** checks (jsx-a11y-x)
- ✅ **Code style** enforcement (@stylistic)
- ✅ **Modern JavaScript** standards

## Included Plugins

This configuration includes and configures the following ESLint plugins:

- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)** - Core ESLint JavaScript rules
- **[typescript-eslint](https://typescript-eslint.io/)** - TypeScript-specific linting rules
- **[@stylistic/eslint-plugin](https://eslint.style/)** - Code formatting and style rules
- **[@eslint-react/eslint-plugin](https://github.com/Rel1cx/eslint-react)** - React-specific linting rules
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** - Rules for React Hooks
- **[eslint-plugin-jsx-a11y-x](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x)** - Accessibility rules for JSX (community fork of eslint-plugin-jsx-a11y with ESLint 10 support)

## Installation

Install the package as a dev dependency:

```bash
npm install -D @labeg/code-style
```

Requires Node.js `>= 20.19.0`. Peer requirements: `typescript >= 5.0.0`. ESLint and all plugins (including `eslint-plugin-jsx-a11y-x`) are regular dependencies of this package.

## Usage

### ESLint 10 (Flat Config)

Create or update your `eslint.config.js`:

```javascript
import codeStyle from "@labeg/code-style";

export default [
    ...codeStyle,
    {
        // Your custom overrides
        rules: {
            // Override specific rules here
        }
    }
];
```

### Next.js Projects

`next lint` was removed in Next.js 16, and `eslint-config-next` bundles its own copies of the react-hooks/jsx-a11y/import plugins, which collide with this package ("Cannot redefine plugin"). Use the Next.js plugin directly instead:

```bash
npm install -D @next/eslint-plugin-next
```

```javascript
import nextPlugin from "@next/eslint-plugin-next";
import codeStyle from "@labeg/code-style";

export default [
    ...codeStyle,
    nextPlugin.configs["flat/core-web-vitals"]
];
```

### TypeScript Projects

The configuration automatically works with TypeScript files (`.ts`, `.tsx`). Make sure you have `typescript` installed:

```bash
npm install -D typescript
```

For `.ts` and `.tsx` files the config enables type-aware rules via `projectService`, so the linted files must be included in your `tsconfig.json`.


## Code Style Philosophy

### Always End Lines with Operators or Semicolons

Lines should always end with an operator or semicolon to make it clear whether the statement continues. This saves reading time and prevents execution errors.

```typescript
// Bad - unclear if statement continues
let sample = sample.sample.sample
                 + sample.sample.sample;

// Good - operator at end shows continuation
let sample = sample.sample.sample +
                 sample.sample.sample;
```

### Always Use Braces for If Statements

Even for single-line statements, always use braces. This prevents bugs during refactoring and improves code clarity.

```typescript
// Bad
if (n > 10) alert("Bad");

// Good
if (n > 10) {
    alert("Good");
}
```

### Use Double Quotes and Template Literals

Use double quotes for consistency with other languages, and template literals for string interpolation.

```typescript
const message = "rolls";
const count = 5;

// Bad
const data = 'Sending "grandma" ' + count * 5 + ' ' + message + '.';

// Good
const data = `Sending "grandma" ${count * 5} ${message}.`;
```

### Line Length: 140 Characters, Indent: 4 Spaces

Optimal line length is 140 characters for readability across different monitors. Use 4-space indentation for clear nesting levels.

### Prettier

Formatting is primarily handled by `@stylistic/eslint-plugin` (auto-fix on save or via `eslint --fix`). The package also ships a `.prettierrc` aligned with these settings (140 character line length, 4-space indent, double quotes, no trailing commas) for projects that use Prettier. Note that mixing Prettier with `@stylistic` fixable rules can lead to conflicting output — prefer one tool for formatting.

## Security

For security concerns, please see our [Security Policy](./SECURITY.md).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT © Eugene Labutin

## Links

- [npm package](https://www.npmjs.com/package/@labeg/code-style)
- [GitHub repository](https://github.com/LabEG/code-style)
- [Issue tracker](https://github.com/LabEG/code-style/issues)
- [Changelog](./CHANGELOG.md)
