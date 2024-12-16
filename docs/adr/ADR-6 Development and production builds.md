# ADR-6 Development and production builds

## Status

Accepted

## Context

Clearly defined, easy to use and automatic workflow scheme simplifies development and helps focusing on functional changes rather than on tooling and release mechanisms.

## Decision

Visual Studio Code enables users to create a custom debugging configuration. File `/.vscode/launch.json` defines four configurations:

1. `Vite: Test` that runs tests with debugger attached.
2. `Vite: Dev` that runs webpage using rapid development tools via Vite.
3. `Vite: Preview` that runs webpage from production build using Vite preview.
4. `SWA: Start` that runs webpage from production build using Vite preview through Static Web App CLI emulator.

All these configurations are implemented through scripts defined in `/package.json` file. There are multiple scripts that assists developer in implementing changes:

1. `generate` that runs scripts that generates source code from the metadata already available in repository.
2. `lint` that runs TypeScript and ESLint checks on source code.
3. `fix` that makes an attempt to fix issues found by ESLint and Prettier.
4. `test` that runs all defined tests.
5. `dev` that hosts website using local Vite's development server.
6. `build` that creates a production build of the website.
7. `preview` that hosts previously built website using local Vite's production server.
8. `verify` runs all the available scripts that may be used to capture errors.

Builds on GitHub run `verify` command to check correctness of the code. In addition when build is run for a commit on `main` branch a new tag is created and `generate` script
correctly generates changelog for new version.

## Consequences

During Pull Request and production build a full spectrum of checks and tests are run to find as many problems as possible before deploying new version to production environment.

## Known Alternatives

None.
