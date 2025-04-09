# ADR-017: Linter

## Status

Accepted

## Context

The project needs a robust linting solution to catch potential issues early, and
maintain high code quality. As the codebase scales and involves multiple
contributors, manual code reviews for formatting and style become inefficient.
A linter should integrate well with TypeScript, modern frameworks like React,
and tools like Prettier and Vite.

## Decision

We decided to use ESLint as the primary linting tool for the project.

## Reasons

1. **Extensibility and Ecosystem**:
   - ESLint is highly configurable and has a vast ecosystem of plugins and
     shared configs (e.g., Airbnb, Prettier, TypeScript support).

2. **TypeScript Support**:
   - ESLint supports TypeScript, enabling static
     analysis and style enforcement in typed codebases.

3. **Integration with Prettier**:
   - ESLint can be configured to work alongside Prettier for code formatting,
     using plugins to avoid conflicts.

4. **Framework Compatibility**:
   - ESLint integrates well with modern frameworks such as React and Next.js,
     supporting JSX/TSX, hooks, and best practices via community plugins.

5. **Tooling and IDE Support**:
   - Broad support in editors like VS Code ensures real-time linting and autofix
     features during development, enhancing productivity.

6. **Enforceable in CI**:
   - ESLint can be easily included in CI pipelines to ensure all pushed code
     meets linting standards automatically.

7. **Mature and Widely Adopted**:
   - ESLint is a battle-tested and actively maintained tool with a large
     community, ensuring long-term support and plugin availability.

## Consequences

1. **Initial Setup Complexity**:
   - Requires configuring multiple plugins and rulesets, especially when
     integrating with Prettier and TypeScript.

2. **Learning Curve**:
   - Developers unfamiliar with ESLint or the chosen style guide may need time
     to adjust and understand linting errors.

3. **Legacy Code Migration**:
   - Applying linting rules to an existing codebase may surface a large number
     of issues that require cleanup or rule tuning.

## Alternatives Considered

### StandardJS:
   - **Pros**: Simple setup, minimal configuration.
   - **Cons**: Limited flexibility and control over rule customization; not
     ideal for TypeScript-heavy projects.

### Rome:
   - **Pros**: Modern, fast, includes linter, formatter, and bundler in one
     tool.
   - **Cons**: Still maturing; limited plugin ecosystem and TypeScript
     integration compared to ESLint.

### No Linter:
   - **Pros**: Zero setup and no time spent fixing lint errors.
   - **Cons**: Leads to inconsistent code, hard-to-spot bugs, and reduced
     maintainability as the codebase grows.
