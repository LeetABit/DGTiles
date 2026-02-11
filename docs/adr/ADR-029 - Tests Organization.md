# ADR-029: Tests Organization

## Status

Accepted

## Context

The project requires a clear strategy for organizing test files within the
codebase. Teams must decide whether to maintain separate test directories or
colocate tests alongside source code. Test colocation—placing test files in the
same directory structure as the code they test—offers organizational and
maintenance benefits that warrant evaluation.

## Decision

We have decided to **colocate tests next to source code** in the same directory
structure.

## Reasons

1. **Improved Developer Workflow**:

- Tests are immediately accessible alongside source files, reducing cognitive
  load when navigating the codebase.

2. **Maintenance and Discoverability**:

- Changes to source code keep tests visible and easier to update, reducing the
  likelihood of orphaned or outdated tests.

3. **Reduced File Traversal**:

- Developers spend less time navigating between separate test and source
  directories, improving productivity.

4. **Clear Ownership**:

- Colocated tests establish clear responsibility—each module's tests are
  grouped with that module.

5. **Simplified Build Configuration**:

- Build tools can more easily identify and exclude test files from production
  bundles using naming conventions (e.g., `*.test.ts`, `*.spec.ts`).

6. **Better Scaling**:

- As the codebase grows, the organization remains intuitive and scales
  naturally with feature development.

## Consequences

1. **Build Tool Configuration**:

- Build systems must be configured to exclude test files from production
  outputs.

2. **IDE Organization**:

- More files appear in directory listings, requiring disciplined file naming
  conventions.

## Alternatives Considered

### Separate Test Directory:

- **Pros**: Clear separation of concerns, familiar to teams using traditional
  structures.
- **Cons**: Tests become harder to locate, increased navigation overhead,
  maintenance burden.
