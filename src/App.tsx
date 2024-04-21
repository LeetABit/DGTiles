//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import MainView from 'src/components/MainView';
import { darkTheme } from 'src/styles/themes';
import store, { persistor } from 'src/store';
import ScreenOrientationProvider from 'src/components/common/ScreenOrientationProvider';
import global from './styles/global';

interface Props {
    basename?: string,
}

export default ({ basename } : Props) => {
    return (
        <>
            <Global styles={global} />
            <ScreenOrientationProvider>
                <ThemeProvider theme={darkTheme}>
                    <BrowserRouter basename={basename}>
                        <Provider store={store}>
                            <PersistGate persistor={persistor}>
                                <MainView />
                            </PersistGate>
                        </Provider>
                    </BrowserRouter>
                </ThemeProvider>
            </ScreenOrientationProvider>
        </>
    );
};
