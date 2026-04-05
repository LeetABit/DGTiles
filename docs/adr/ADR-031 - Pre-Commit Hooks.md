# ADR-031: Pre-Commit Hooks

## Status

Accepted

## Context

The project requires a mechanism to enforce code quality standards and prevent
commits that fail to meet project requirements. Implementing git pre-commit
hooks ensures consistent code quality across all contributions before they reach
the repository.

## Decision

We have decided to **use a `package.json` prepare script that configures the git
hooks directory**.

## Reasons

1. **Zero External Dependencies**:

- No additional npm packages required; uses only native git functionality and
  npm lifecycle scripts.

2. **Simplicity**:

- Minimal setup with a single prepare script that runs `git config core.hooksPath
.githooks`.

3. **Native Git Support**:

- Leverages Git's built-in `core.hooksPath` configuration, avoiding abstraction
  layers.

4. **Ease of Maintenance**:

- Hook scripts live in a `.githooks` directory and are version-controlled
  directly, making changes transparent.

5. **Developer Experience**:

- Automatic hook installation on `pnpm install` with no additional commands
  required.

6. **Team Collaboration**:

- All hooks are committed to the repository, ensuring consistent enforcement
  across the entire team.

## Consequences

1. **Hook Maintenance**:

- Team must maintain shell scripts in `.githooks` directory and update them as
  quality standards change.

2. **Bypass Potential**:

- Developers can bypass hooks with `--no-verify` flag; requires team discipline.

3. **Platform Considerations**:

- Shell scripts may require platform-specific handling for Windows developers
  using non-POSIX shells.

## Alternatives Considered

### Husky

- **Pros**: Feature-rich, well-maintained, excellent documentation.
- **Cons**: Adds external dependency, requires additional configuration layer.

### Lefthook

- **Pros**: Very fast (written in Go), supports concurrent execution, language-agnostic.
- **Cons**: Non-Node binary dependency, more complex configuration.

### Manual Git Hooks

- **Pros**: Built-in to Git, no dependencies.
- **Cons**: Not automatically shared across the team, requires manual setup by
  each developer.
