//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import MainView from './components/views/main/MainView';
import { theme } from './styles/themes';
import { persistor, store } from './store';

interface Props {
    basename?: string,
}

export default ({ basename } : Props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainView />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);
