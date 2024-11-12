//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, Theme } from '@emotion/react';

export type ThemedCSSObject = (theme: Theme) => CSSObject;

export const lightTheme: Theme = {
    colors: {
        focus: {
            idle: 'rgb(0,123,111)',
            hover: 'rgb(0,123,111)',
        },
        background: {
            primary: 'white',
            secondary: 'whitesmoke',
        },
        dimmer: 'rgba(0,0,0,.3)',
    },
    sizes: {
        floatingButton: '4em',
    },
};

export const darkTheme: Theme = {
    colors: {
        focus: {
            idle: 'rgb(0,123,111)',
            hover: 'rgb(0,123,111)',
        },
        background: {
            primary: 'white',
            secondary: 'whitesmoke',
        },
        dimmer: 'rgba(0,0,0,.3)',
    },
    sizes: {
        floatingButton: '4em',
    },
};

export default [lightTheme, darkTheme];
