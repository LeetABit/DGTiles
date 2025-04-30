# Code Quality

This document outlines the code quality practices followed in the project to
ensure high-quality, maintainable, and consistent code.

## Type Checking

The project enforces strict type checking to improve code reliability and
maintainability. Type checking helps catch errors at compile time, reducing
runtime bugs and improving developer productivity.

### TypeScript

- **Purpose**: Provides static typing and supports modern JavaScript features.
- **Configuration**: Defined in the [`tsconfig.json`](../../tsconfig.json) file,
  which includes strict type-checking options such as `strict`, `noImplicitAny`,
  and `strictNullChecks`.

## Formatting

The project ensures consistent code formatting across the codebase to maintain
readability and reduce manual formatting efforts.

### EditorConfig

- **Purpose**: Standardizes indentation, line endings, and other formatting
  settings across all contributors' environments.
- **Configuration**: Defined in the [`.editorconfig`](../../.editorconfig) file.

### .gitattributes

- **Purpose**: Ensures consistent handling of line endings and other file
  attributes across different operating systems.
- **Configuration**: Defined in the [`.gitattributes`](../../.gitattributes)
  file.

### Spell Checker Extension

- **Purpose**: Ensures proper spelling in comments, documentation, and commit
  messages.
- **Configuration**: The project recommends using the
  `streetsidesoftware.code-spell-checker` extension for VS Code, as specified in
  the [`.vscode/extensions.json`](../../.vscode/extensions.json) file.

## Linting

The project enforces coding standards and identifies potential issues in the
code to maintain high-quality and consistent code.

### ESLint

- **Purpose**: Lints the codebase to enforce coding standards and identify
  potential issues.
- **Configuration**: Defined in the
  [`eslint.config.mts`](../../eslint.config.mts) file, which includes rules for
  code quality, style, and best practices.

### TypeScript-ESLint

- **Purpose**: Integrates TypeScript with ESLint to enable linting for
  TypeScript-specific syntax and features.
- **Configuration**: Included as part of the ESLint configuration in the
  [`eslint.config.mts`](../../eslint.config.mts) file.

### Stylistic ESLint Plugin

- **Purpose**: Provides stylistic linting rules to enforce consistent code
  formatting and style.
- **Configuration**: Included in the ESLint configuration in the
  [`eslint.config.mts`](../../eslint.config.mts) file.

## Testing

The project ensures code correctness and reliability through comprehensive
testing.

### Vitest

- **Purpose**: Provides a testing framework for unit and integration tests.
- **Configuration**: Vitest is configured directly in the `package.json` file
  under the `test` script.
- **Integration**: Tests are run automatically in the CI pipeline to catch
  issues early.
