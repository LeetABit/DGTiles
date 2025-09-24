//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        // Theme for the tiles workspace.
        workspace: {
            // The background color of the workspace.
            background: React.CSSProperties["background"];
        };
    }
}
