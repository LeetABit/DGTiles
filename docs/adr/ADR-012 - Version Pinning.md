# ADR-012: Version Pinning

## Status

Accepted

## Context

Dependency management is a critical aspect of the project to ensure consistent
and predictable builds across all environments. While a `pnpm-lock.yaml` file
ensures deterministic dependency resolution, changes in indirect dependencies
could still occur if versions are not explicitly pinned in `package.json`.

## Decision

We decided to use version pinning (exact versions) in `package.json`.

## Reasons

1. **Maximum Consistency**:
   - The `pnpm-lock.yaml` file ensures that all environments (development,
     CI/CD, production) use the exact same versions of dependencies and
     sub-dependencies.
   - Version pinning in `package.json` prevents accidental drift in direct
     dependencies when the `pnpm-lock.yaml` file is regenerated.

2. **Predictable Builds**:
   - Combining the `pnpm-lock.yaml` file and exact version pinning ensures fully
     reproducible builds, reducing the likelihood of bugs caused by version
     mismatches.

3. **Enhanced Control**:
   - Explicit version pinning makes it easier to track and update dependencies
     intentionally, ensuring full awareness of updates and their impacts.

4. **Change Visibility**:
   - Updates to dependencies are transparent and can be tracked in version
     control (both in `pnpm-lock.yaml` and `package.json`), making it easier to
     review changes during code reviews.

5. **Mitigation of Breaking Changes**:
   - Using exact versions prevents developers from unintentionally introducing
     breaking changes through minor or patch updates that might otherwise be
     resolved by a caret (`^`) or tilde (`~`) range.

## Consequences

1. **Increased Maintenance Overhead**:
   - Developers must manually update dependencies in `package.json` to upgrade
     to newer versions.
   - Additional effort may be required to review and test dependency updates.

2. **Reduced Flexibility**:
   - Minor and patch updates that could fix bugs or improve performance are not
     automatically applied, requiring proactive updates.

3. **Dependency Management Complexity**:
   - Both the `pnpm-lock.yaml` file and `package.json` must be kept in sync, which
     could introduce confusion if one is not properly updated.

## Alternatives Considered

### Exclude `pnpm-lock.yaml` from Git Repository

- **Pros**: Simplifies the repository by removing a large file.
- **Cons**: Causes inconsistencies in dependency resolution, making builds
  less predictable.

### Include `pnpm-lock.yaml` in Git Without Version Pinning

- **Pros**: Balances consistency and flexibility by allowing automatic
  updates to direct dependencies.
- **Cons**: Still allows potential changes to direct dependencies if the
  `pnpm-lock.yaml` file is regenerated.
