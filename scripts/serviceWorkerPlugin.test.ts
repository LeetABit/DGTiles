//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { type Mock, describe, expect, test, vi } from "vitest";
import { SERVICE_WORKER_MODULE_ID, serviceWorker } from "./serviceWorkerPlugin";
import {
    assert,
    isArray,
    isFunction,
    isObject,
    isString,
} from "./common/assert";
import { readFile, readdir, writeFile } from "fs/promises";
import type { ConfigPluginContext } from "vite";
import type { PluginContext } from "rollup";
import { getLatestVersionAsync } from "./common/version";

const configPluginContext: ConfigPluginContext = {
    debug: () => {},
    error: () => {
        throw new Error("error called");
    },
    warn: () => {},
    info: () => {},
    meta: {} as any,
};

const pluginContext: PluginContext = {
    addWatchFile: () => {},
    getModuleInfo: () => null,
    getWatchFiles: () => [],
    meta: {} as any,
    parse: () => ({
        type: "Program",
        start: 0,
        end: 0,
        body: [],
        sourceType: "module",
    }),
    resolve: async () => Promise.resolve(null),
    warn: () => {},
    error: () => {
        throw new Error("error called");
    },
    getFileName: () => "sw.js",
    cache: new Map(),
    debug: () => {},
    emitFile: () => "",
    info: () => {},
    fs: {
        readdir: async () => Promise.resolve([]),
        writeFile: async () => {},
        appendFile: async () => {},
        copyFile: async () => {},
        mkdir: async () => {},
        mkdtemp: async () => Promise.resolve(""),
        realpath: async () => Promise.resolve(""),
        rename: async () => {},
        rmdir: async () => {},
        readFile: async () => Promise.resolve({} as any),
        stat: async () =>
            Promise.resolve({
                isFile: () => false,
                isDirectory: () => false,
                isSymbolicLink: () => false,
                size: 0,
                mtime: new Date(),
                ctime: new Date(),
                atime: new Date(),
                birthtime: new Date(),
            }),
        lstat: async () =>
            Promise.resolve({
                isFile: () => false,
                isDirectory: () => false,
                isSymbolicLink: () => false,
                size: 0,
                mtime: new Date(),
                ctime: new Date(),
                atime: new Date(),
                birthtime: new Date(),
            }),
        unlink: async () => {},
    },
    getModuleIds: () => [].values(),
    load: async () =>
        Promise.resolve({
            ast: null,
            code: null,
            dynamicImporters: [],
            dynamicallyImportedIdResolutions: [],
            dynamicallyImportedIds: [],
            exportedBindings: null,
            exports: null,
            safeVariableNames: {},
            hasDefaultExport: null,
            id: "",
            implicitlyLoadedAfterOneOf: [],
            implicitlyLoadedBefore: [],
            importedIdResolutions: [],
            importedIds: [],
            importers: [],
            isEntry: false,
            isExternal: false,
            isIncluded: null,
            attributes: {},
            meta: {},
            moduleSideEffects: false,
            syntheticNamedExports: false,
        }),
    setAssetSource: () => {},
    environment: {
        name: "",
        mode: "unknown",
        getTopLevelConfig() {
            return {} as any;
        },
        get plugins() {
            return [] as const;
        },
        config: {} as any,
        logger: {
            info: () => {},
            warn: () => {},
            error: () => {},
            clearScreen: () => {},
            hasErrorLogged: () => false,
            hasWarned: false,
        } as any,
    },
};

vi.mock("fs/promises", () => ({
    readdir: vi.fn(),
    readFile: vi.fn(),
    writeFile: vi.fn(),
}));

vi.mock("#/scripts/common/version", () => ({
    getLatestVersionAsync: vi.fn(),
    INITIAL_VERSION: { major: 0, minor: 1, patch: 0 },
}));

