//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

export function getTimestamp() {
    const result = {
        safeTimestamp: "",
        timestamp: new Date().toISOString(),
    };

    result.safeTimestamp = result.timestamp
        .replace(/[-:Z]/gu, "")
        .replace("T", "-");
    return result;
}
