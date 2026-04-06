//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { describe, expect, test } from "vitest";
import { getNodeVersion } from "#/scripts/common/packageJson";
import { getNodeVersionAsync } from "#/scripts/common/workflow";
import { satisfies } from "semver";

const nodeVersionRequired = getNodeVersion();

describe("Node.js version compatibility", () => {
    test("package.json should specify engines.node", () => {
        expect(nodeVersionRequired).toBeDefined();
        expect(typeof nodeVersionRequired).toBe("string");
    });

    test("CI workflow should specify node-version in setup-node action", async () => {
        const workflowNodeVersion = await getNodeVersionAsync();

        expect(workflowNodeVersion).toBeDefined();
        expect(workflowNodeVersion).toMatch(/^\d+\.\d+\.\d+$/u);
    });

    test("workflow node version should satisfy package.json engines requirement", async () => {
        const workflowNodeVersion = await getNodeVersionAsync();

        expect(satisfies(workflowNodeVersion, nodeVersionRequired)).toBe(true);
    });
});
