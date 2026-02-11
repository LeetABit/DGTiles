//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Property } from "csstype";
import type { Theme } from "@emotion/react";

export const DEFAULT_BACKGROUND_COLOR: Property.Color = "#eee";
export const DEFAULT_BACKGROUND_MAJOR_GRID_COLOR: Property.Color = "#ddd";
export const DEFAULT_BACKGROUND_MINOR_GRID_COLOR: Property.Color = "#ccc";
export const theme: Theme = {
    background: {
        color: DEFAULT_BACKGROUND_COLOR,
        grid: {
            majorColor: DEFAULT_BACKGROUND_MAJOR_GRID_COLOR,
            minorColor: DEFAULT_BACKGROUND_MINOR_GRID_COLOR,
        },
    },
};
