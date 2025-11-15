# Security Policy

## Supported Versions

We actively support the following versions of `@labeg/code-style` with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 6.x     | :white_check_mark: |
| 5.x     | :x:                |
| < 5.0   | :x:                |

## Reporting a Vulnerability

We take the security of `@labeg/code-style` seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Send a detailed report to the repository maintainer via:
   - GitHub Security Advisory: [Report a vulnerability](https://github.com/LabEG/code-style/security/advisories/new)
   - Email: Create an issue in the [issue tracker](https://github.com/LabEG/code-style/issues) marked as **Security** (if no sensitive details need to be shared)

### What to Include

Please provide the following information in your report:

- **Description**: A clear description of the vulnerability
- **Impact**: What could an attacker accomplish by exploiting this vulnerability
- **Reproduction**: Step-by-step instructions to reproduce the issue
- **Version**: The version of `@labeg/code-style` affected
- **Environment**: Relevant environment details (Node.js version, ESLint version, etc.)
- **Suggested Fix** (optional): If you have ideas on how to fix the vulnerability

### Response Timeline

- **Initial Response**: Within 48 hours of receiving the report
- **Status Update**: Within 7 days with either a fix timeline or request for more information
- **Resolution**: Security patches will be released as soon as possible, typically within 14 days for critical issues

### Security Update Process

1. The vulnerability is confirmed and assessed
2. A fix is developed and tested
3. A security advisory is prepared
4. A new version is released with the fix
5. The security advisory is published with CVE (if applicable)

## Security Best Practices

When using `@labeg/code-style`:

### For Package Consumers

- Always use the latest stable version
- Regularly update dependencies using `npm update` or `npm audit fix`
- Review the [CHANGELOG](./CHANGELOG.md) for security-related updates
- Use `npm audit` to check for known vulnerabilities in dependencies

### For Contributors

- Follow secure coding practices
- Run `npm audit` before submitting pull requests
- Never commit sensitive information (API keys, passwords, tokens)
- Test changes thoroughly with various configurations

## Dependency Security

This package relies on ESLint and related plugins. We:

- Monitor security advisories for all dependencies
- Update dependencies promptly when security issues are discovered
- Use `npm audit` in our CI/CD pipeline
- Follow semantic versioning to ensure stable updates

## Known Security Considerations

As a linting configuration package, `@labeg/code-style`:

- **Does not execute untrusted code** - it only provides configuration
- **Does not access network resources** - all operations are local
- **Does not handle sensitive data** - it analyzes code structure only
- **Runs in development environments** - not typically part of production builds

However, always ensure you:

- Install packages from official npm registry
- Verify package integrity using `npm audit`
- Review configuration changes before applying

## Disclosure Policy

When a security vulnerability is fixed:

1. We will credit the reporter (unless they wish to remain anonymous)
2. Details will be disclosed after a fix is available
3. We will publish a security advisory on GitHub
4. The vulnerability will be documented in the CHANGELOG

## Contact

For any security-related questions or concerns, please:

- Open a [GitHub Security Advisory](https://github.com/LabEG/code-style/security/advisories/new)
- Create an issue at: <https://github.com/LabEG/code-style/issues>

---

Thank you for helping keep `@labeg/code-style` and its users safe!