describe("serviceWorkerPlugin", () => {
    const filePath = "src/sw/service-worker.ts";

    test("should return a plugin object with service worker name", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin).property("name").contain("service");
        expect(plugin).property("name").contain("worker");
    });

    test("should return a plugin object with config function", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin).toHaveProperty("config");
        expect(typeof plugin.config).toBe("function");
    });

    test("should return a plugin object with load function", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin).toHaveProperty("load");
        expect(typeof plugin.load).toBe("function");
    });

    test("should return a plugin object with resolveId function", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin).toHaveProperty("resolveId");
        expect(typeof plugin.resolveId).toBe("function");
    });

    test("should return a plugin object with closeBundle function", () => {
        const plugin = serviceWorker(filePath);
        expect(plugin).toHaveProperty("closeBundle");
        expect(typeof plugin.closeBundle).toBe("function");
    });

    test("config function returns two inputs", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.config));
        const options = plugin.config.bind(configPluginContext)(
            {},
            { command: "build", mode: "whatever" },
        );

        expect(options).not.toBeNull();
        assert(isObject(options));
        expect(options).toHaveProperty("build");
        expect(options).not.toBeInstanceOf(Promise);
        assert(!(options instanceof Promise));
        assert(isObject(options.build));
        expect(options.build).toHaveProperty("rollupOptions");
        assert(isObject(options.build.rollupOptions));
        expect(options.build.rollupOptions).toHaveProperty("input");
        assert(isObject(options.build.rollupOptions.input));
        expect(options.build.rollupOptions.input).toHaveProperty("main");
        expect(options.build.rollupOptions.input).toHaveProperty("sw");
    });

    test("config function maps service worker to not hashed file", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.config));
        const options = plugin.config.bind(configPluginContext)(
            {},
            { command: "build", mode: "whatever" },
        );

        expect(options).not.toBeNull();
        assert(isObject(options));
        expect(options).toHaveProperty("build");
        expect(options).not.toBeInstanceOf(Promise);
        assert(!(options instanceof Promise));
        assert(isObject(options.build));
        expect(options.build).toHaveProperty("rollupOptions");
        assert(isObject(options.build.rollupOptions));
        expect(options.build.rollupOptions).toHaveProperty("output");
        assert(isObject(options.build.rollupOptions.output));
        assert(!isArray(options.build.rollupOptions.output));
        expect(options.build.rollupOptions.output).toHaveProperty(
            "entryFileNames",
        );
        assert(isFunction(options.build.rollupOptions.output.entryFileNames));
        const swFileName = options.build.rollupOptions.output.entryFileNames({
            name: "sw",
            exports: [],
            facadeModuleId: "",
            isDynamicEntry: false,
            isEntry: true,
            isImplicitEntry: false,
            moduleIds: [],
            type: "chunk",
        });
        expect(swFileName).eq("[name].js");
    });

    test("config function maps main to hashed file", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.config));
        const options = plugin.config.bind(configPluginContext)(
            {},
            { command: "build", mode: "whatever" },
        );

        expect(options).not.toBeNull();
        assert(isObject(options));
        expect(options).toHaveProperty("build");
        expect(options).not.toBeInstanceOf(Promise);
        assert(!(options instanceof Promise));
        assert(isObject(options.build));
        expect(options.build).toHaveProperty("rollupOptions");
        assert(isObject(options.build.rollupOptions));
        expect(options.build.rollupOptions).toHaveProperty("output");
        assert(isObject(options.build.rollupOptions.output));
        assert(!isArray(options.build.rollupOptions.output));
        expect(options.build.rollupOptions.output).toHaveProperty(
            "entryFileNames",
        );
        assert(isFunction(options.build.rollupOptions.output.entryFileNames));
        const swFileName = options.build.rollupOptions.output.entryFileNames({
            name: "main",
            exports: [],
            facadeModuleId: "",
            isDynamicEntry: false,
            isEntry: true,
            isImplicitEntry: false,
            moduleIds: [],
            type: "chunk",
        });
        expect(swFileName).eq("assets/[name]-[hash].js");
    });

    test("resolveId function returns resolved ID for virtual module ID", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.resolveId));
        const resolvedId = plugin.resolveId.bind(pluginContext)(
            SERVICE_WORKER_MODULE_ID,
            undefined,
            { attributes: {}, isEntry: false },
        );

        expect(resolvedId).contain("\0");
        expect(resolvedId).contain("virtual:service-worker");
    });

    test("resolveId function returns null for other modules", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.resolveId));
        const resolvedId = plugin.resolveId.bind(pluginContext)(
            "main",
            undefined,
            { attributes: {}, isEntry: false },
        );

        expect(resolvedId).toBe(null);
    });

    test("load function returns source file path for dev", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.resolveId));
        const resolvedId = plugin.resolveId.bind(pluginContext)(
            SERVICE_WORKER_MODULE_ID,
            undefined,
            { attributes: {}, isEntry: false },
        );
        expect(resolvedId).toBeTypeOf("string");
        assert(isString(resolvedId));

        assert(isFunction(plugin.load));
        const loaded = plugin.load.bind(pluginContext)(resolvedId);
        expect(loaded).contains(filePath);
    });

    test("load function returns bundle file path for build", () => {
        const plugin = serviceWorker(filePath);

        assert(isFunction(plugin.config));
        const _ = plugin.config.bind(configPluginContext)(
            {},
            { command: "build", mode: "whatever" },
        );

        assert(isFunction(plugin.resolveId));
        const resolvedId = plugin.resolveId.bind(pluginContext)(
            SERVICE_WORKER_MODULE_ID,
            undefined,
            { attributes: {}, isEntry: false },
        );
        expect(resolvedId).toBeTypeOf("string");
        assert(isString(resolvedId));

        assert(isFunction(plugin.load));
        const loaded = plugin.load.bind(pluginContext)(resolvedId);
        expect(loaded).contains("sw.js");
    });

    test("load function returns bundle rooted file path for build", () => {
        const plugin = serviceWorker(`/${filePath}`);

        assert(isFunction(plugin.config));
        const _ = plugin.config.bind(configPluginContext)(
            {},
            { command: "serve", mode: "whatever" },
        );

        assert(isFunction(plugin.resolveId));
        const resolvedId = plugin.resolveId.bind(pluginContext)(
            SERVICE_WORKER_MODULE_ID,
            undefined,
            { attributes: {}, isEntry: false },
        );
        expect(resolvedId).toBeTypeOf("string");
        assert(isString(resolvedId));

        assert(isFunction(plugin.load));
        const loaded = plugin.load.bind(pluginContext)(resolvedId);
        expect(loaded).contains("service-worker.ts");
    });

    test("load function returns null for non-sw id", () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.load));
        const loaded = plugin.load.bind(pluginContext)("main.html");
        expect(loaded).toBe(null);
    });

    test("closeBundle function overwrites service worker file content", async () => {
        const plugin = serviceWorker(filePath);
        assert(isFunction(plugin.closeBundle));

        (getLatestVersionAsync as unknown as Mock).mockResolvedValueOnce({
            major: 1,
            minor: 2,
            patch: 3,
        });

        (readdir as unknown as Mock).mockResolvedValueOnce([
            {
                name: "sw.js",
                isFile: () => true,
                isDirectory: () => false,
                isBlockDevice: () => false,
                isCharacterDevice: () => false,
                isSymbolicLink: () => false,
                isFIFO: () => false,
                isSocket: () => false,
                parentPath: "dist",
            },
            {
                name: "other-file.txt",
                isFile: () => true,
                isDirectory: () => false,
                isBlockDevice: () => false,
                isCharacterDevice: () => false,
                isSymbolicLink: () => false,
                isFIFO: () => false,
                isSocket: () => false,
                parentPath: "dist",
            },
            {
                name: "sw.js",
                isFile: () => true,
                isDirectory: () => false,
                isBlockDevice: () => false,
                isCharacterDevice: () => false,
                isSymbolicLink: () => false,
                isFIFO: () => false,
                isSocket: () => false,
                parentPath: "dist/asset",
            },
        ]);
        (readFile as unknown as Mock).mockResolvedValueOnce(
            '// service worker content with "{FILE_LIST}" and {APP_VERSION}',
        );
        (writeFile as unknown as Mock).mockResolvedValueOnce(undefined);

        await plugin.closeBundle.bind(pluginContext)();
        expect(writeFile).toHaveBeenCalledWith(
            "dist/sw.js",
            `// service worker content with "/other-file.txt","/asset/sw.js" and v1.2.3`,
            "utf-8",
        );
    });

    test(
        "closeBundle function overwrites service worker file content with" +
            "default version if outside of git repository",
        async () => {
            const plugin = serviceWorker(filePath);
            assert(isFunction(plugin.closeBundle));

            (getLatestVersionAsync as unknown as Mock).mockResolvedValueOnce(
                null,
            );

            (readdir as unknown as Mock).mockResolvedValueOnce([
                {
                    name: "sw.js",
                    isFile: () => true,
                    isDirectory: () => false,
                    isBlockDevice: () => false,
                    isCharacterDevice: () => false,
                    isSymbolicLink: () => false,
                    isFIFO: () => false,
                    isSocket: () => false,
                    parentPath: "dist",
                },
            ]);
            (readFile as unknown as Mock).mockResolvedValueOnce(
                '// service worker content with "{FILE_LIST}" and {APP_VERSION}',
            );
            (writeFile as unknown as Mock).mockResolvedValueOnce(undefined);

            await plugin.closeBundle.bind(pluginContext)();
            expect(writeFile).toHaveBeenCalledWith(
                "dist/sw.js",
                `// service worker content with "" and v0.1.0`,
                "utf-8",
            );
        },
    );
});
