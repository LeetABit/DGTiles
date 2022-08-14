//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { CSSObject, Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import MainView from './components/views/main/MainView';
import { theme } from './styles/themes';
import { persistor, store } from './store';
import { ModalDialogProvider, ModalDialogPlaceholder } from './components/common/ModalDialog';

interface Props {
    basename?: string,
}

const globalStyle : CSSObject = {
    label: 'MainView',
    body: {
        margin: '0px',
    },
    'a[target="_blank"]': {
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
            <ThemeProvider theme={theme}>
                <BrowserRouter basename={basename}>
                    <Provider store={store}>
                        <PersistGate persistor={persistor}>
                            <ModalDialogProvider>
                                <MainView />
                                <ModalDialogPlaceholder />
                            </ModalDialogProvider>
                        </PersistGate>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};
