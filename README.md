# CodeStyle

![npm version](https://img.shields.io/npm/v/@labeg/code-style.svg)
![npm downloads](https://img.shields.io/npm/dm/@labeg/code-style.svg)
![GitHub](https://img.shields.io/github/license/LabEG/code-style.svg)
![build status](https://github.com/LabEG/code-style/workflows/Test%20Pull%20Request/badge.svg)

Comprehensive ESLint configuration for TypeScript and React projects with strict code quality rules.

## Features

- ✅ **ESLint 9+** with flat config format
- ✅ **TypeScript** support with strict rules
- ✅ **React 19+** and React Hooks best practices
- ✅ **Accessibility** checks (jsx-a11y)
- ✅ **Code style** enforcement (@stylistic)
- ✅ **Modern JavaScript** standards

## Installation

Install the package as a dev dependency:

```bash
npm install -D @labeg/code-style
```

## Usage

### ESLint 9+ (Flat Config)

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

```javascript
import codeStyle from "@labeg/code-style";

export default [
    ...codeStyle,
    {
        rules: {
            // Next.js specific overrides
            "react/react-in-jsx-scope": "off"
        }
    }
];
```

### TypeScript Projects

The configuration automatically works with TypeScript files (`.ts`, `.tsx`). Make sure you have `typescript` installed:

```bash
npm install -D typescript
```


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

### Line Length: 120 Characters, Indent: 4 Spaces

Optimal line length is 120 characters for readability across different monitors. Use 4-space indentation for clear nesting levels.

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
