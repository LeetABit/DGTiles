# ADR-024: Styling

## Status

Accepted

## Context

The project requires a flexible, maintainable, and scalable approach to styling
React components. Requirements include support for dynamic styling, strong
TypeScript compatibility, co-location of styles with components, and consistency
across theming. The chosen solution should work well with modern React patterns
and align with component-based architecture.

Several styling approaches were considered, including CSS Modules, Tailwind CSS,
styled-components, and Emotion.

## Decision

We decided to use **Emotion** as the styling solution for the project.

## Reasons

1. **CSS-in-JS with Component Co-location**:
   - Emotion enables co-locating styles with components, improving modularity,
     readability, and maintainability.

2. **Dynamic Styling Support**:
   - Supports conditional and dynamic styles based on props, state, or themes,
     enhancing flexibility in UI development.

3. **TypeScript Support**:
   - Provides first-class TypeScript support, allowing for type-safe theming and
     styled components.

4. **Styled and `css` APIs**:
   - Offers both `styled` and `css` APIs, enabling use cases ranging from
     styled-components-like syntax to inline utility styles.

5. **Theming System**:
   - Emotion supports theming out of the box, allowing for a consistent design
     system and easy customization.

6. **Performance and Optimization**:
   - Emotion has a fast runtime and supports critical CSS extraction and SSR,
     which is useful for performance-sensitive applications.

7. **Interop with Existing Tools**:
   - Works well with other React styling strategies and can be incrementally
     adopted or used alongside utility-first tools like Tailwind CSS if needed.

## Consequences

1. **Runtime Dependency**:
   - Emotion requires a runtime, which may add some overhead compared to static
     or utility-based CSS solutions.

2. **Potential Developer Fragmentation**:
   - Developers must be aligned on styling conventions to avoid inconsistent
     usage between `styled`, `css`, and vanilla class-based styles.

3. **Debugging Complexity**:
   - Dynamically generated class names can make debugging styles harder unless
     dev tools like Babel plugins or Emotion DevTools are used.

4. **Requires Build Tooling Awareness**:
   - Some advanced features (e.g., source maps, SSR support) require awareness
     of Emotion-specific Babel plugins or SSR strategies.

## Alternatives Considered

### Tailwind CSS:

- **Pros**: Utility-first, no runtime cost, widely adopted.
- **Cons**: Requires learning new class names, harder to express complex or
  conditional styles inline.

### Styled-Components:

- **Pros**: Very similar API and capabilities.
- **Cons**: Larger runtime, slower performance benchmarks compared to
  Emotion, slightly less flexibility with custom setups.

### CSS Modules:

- **Pros**: Simple, no runtime, works well with existing CSS knowledge.
- **Cons**: Limited dynamic styling and theming capabilities.
