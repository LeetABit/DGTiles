# Complications

## TypeScript Library Conflicts

TypeScript has an open issue that prevents specifying both "DOM" and "WebWorker"
as libs simultaneously. This results in conflicts due to overlapping
definitions. Additionally, some dependencies may automatically import the "DOM"
library into the scope.

To address this, the project uses separate configurations for the Service Worker
and the rest of the codebase. Initially, the `service-worker.ts` file was
intended to reside in the `src` directory. However, to ensure TypeScript
correctly parses the file, it was placed in a dedicated `sw` folder.
Consequently, the TypeScript configuration for the main application was moved to
`tsconfig.app.json`, while the Service Worker configuration resides in
`sw/tsconfig.json`. To maintain a unified entry point, the root `tsconfig.json`
uses project references to include both configurations. This is due to ESLint
which benefits greatly from single TypeScript configuration covering all files
rather than per path specification of `projectService`.

Once the GitHub issue mentioned below is resolved, an attempt may be made to
consolidate the configuration into a single file and relocate
`service-worker.ts` back to the `src` folder.

[GitHub: TypeScript #20595][TypeScript20595]

[TypeScript20595]: https://github.com/microsoft/TypeScript/issues/20595
