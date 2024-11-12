//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import '@emotion/react';
import { DockDirection } from 'src/components/common/Dock';

declare module 'react' {
    export interface Attributes {
        'dock-direction'?: DockDirection,
        'dock-container'?: ReactElement,
    }
}
