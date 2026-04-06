//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import packageJson from "#/package.json";

export default packageJson;

/**
 * Gets the required Node.js version from package.json engines field.
 * @returns {string} The Node.js version requirement string.
 */
export function getNodeVersion(): string {
    return packageJson.engines.node;
}

/**
 * Gets the list of dependencies from the package.json file.
 * @returns {string[]} An array of dependency names.
 */
export function getDependencies(): string[] {
    return [
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.dependencies),
    ].filter((dep) => !dep.startsWith("//"));
}
