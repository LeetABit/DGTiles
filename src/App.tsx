//  Copyright (c) Hubert Bukowski. All rights reserved.
//  Licensed under the MIT License.
//  See LICENSE file in the project root for full license information.
//
//  @jsxImportSource @emotion/react

import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import MainView from './components/views/main/MainView';
import { theme } from './styles/themes';

export interface AppProps {
    basename?: string,
}

export default ({ basename } : AppProps) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter basename={basename}>
            <MainView />
        </BrowserRouter>
    </ThemeProvider>
);
