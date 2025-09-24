# ADR-014: Build Tool

## Status

Accepted

## Context

The project requires a modern, efficient build tool to handle TypeScript
compilation, module bundling, and static asset optimization. The chosen tool
must be lightweight, fast, and compatible with modern JavaScript technologies
such as ESM.

## Decision

We decided to use Vite as the build tool for the project.

## Reasons

1. **Lightning-fast Development Server**:
   - Vite uses native ESM in the browser during development, enabling
     near-instant server startup and hot module replacement (HMR) for a seamless
     developer experience.

2. **Optimized Build Process**:
   - Vite leverages Rollup under the hood for production builds, providing
     efficient tree-shaking, code splitting, and optimized output.

3. **TypeScript Support**:
   - Vite natively supports TypeScript, streamlining the setup and eliminating
     the need for additional plugins or configurations.

4. **Compatibility with Modern JavaScript Standards**:
   - Vite fully embraces ESM, aligning with the project's decision to use ESM
     Modules and ensuring compatibility with modern browsers and tools.

5. **Extensibility**:
   - Vite offers a rich plugin ecosystem and an easy-to-use API, allowing
     customization to meet the project’s specific needs.

6. **Out-of-the-box Features**:
   - Vite provides built-in support for static assets, PostCSS, and modern
     JavaScript frameworks (e.g., React, Vue, Svelte), reducing configuration
     overhead.

7. **Community and Ecosystem**:
   - Vite has a growing and active community, with extensive documentation and
     support, ensuring long-term viability for the project.

8. **Performance Improvements**:
   - Vite’s approach to on-demand compilation during development significantly
     reduces build times compared to traditional tools like Webpack.

## Consequences

1. **Learning Curve**:
   - Developers unfamiliar with Vite may need time to learn its features and
     configuration options, though the effort is minimal due to its simplicity.

2. **Evolving Ecosystem**:
   - As a relatively newer tool, Vite’s ecosystem may still be evolving,
     requiring periodic updates and monitoring for breaking changes.

3. **Legacy Browser Support**:
   - Vite focuses on modern browsers, and additional configuration may be needed
     if legacy browser support is required.

## Alternatives Considered

### Webpack:

- **Pros**: Mature and widely adopted with a large ecosystem of plugins.
- **Cons**: Slower build times and more complex configuration compared to
  Vite.

### Rollup:

- **Pros**: Efficient and lightweight for production builds.
- **Cons**: Lacks the integrated development server and HMR features provided
  by Vite.

### Parcel:

- **Pros**: Zero-config setup and fast builds for simple projects.
- **Cons**: Less flexibility and a smaller ecosystem compared to Vite.
