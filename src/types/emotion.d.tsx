//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import '@emotion/react';
import type { Property } from 'csstype';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            focus: {
                idle: Property.Color,
                hover: Property.Color,
            },
            background: {
                primary: Property.Color,
                secondary: Property.Color,
            },
            dimmer: Property.Color,
        },
        sizes: {
            floatingButton: Property.Width & Property.Height,
        }
    }
}
