# ADR-018: Prettier for Code Formatting

## Status

Accepted

## Context

To maintain a consistent code style and reduce time spent on formatting
discussions during code reviews, the project requires an automated code
formatting solution. Manual formatting is error-prone, subjective, and often a
source of unnecessary merge conflicts. The formatter must support JavaScript,
TypeScript, JSON, CSS, and other common file types in the codebase, and
integrate well with ESLint and modern development tools.

## Decision

We decided to use **Prettier** as the automated code formatter for the project.

## Reasons

1. **Opinionated and Consistent Formatting**:
   - Prettier enforces a consistent style by parsing code and reprinting it,
     removing the need for subjective stylistic decisions.

2. **Multi-language Support**:
   - Supports formatting for JavaScript, TypeScript, JSON, HTML, CSS, Markdown,
     and more, covering most files in the project.

3. **Integration with ESLint**:
   - Prettier can work alongside ESLint using `eslint-plugin-prettier` and
     `eslint-config-prettier`, allowing for unified linting and formatting
     workflows.

4. **Editor and Tooling Support**:
   - Integrates with popular editors like VS Code and supports auto-formatting
     on save, streamlining the developer experience.

5. **Reduces Merge Conflicts**:
   - Automated formatting ensures consistent structure, minimizing diff noise
     and merge conflicts caused by stylistic changes.

6. **Minimal Configuration**:
   - Prettier works well out of the box, with sensible defaults and minimal need
     for customization.

7. **Improved Code Review Focus**:
   - Shifts the focus of code reviews from style-related issues to logic and
     architecture.

## Consequences

1. **Opinionated Choices**:
   - Some formatting decisions made by Prettier may not align with personal or
     team preferences, but these cannot be customized in detail.

2. **Initial Setup and Formatting Overhead**:
   - Introducing Prettier to an existing codebase may require reformatting large
     parts of the project, leading to significant diffs initially.

3. **Requires Developer Buy-in**:
   - Developers must adapt to automated formatting and avoid manual styling
     efforts.

## Alternatives Considered

### Relying on ESLint Alone:

- **Pros**: ESLint can handle some formatting via rules.
- **Cons**: Not as comprehensive, less reliable for formatting multiline
  structures, and requires more manual rule tuning.

### Manual Formatting:

- **Pros**: Full control over style.
- **Cons**: Inconsistent results, wastes time during reviews, and is prone to
  human error.

### Rome (Built-in Formatter):

- **Pros**: Fast, integrated with bundling and linting.
- **Cons**: Not yet mature or widely adopted; lacks full Prettier feature
  parity.
