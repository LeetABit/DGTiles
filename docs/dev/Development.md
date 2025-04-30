# Development

The purpose of this document is to define and enforce a set of coding standards
that ensure the project maintains high-quality, maintainable, and consistent
code. By adhering to these standards, the project fosters collaboration, reduces
technical debt, and ensures a smooth development process for all contributors.

## Build Scripts

To build, test, lint, or perform other operations with the source code, the
following scripts are available in the `package.json` file:

- **Lint the code**: `yarn lint`
- **Fix linting issues**: `yarn fix`
- **Run tests**: `yarn test`
- **Start the development server**: `yarn dev`
- **Clean the build directory**: `yarn clean`
- **Build the application**: `yarn build`
- **Preview the production build**: `yarn preview`
- **Verify the project**: `yarn verify`
- **Update dependencies to their latest versions**: `yarn update`

## Build Tools

The project uses **Vite** as the build tool for both development and production
workflows. Vite was chosen for its speed, simplicity, and seamless integration
with modern JavaScript and TypeScript ecosystems.

### Development Build

The development build is optimized for a fast feedback loop during development.
Vite uses native ESM in the browser and provides the following features:

- **Hot Module Replacement (HMR)**: Enables instant updates to the browser
  without a full page reload, improving developer productivity.
- **On-Demand Compilation**: Only the modules currently being used are compiled,
  reducing startup time.
- **Source Maps**: Automatically generated for easier debugging.

The development server is started using the `yarn dev` script, which runs the
`vite` command.

### Production Build

The production build is optimized for performance and deployment. Vite leverages
**Rollup** under the hood to provide:

- **Minification**: Reduces the size of JavaScript, CSS, and other assets.
- **Tree Shaking**: Removes unused code to produce a smaller bundle.
- **Code Splitting**: Splits the application into smaller chunks for better
  caching and faster load times.
- **Static Asset Optimization**: Optimizes images, fonts, and other static
  assets.

The production build is created using the `yarn build` script, which runs
`vite build`. This process generates the output in the `dist` directory, ready
for deployment.

## Package Manager

The project uses **Yarn** as the package manager to manage dependencies and
scripts. Yarn ensures fast, reliable, and deterministic dependency management.
All dependency versions are **pinned** in the `package.json` file to guarantee
consistency across different environments and prevent unexpected updates.

### Key Details:

- **Pinned Versions**: All dependencies are locked to specific versions in the
  `package.json` file, ensuring a stable and predictable development
  environment.
- **Lockfile**: The `yarn.lock` file is checked into the repository to ensure
  that all contributors and CI environments use the exact same versions of
  dependencies.
- **Dependency Updates**: The `yarn update` script is provided to update
  dependencies to their latest versions when needed.
- **Script Management**: Yarn is used to run all project scripts, such as
  `yarn lint`, `yarn build`, and `yarn test`.

By using Yarn and maintaining the `yarn.lock` file in the repository, the
project ensures consistency and reliability in dependency management across all
environments.

## Code Editor

The project uses **Visual Studio Code (VSCode)** as the selected code editor for
development. VSCode was chosen for its lightweight nature, extensibility, and
robust support for modern development workflows. It provides a wide range of
features that assist developers in performing development tasks and diagnosing
problems efficiently.

### Extensions

The following extensions are selected and configured to enhance the development
experience:

- **Code Spell Checker (`streetsidesoftware.code-spell-checker`)**: Ensures
  proper spelling in comments, documentation, and commit messages.
- **Hide Gitignored (`npxms.hide-gitignored`)**: Hides files ignored by Git to
  declutter the workspace.

These extensions are listed in the
[`.vscode/extensions.json`](../../.vscode/extensions.json) file to ensure all
contributors use the same tools.

### Launch Configuration

The project includes a launch configuration for debugging scripts directly
within VSCode. This configuration is defined in the
[`.vscode/launch.json`](../../.vscode/launch.json) file and allows developers
to:

- Debug scripts such as `yarn dev`, `yarn preview`, `yarn test`, and
  `yarn lint`.
- Set breakpoints and inspect variables during script execution.
- Step through code to diagnose issues.

The following launch configurations are available:

- **Vite: Dev**: Launches the development server (`yarn dev`).
- **Vite: Preview**: Launches the production preview server (`yarn preview`).
- **Vite: Test**: Runs the test suite (`yarn test`).
- **Vite: Lint**: Runs the linter (`yarn lint`).

### Settings

The project-specific editor settings are defined in the
[`.vscode/settings.json`](../../.vscode/settings.json) file. These settings
include:

- **Custom Dictionary**: Adds project-specific words to the spell checker to
  avoid false positives. Words like `dgtiles`, `leetabit`, and `nonblock` are
  included.
- **Editor Rulers**: A ruler is set at 80 characters to encourage line length
  consistency.
