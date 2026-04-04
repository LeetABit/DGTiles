# ADR-031: Pre-Commit Hooks

## Status

Accepted

## Context

The project requires a mechanism to enforce code quality standards and prevent
commits that fail to meet project requirements. Implementing git pre-commit
hooks ensures consistent code quality across all contributions before they reach
the repository.

## Decision

We have decided to **adopt Husky** for managing git pre-commit hooks.

## Reasons

1. **Ease of Installation and Configuration**:

- Husky simplifies git hook setup with straightforward pnpm scripts, eliminating
  manual shell script management.

2. **Framework Agnostic**:

- Works seamlessly with Node.js projects regardless of the underlying framework,
  providing flexibility for diverse tech stacks.

3. **Developer Experience**:

- Husky integrates naturally into the pnpm workflow, requiring minimal developer
  overhead and learning curve.

4. **Community Support**:

- Well-maintained with extensive documentation and a large ecosystem of
  integration examples.

5. **Automation Enforcement**:

- Prevents commits that violate quality gates, catching issues early without
  relying on code review.

6. **Scalability**:

- Simple to extend with additional hooks as project standards evolve without
  restructuring existing setup.

## Consequences

1. **Node.js Dependency**:

- Requires Node.js environment for pre-commit execution.

2. **Hook Maintenance**:

- Team must maintain hook scripts and update them as quality standards change.

3. **Bypass Potential**:

- Developers can bypass hooks with `--no-verify` flag; requires team discipline.

## Alternatives Considered

### simple-git-hooks

- **Pros**: Zero external dependencies, extremely lightweight, fast execution.
- **Cons**: Less feature-rich compared to Husky, lacks some advanced
  configuration options.

### Lefthook

- **Pros**: Very fast (written in Go), supports concurrent execution of hooks,
  language-agnostic but installable via npm.
- **Cons**: More complex configuration, introduces a non-Node binary under the
  hood.

### Manual Git Hooks

- **Pros**: No external dependencies required, built-in to Git.
- **Cons**: Difficult to share and enforce automatically across the entire
  development team, requires manual setup by each developer.
