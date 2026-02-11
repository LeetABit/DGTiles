//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import packageJson, { getDependencies } from "./packageJson";

describe("packageJson", () => {
    test("should be defined", () => {
        expect(packageJson).toBeDefined();
    });

    test("packageJson should be an object", () => {
        expect(typeof packageJson).toBe("object");
    });

    test("should have a name property", () => {
        expect(packageJson).toHaveProperty("name");
    });

    test("should have a dependencies property", () => {
        expect(packageJson).toHaveProperty("dependencies");
    });

    test("should have a devDependencies property", () => {
        expect(packageJson).toHaveProperty("devDependencies");
    });

    test("should have a scripts property", () => {
        expect(packageJson).toHaveProperty("scripts");
    });
});

describe("getDependencies", () => {
    test("should return an array of dependencies", () => {
        const dependencies = getDependencies();
        const packageJsonDevDependencies = [
            ...Object.keys(packageJson.devDependencies),
            ...Object.keys(packageJson.dependencies),
        ].filter((dep) => !dep.startsWith("//"));
        expect(Array.isArray(dependencies)).toBe(true);
        expect(dependencies.length).toBeGreaterThan(0);
        dependencies.forEach((dep) => {
            expect(typeof dep).toBe("string");
        });
        expect(dependencies).toEqual(packageJsonDevDependencies);
    });
});
