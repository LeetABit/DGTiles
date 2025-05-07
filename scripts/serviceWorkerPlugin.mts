//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { PluginOption } from "vite";

/**
 * A Vite plugin to handle service worker registration.
 * @param {string} filePath The path to the service worker file.
 * @returns {PluginOption} The Vite plugin.
 */
export function serviceWorker(filePath: string): PluginOption {
    const pluginName = "service-worker";
    const virtualModuleId = `virtual:${pluginName}`;
    const resolvedVirtualModuleId = `\0${virtualModuleId}`;
    let isBuild = false;
    return {
        name: pluginName,

        config(_, { command }) {
            isBuild = command === "build";
            return {
                build: {
                    rollupOptions: {
                        input: {
                            main: "index.html",
                            sw: filePath,
                        },
                        output: {
                            entryFileNames: ({ name }) => {
                                if (name === "sw") {
                                    return `[name].js`;
                                }

                                return "assets/[name]-[hash].js";
                            },
                        },
                    },
                },
            };
        },

        load(id) {
            if (id === resolvedVirtualModuleId) {
                let filename = isBuild ? "sw.js" : filePath;
                if (!filename.startsWith("/")) {
                    filename = `/${filename}`;
                }

                return `export const serviceWorkerFilePath = '${filename}'`;
            }

            return null;
        },

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }

            return null;
        },
    };
}
