//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import MainView from 'src/views/main/MainView';
import { theme } from 'src/styles/themes';
import store, { persistor } from 'src/store';
import { DialogProvider } from 'src/components/Dialog';
import ScreenOrientationProvider from 'src/contexts/ScreenOrientationContext';

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
            background: `url(${process.env.PUBLIC_URL}/images/ExternalLink.svg)`,
            backgroundRepeat: 'no-repeat',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            verticalAlign: 'text-top',
        },
    },
};

export default ({ basename } : Props) => {
    return (
        <>
            <Global styles={globalStyle} />
            <ScreenOrientationProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename={basename}>
                        <Provider store={store}>
                            <PersistGate persistor={persistor}>
                                <DialogProvider>
                                    <MainView />
                                </DialogProvider>
                            </PersistGate>
                        </Provider>
                    </BrowserRouter>
                </ThemeProvider>
            </ScreenOrientationProvider>
        </>
    );
};
