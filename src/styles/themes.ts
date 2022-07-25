//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { Theme } from '@emotion/react';
import type { Property } from 'csstype';

export const MainColor: Property.Color = 'black';
export const BackgroundColor: Property.Color = 'white';
export const GalleryColor: Property.Color = 'whitesmoke';
export const DimerColor: Property.Color = 'rgba(0,0,0,.3)';
export const theme: Theme = {
    workspace: {
        background: `${GalleryColor}`,
    },
};
