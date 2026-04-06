//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { assert } from "./assert";

/**
 * Extracts the primary domain from a README URL.
 * @param {string} readme README markdown content.
 * @returns {string} Parsed domain name.
 */
export function parseDomainFromReadme(readme: string): string {
    const match = /https:\/\/(?<domain>[^/)]+)/u.exec(readme);
    const domain = match?.groups?.["domain"];

    assert(domain !== undefined, "Domain URL must exist in docs/README.md");

    return domain;
}
