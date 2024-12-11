//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

export default function getTimestamp() {
    const result = {
        timestamp: new Date().toISOString(),
        safeTimestamp: '',
    };

    result.safeTimestamp = result.timestamp.replace(/[-:Z]/g, '').replace('T', '-');
    return result;
}
