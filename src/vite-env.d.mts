//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

/// <reference types="vite/client" />
/// <reference types="node" />
/// <reference types="axe-core" />

declare module "eslint-plugin-react-hooks" {
    import type { ESLint } from "eslint";
    declare const plugin: Omit<ESLint.Plugin, "configs"> & {
        configs: Record<string, ESLint.ConfigData>;
    };
    declare type Plugin<T extends string | null | undefined> = T extends string
        ? number
        : null;
    export default plugin;
}