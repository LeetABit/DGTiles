//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import {
    INITIAL_VERSION,
    getLatestVersionAsync,
} from "#/scripts/common/version.mts";
import { type PluginOption, normalizePath } from "vite";
import { readFile, readdir, writeFile } from "fs/promises";

const ONE_CAR_FROM_START = 1;
const ONE_CAR_FROM_END = -1;

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

        async closeBundle() {
            const lastVersion =
                (await getLatestVersionAsync()) ?? INITIAL_VERSION;
            const major = lastVersion.major.toString();
            const minor = lastVersion.minor.toString();
            const patch = lastVersion.patch.toString();
            const version = `v${major}.${minor}.${patch}`;
            const files = (
                await readdir("dist", {
                    recursive: true,
                    withFileTypes: true,
                })
            )
                .filter(
                    (dirent) =>
                        dirent.isFile() &&
                        (dirent.name !== "sw.js" ||
                            dirent.parentPath !== "dist"),
                )
                .map((dirent) =>
                    normalizePath(
                        `${dirent.parentPath}/${dirent.name}`,
                    ).substring("dist".length),
                )
                .map((fileName) => `"${fileName}"`)
                .join(",")
                .slice(ONE_CAR_FROM_START, ONE_CAR_FROM_END);
            const swFilePath = "dist/sw.js";
            let swContent = await readFile(swFilePath, "utf-8");
            swContent = swContent.replace(/\{APP_VERSION\}/gu, version);
            swContent = swContent.replace(/\{FILE_LIST\}/gu, files);
            await writeFile(swFilePath, swContent, "utf-8");
        },
    };
}
