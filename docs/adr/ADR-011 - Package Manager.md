# ADR-011: Package Manager

## Status

Accepted

## Context

The project requires a reliable and efficient package manager for managing
dependencies. The chosen tool must ensure consistent and fast installs, good
performance, and support for modern development workflows.

## Decision

We decided to use pnpm as the package manager for the project.

## Reasons

1. **Performance**:
   pnpm offers exceptional performance with faster dependency installation than
   both npm and Yarn, thanks to its efficient content-addressable storage system.

2. **Disk Space Efficiency**:
   pnpm uses a unique symlink-based approach that stores packages in a single
   global store, significantly reducing disk space usage by avoiding duplicate
   copies of dependencies across projects.

3. **Strict Dependency Resolution**:
   pnpm creates a non-flat node_modules structure that prevents packages from
   accessing undeclared dependencies, enforcing better dependency hygiene and
   reducing potential bugs.

4. **Consistency with Lock Files**:
   pnpm's lockfile (`pnpm-lock.yaml`) ensures that dependency versions are
   consistent across different environments, minimizing "it works on my machine"
   issues.

5. **Workspaces Support**:
   pnpm natively supports workspaces with excellent performance, making it ideal
   for managing monorepos or projects with multiple packages.

6. **Compatibility**:
   pnpm is fully compatible with the npm registry and can work with existing
   package.json files, allowing seamless access to the vast ecosystem of
   JavaScript packages.

## Consequences

1. Developers must use pnpm-specific commands, which may differ slightly from
   npm and Yarn, requiring minimal adjustments.

2. The symlink-based approach may require additional configuration in some
   deployment environments or tools that don't handle symlinks well.

3. The `pnpm-lock.yaml` file will need to be committed to version control and
   maintained to ensure consistent dependency versions.

4. Some legacy tools or IDEs may have limited support for pnpm's non-flat
   node_modules structure, though this is increasingly rare.

## Alternatives Considered

### npm:

- **Pros**: Comes pre-installed with Node.js, requires no additional setup.
- **Cons**: Historically slower and less disk-efficient than pnpm, though recent
  updates have improved performance.

### Yarn:

- **Pros**: Fast installation, good workspace support, large community adoption.
- **Cons**: Less disk-efficient than pnpm, uses a flat node_modules structure
  that can allow access to undeclared dependencies.
