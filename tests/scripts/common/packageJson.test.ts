//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, it } from "vitest";
import packageJson, { getDependencies } from "#/scripts/common/packageJson.ts";

describe("packageJson object", () => {
    it("should be defined", () => {
        expect(packageJson).toBeDefined();
    });

    it("packageJson should be an object", () => {
        expect(typeof packageJson).toBe("object");
    });

    it("should have a name property", () => {
        expect(packageJson).toHaveProperty("name");
    });

    it("should have a dependencies property", () => {
        expect(packageJson).toHaveProperty("dependencies");
    });

    it("should have a devDependencies property", () => {
        expect(packageJson).toHaveProperty("devDependencies");
    });

    it("should have a scripts property", () => {
        expect(packageJson).toHaveProperty("scripts");
    });
});

describe("getDependencies function", () => {
    it("should return an array of dependencies", () => {
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
