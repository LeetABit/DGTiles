# ADR-008: Code Editor

## Status

Accepted

## Context

The chosen editor must support various technologies that helps in development
modern applications while being lightweight, efficient, and extensible to
accommodate current and future development needs.

## Decision

We decided to use Visual Studio Code (VS Code) as the main editor for the
project.

## Reasons

1. **Lightweight and Fast**:
   VS Code is designed to be fast and efficient, providing a responsive
   experience even on systems with modest resources.

2. **Extensibility and Customization**:
   With a vast library of extensions, VS Code can be tailored to meet the
   specific needs of the project, including support for debugging, linting, and
   language-specific tools.

3. **Built-in Git Integration**:
   VS Code includes seamless Git integration out of the box, simplifying version
   control tasks such as commits, branches, and merges.

4. **Free and Open Source**:
   VS Code is free to use and open source, making it an accessible and
   cost-effective choice for the project.

5. **Cross-platform Compatibility**:
   VS Code runs on Windows, macOS, and Linux, ensuring flexibility for
   development environments.

6. **Rich Language Support**:
   VS Code supports JavaScript and many other programming languages, providing
   intelligent features like syntax highlighting, code completion, and
   debugging.

7. **Strong Ecosystem**:
   VS Code’s active community and extensive documentation make it easy to find
   solutions to problems and stay up-to-date with best practices.

8. **Future-proofing**:
   As the project grows, VS Code can scale with it, offering features like Live
   Share for collaboration and integrations with CI/CD pipelines and other
   DevOps tools.

## Consequences

1. Developers unfamiliar with VS Code will need to spend time learning its
   interface and features, but the learning curve is minimal due to its
   intuitive design.

2. The reliance on extensions may require periodic review and updates to ensure
   compatibility and security.

## Alternatives Considered

### JetBrains IDEs:

- **Pros**: Comprehensive tools tailored to specific languages, excellent
  debugging capabilities.
- **Cons**: Paid licenses required for full features; heavier resource usage.

### Sublime Text:

- **Pros**: Lightweight and fast with a robust plugin ecosystem.
- **Cons**: Requires a paid license for continuous use; lacks some modern
  development features out of the box.

### Vim/Neovim:

- **Pros**: Extremely lightweight, fully customizable.
- **Cons**: Steeper learning curve and requires significant configuration to
  match VS Code’s feature set.
