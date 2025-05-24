//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import packageJson from "#/package.json";

export default packageJson;

/**
 * Gets the list of dependencies from the package.json file.
 * @returns {string[]} An array of dependency names.
 */
export function getDependencies(): string[] {
    return [
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.dependencies),
    ];
}
