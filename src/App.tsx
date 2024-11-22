//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.

import { CSSObject, Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/themes';

interface Props {
    basename?: string,
}

const globalStyle : CSSObject = {
    label: 'MainView',
    body: {
        margin: '0px',
    },
    'a[target="_blank"]': {
        whiteSpace: 'nowrap',
        '&:after': {
            content: '""',
            background: `url(/images/ExternalLink.svg)`,
            backgroundRepeat: 'no-repeat',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'text-top',
        },
    },
};

export default function ({ basename } : Props) {
    return (
        <>
            <Global styles={globalStyle} />
            <ThemeProvider theme={theme}>
                <BrowserRouter basename={basename}>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};
