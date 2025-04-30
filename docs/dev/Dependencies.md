# Dependencies

This document provides an overview of the dependencies listed in the
package.json that are not imported by any source file.

## Dev Dependencies

### `@types/node`

- **Purpose:** TypeScript type definitions for Node.js APIs.
- **Used By:** source files inside `./scripts` directory.

### `eslint`

- **Purpose:** A popular JavaScript linter used to identify and fix problems
  in the codebase.
- **Used By:** `package.json/scripts` element to run code analysis during
  lint command.

### `jiti`

- **Purpose:** A runtime TypeScript and JavaScript loader.
- **Used By:** eslint to load TypeScript `./eslint.config.mts` file in
  Node.js environment.

### `tsx`

- **Purpose:** A fast TypeScript execution environment for Node.js.
- **Used By:** `.github/workflows/CI_CD.yml` file to execute TypeScript
  scripts.

### `typescript`

- **Purpose:** A strongly typed programming language that builds on top of
  JavaScript.
- **Used By:** `package.json/scripts` element to run code analysis during
  build and lint commands.
