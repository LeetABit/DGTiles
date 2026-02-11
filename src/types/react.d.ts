//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        // Theme for the tiles workspace.
        background: {
            // The color of the background.
            color: React.CSSProperties["color"];
            // The grid on the background.
            grid: {
                // The color of the major grid.
                majorColor: React.CSSProperties["color"];
                // The color of the minor grid.
                minorColor: React.CSSProperties["color"];
            };
        };
    }
}
