# Deployment

Project configuration starts in build workflow file located at `.github\workflows\build.yml`.
This file defines where the `Azure/static-web-apps-deploy` action shall look for the application
and what command shall be used to build it. When the application is this built GitHub action copies
`staticwebapp.config.json` file to output `dist` directory before deployment.

# Local testing

Application may be run locally using Static Web App CLI. The process is controller by configuration in
`swa-cli.config.json` file. It runs `start` script of `package.json` file and then runs SWA emulator on another port.

# Vite configurations:

TODO: continue this doc
minification
                //
                // moduleSideEffects: (id, external) => {
                //     if (id.includes('/node_modules/@axe-core/react/')) {
                //         return false;
                //     }

                //     return !external;
                // },
