//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Property } from "csstype";
import type { Theme } from "@emotion/react";

export const BACKGROUND_COLOR: Property.Color = "white";
export const theme: Theme = {
    workspace: {
        background: `${BACKGROUND_COLOR}`,
    },
};
