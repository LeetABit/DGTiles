//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject } from '@emotion/react';

const global: CSSObject = {
    label: 'MainView',
    body: {
        margin: '0px',
    },
    'a[target="_blank"]': {
        whiteSpace: 'nowrap',
        '&:after': {
            content: '""',
            background: `url(${process.env.PUBLIC_URL}/images/ExternalLink.svg)`,
            backgroundRepeat: 'no-repeat',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'text-top',
        },
    },
}

export default global;
