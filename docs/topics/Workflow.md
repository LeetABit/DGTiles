# Deployment

Project configuration starts in build workflow file located at `.github\workflows\build.yml`.
This file defines where the `Azure/static-web-apps-deploy` action shall look for the application
and what command shall be used to build it. When the application is this built GitHub action copies
`staticwebapp.config.json` file to output `dist` directory before deployment.

# Local testing

Application may be run locally using Static Web App CLI. The process is controller by configuration in
`swa-cli.config.json` file. It runs `start` script of `package.json` file and then runs SWA emulator on another port.

# Vite configurations

Vite configuration starts at `vite.config.mts` file which defines how applications are built and what vite plugins are used.
Vite provides two distinct set of tools. The first one for building and the second one for fast interactive development.

# TypeScript configuration

Before building production application `package.json` build script executes TypeScript compiler with no emit options.
This is optional step that checks type errors in TypeScript files. Typescript configuration is defined in `tsconfig.json`
file and is then divided into two files: `tsconfig.node.json` and `tsconfig.app.json`. The first one is responsible for
checking `vite.config.mts` file and the second one is responsible for rest of the TypeScript files.

# Package.json scripts

There are few scripts defined in `package.json` file.

| Script   | Description                                                   |
| -------- | ------------------------------------------------------------- |
| cfg      | Prints current configuration to compare between environments. |
| clean    | Remove build output.                                          |
| generate | Generates intermediate source code files.                     |
| lint     | Executes linters on the code.                                 |
| test     | Executes tests.                                               |
| dev      | Starts development server with HMR.                           |
| build    | Produces production build.                                    |
| preview  | Hosts production build on local server.                       |
| verify   | Verifies entire project build chain.                          |

# Visual Studio Code debug configurations

Debug configuration for Visual Studio Code are defined in `/.vscode/launch.json` file.
There are following configurations defined:

| Configuration | Description                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Dev           | Starts Vite development server and opens chrome browser.                                                         |
| Preview       | Starts production build and serves the output locally                                                            |
| Emulator      | Starts production build, serves the output locally and start Static Web App Emulator for the hosted application. |
| Test          | Executes tests with debugger attached.                                                                           |
