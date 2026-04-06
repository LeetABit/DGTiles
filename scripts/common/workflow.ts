//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { assert } from "./assert";
import { readFile } from "fs/promises";

const CI_WORKFLOW_PATH = ".github/workflows/CI_CD.yaml";

/**
 * Reads the CI workflow file and returns its configured Node.js version.
 * @returns {string} Parsed Node.js version string.
 */
export async function getNodeVersionAsync(): Promise<string> {
    const ciYaml = await readFile(CI_WORKFLOW_PATH, "utf8");

    const match = /node-version:\s*(?<nodeVersion>[0-9.]+)/u.exec(ciYaml);
    const nodeVersion = match?.groups?.["nodeVersion"];

    assert(nodeVersion !== undefined, "node-version must exist in CI workflow");

    return nodeVersion;
}
