//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import type { Property } from "csstype";
import { Theme } from "@emotion/react";

export const MainColor: Property.Color = "black";
export const BackgroundColor: Property.Color = "white";
export const GalleryColor: Property.Color = "whitesmoke";
export const DimerColor: Property.Color = "rgba(0,0,0,.3)";
export const theme: Theme = {
    workspace: {
        background: `${GalleryColor}`,
    },
};
